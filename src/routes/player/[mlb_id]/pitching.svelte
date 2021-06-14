<script context="module" lang="ts">
	import { getCareerPfxDataByYearForPitcher, getCareerPfxDataForPitcher } from '$lib/api/pitchfx';
	import type {
		AllCareerAndYearlyPfxData,
		CareerPfxPitchingMetricsWithPercentiles,
		CareerPfxPitchingMetricsWithPercentilesByYear,
		PitchType
	} from '$lib/api/types';
	import {
		combineAllPfxCareerAndYearlyData,
		getPitchTypeAbbrevsForCareerPfxMetrics,
		getPitchTypeAbbrevsForCareerPfxMetricsByYear
	} from '$lib/api/util';
	import PitchTypePercentiles from '$lib/components/PitchTypeStats/Percentiles/PitchTypePercentiles.svelte';
	import PitchTypeContentSelector from '$lib/components/PitchTypeStats/PitchTypeContentSelector.svelte';
	import VeloLocation from '$lib/components/PitchTypeStats/VeloLocation/VeloLocation.svelte';

	export async function load({ page, fetch }) {
		const { mlb_id } = page.params;
		const getCareerPfxDataResult = await getCareerPfxDataForPitcher(mlb_id, fetch);
		if (!getCareerPfxDataResult.success) {
			return {
				status: getCareerPfxDataResult.status,
				error: new Error(getCareerPfxDataResult.message)
			};
		}
		let careerPfxData = getCareerPfxDataResult.value;
		careerPfxData = getPitchTypeAbbrevsForCareerPfxMetrics(careerPfxData);

		const getYearlyPfxDataResult = await getCareerPfxDataByYearForPitcher(mlb_id, fetch);
		if (!getYearlyPfxDataResult.success) {
			return {
				status: getYearlyPfxDataResult.status,
				error: new Error(getYearlyPfxDataResult.message)
			};
		}

		let careerPfxDataByYear = getYearlyPfxDataResult.value;
		careerPfxDataByYear = getPitchTypeAbbrevsForCareerPfxMetricsByYear(careerPfxDataByYear);
		const seasons = Array.from(Object.keys(careerPfxDataByYear['both']['metrics']));
		const allPitchTypes = Object.values(careerPfxData['both']['metrics']['pitch_type_metrics'])
			.sort((a, b) => b.percent - a.percent)
			.map((m) => m.pitch_type);
		const allCombinedPfxData = combineAllPfxCareerAndYearlyData(careerPfxData, careerPfxDataByYear);

		return {
			props: {
				mlb_id,
				seasons,
				allPitchTypes,
				careerPfxData,
				careerPfxDataByYear,
				allCombinedPfxData
			}
		};
	}

</script>

<script lang="ts">
	export let mlb_id: number;
	export let seasons: number[];
	export let allPitchTypes: PitchType[];
	export let careerPfxData: CareerPfxPitchingMetricsWithPercentiles;
	export let careerPfxDataByYear: CareerPfxPitchingMetricsWithPercentilesByYear;
	export let allCombinedPfxData: AllCareerAndYearlyPfxData;
	let contentShown: 'percentiles' | 'velo-loc' = 'percentiles';

</script>

<PitchTypeContentSelector on:changed={(event) => (contentShown = event.detail)} />
<div id="pfx-pitcher-stats">
	{#if contentShown === 'percentiles'}
		<PitchTypePercentiles {seasons} {allPitchTypes} {allCombinedPfxData} />
	{:else if contentShown === 'velo-loc'}
		<VeloLocation {careerPfxData} {careerPfxDataByYear} {seasons} />
	{/if}
</div>
