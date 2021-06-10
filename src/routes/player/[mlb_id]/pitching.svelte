<script context="module" lang="ts">
	import { getCareerPfxDataByYearForPitcher, getCareerPfxDataForPitcher } from '$lib/api/pitchfx';
	import type {
		CareerPfxPitchingMetricsWithPercentiles,
		CareerPfxPitchingMetricsWithPercentilesByYear
	} from '$lib/api/types';
	import {
		getPitchTypeAbbrevsForCareerPfxMetrics,
		getPitchTypeAbbrevsForCareerPfxMetricsByYear
	} from '$lib/api/util';

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

		return {
			props: {
				mlb_id,
				seasons,
				careerPfxData,
				careerPfxDataByYear
			}
		};
	}

</script>

<script lang="ts">
	import BatterStanceSelector from '$lib/components/ButtonGroups/BatterStanceSelector.svelte';
	import PitchTypePercentiles from '$lib/components/PitchTypeStats/Percentiles/PitchTypePercentiles.svelte';
	import PitchTypeContentSelector from '$lib/components/PitchTypeStats/PitchTypeContentSelector.svelte';
	import VeloLocation from '$lib/components/PitchTypeStats/VeloLocation/VeloLocation.svelte';

	export let mlb_id: number;
	export let seasons: number[];
	export let careerPfxData: CareerPfxPitchingMetricsWithPercentiles;
	export let careerPfxDataByYear: CareerPfxPitchingMetricsWithPercentilesByYear;
	let contentShown: 'percentiles' | 'velo-loc' = 'percentiles';

</script>

<PitchTypeContentSelector on:changed={(event) => (contentShown = event.detail)} />
<div id="pfx-pitcher-stats">
	{#if contentShown === 'percentiles'}
		<PitchTypePercentiles {careerPfxData} {careerPfxDataByYear} {seasons} />
	{:else if contentShown === 'velo-loc'}
		<VeloLocation {careerPfxData} {careerPfxDataByYear} {seasons} />
	{/if}
</div>

<style lang="postcss">
	/* your styles go here */

</style>
