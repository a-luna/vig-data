<script context="module" lang="ts">
	import { getCareerPfxDataByYearForPitcher, getCareerPfxDataForPitcher } from '$lib/api/pitchfx';
	import { getPlayerDetails } from '$lib/api/player';
	import type {
		AllCareerAndYearlyPfxData,
		CareerPfxPitchingMetricsWithPercentiles,
		CareerPfxPitchingMetricsWithPercentilesByYear,
		PitchFxMetrics,
		PitchType,
		PlayerDetails as PlayerDetailsSchema
	} from '$lib/api/types';
	import { combineAllPfxCareerAndYearlyData } from '$lib/api/util';
	import PitchTypePercentiles from '$lib/components/PitchTypeStats/Percentiles/PitchTypePercentiles.svelte';
	import PitchTypeContentSelector from '$lib/components/PitchTypeStats/PitchTypeContentSelector.svelte';
	import PlayerSeasonSelector from '$lib/components/PitchTypeStats/PlayerSeasonSelector.svelte';
	import VeloLocation from '$lib/components/PitchTypeStats/VeloLocation/VeloLocation.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';

	export async function load({ page }) {
		const { mlb_id } = page.params;
		const getCareerPfxDataResult = await getCareerPfxDataForPitcher(mlb_id);
		if (!getCareerPfxDataResult.success) {
			return {
				status: getCareerPfxDataResult.status,
				error: new Error(getCareerPfxDataResult.message)
			};
		}
		let careerPfxData = getCareerPfxDataResult.value;

		const getYearlyPfxDataResult = await getCareerPfxDataByYearForPitcher(mlb_id);
		if (!getYearlyPfxDataResult.success) {
			return {
				status: getYearlyPfxDataResult.status,
				error: new Error(getYearlyPfxDataResult.message)
			};
		}

		let careerPfxDataByYear = getYearlyPfxDataResult.value;

		const seasons = Array.from(Object.keys(careerPfxDataByYear['all']['metrics'])).map((year) => parseInt(year));
		// Combined career stats are stored under the '0' key in the seasons array.
		seasons.push(0);

		const allPitchTypes = Object.values<PitchFxMetrics>(careerPfxData['all']['metrics']['metrics_by_pitch_type'])
			.sort((a, b) => b.percent - a.percent)
			.map((m) => m.pitch_type);
		const allCombinedPfxData = combineAllPfxCareerAndYearlyData(careerPfxData, careerPfxDataByYear);

		const getPlayerDetailsResult = await getPlayerDetails(mlb_id);
		if (!getPlayerDetailsResult.success) {
			return {
				status: getPlayerDetailsResult.status,
				error: new Error(getPlayerDetailsResult.message)
			};
		}

		let playerDetails = getPlayerDetailsResult.value;

		return {
			props: {
				// mlb_id,
				playerDetails,
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
	// export let mlb_id: number;
	export let playerDetails: PlayerDetailsSchema;
	export let seasons: number[];
	export let allPitchTypes: PitchType[];
	export let careerPfxData: CareerPfxPitchingMetricsWithPercentiles;
	export let careerPfxDataByYear: CareerPfxPitchingMetricsWithPercentilesByYear;
	export let allCombinedPfxData: AllCareerAndYearlyPfxData;
	let contentShown: 'percentiles' | 'velo-loc' = 'percentiles';
	let twMobile: string = 'flex flex-col items-center justify-center mb-2 flex-nowrap text-base w-full';
	let twSmall: string = 'sm:items-end sm:mt-2 sm:mb-5 sm:text-sm sm:w-auto';
	let twMedium: string = 'md:text-base';
	let twStyles = `${twMobile} ${twSmall} ${twMedium}`;
</script>

<div class="flex flex-col items-start justify-start sm:flex-row sm:justify-around sm:mb-5 flex-nowrap">
	<PlayerDetails {...playerDetails} />
	<div class={twStyles}>
		<PitchTypeContentSelector on:changed={(event) => (contentShown = event.detail)} />
		<PlayerSeasonSelector {seasons} />
	</div>
</div>
<div id="pfx-pitcher-stats">
	{#if contentShown === 'percentiles'}
		<PitchTypePercentiles {seasons} {allPitchTypes} {allCombinedPfxData} />
	{:else if contentShown === 'velo-loc'}
		<VeloLocation {careerPfxData} {careerPfxDataByYear} {seasons} />
	{/if}
</div>
