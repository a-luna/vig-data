<script lang="ts">
	import type { PitchFxMetrics, PitchType } from '$lib/api/types';
	import PitchMixPieChart from '$lib/components/Player/Pitching/PitchMix/PitchMixPieChart.svelte';
	import PitchMixTable from '$lib/components/Player/Pitching/PitchMix/PitchMixTable.svelte';
	import { allPlayerSeasons, careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { BatterStance } from '$lib/types';

	const allStances: BatterStance[] = ['all', 'rhb', 'lhb'];

	$: allPitchTypes = Object.values($careerPfxData['all'][0])
		.map((pfx) => pfx['metrics'])
		.sort((a, b) => b.percent - a.percent)
		.map((metrics) => metrics.pitch_type[0])
		.filter((pt) => pt !== 'UN');

	function getCareerPfxData(stance: BatterStance): Record<PitchType, PitchFxMetrics> {
		const pfxDataForBatStance = {} as Record<PitchType, PitchFxMetrics>;
		allPitchTypes.map((pt) => {
			if ($careerPfxData[stance][0][pt] !== undefined) {
				pfxDataForBatStance[pt] = $careerPfxData[stance][0][pt]['metrics'];
			}
		});
		return pfxDataForBatStance;
	}

	function getPfxDataByYear(stance: BatterStance) {
		const pfxDataForBatStanceByYear = {};
		$allPlayerSeasons.map((year) => {
			pfxDataForBatStanceByYear[year] = {};
			allPitchTypes.map((pt) => {
				if ($careerPfxData[stance][year][pt] !== undefined) {
					pfxDataForBatStanceByYear[year][pt] = $careerPfxData[stance][year][pt]['metrics'];
				}
			});
		});
		return pfxDataForBatStanceByYear;
	}

	const getChartTitle = (year: number, stance: BatterStance): string =>
		year === 0
			? `${$allPlayerSeasons.slice(1, 2)}-${$allPlayerSeasons.slice(-1)} (vs${stance.toUpperCase()})`
			: `${year} (vs${stance.toUpperCase()})`;
</script>

<div class="flex flex-col justify-start gap-5 flex-nowrap">
	{#each allStances as stance}
		<div class="flex flex-col flex-nowrap mr-auto">
			<h3 class="mt-3 chart-title">{getChartTitle($playerSeason, stance)}</h3>
			<div class="flex flex-row justify-start gap-10 mb-5 flex-nowrap">
				{#if $playerSeason === 0}
					<PitchMixTable pitchTypeMetrics={getCareerPfxData(stance)} playerSeason={'career'} />
				{:else}
					<PitchMixTable pitchTypeMetrics={getPfxDataByYear(stance)[$playerSeason]} playerSeason={$playerSeason} />
				{/if}
				<PitchMixPieChart {stance} showTitle={false} />
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.chart-title {
		font-size: 1.3rem;
		margin-top: 0.75rem;
		margin-bottom: 0;
	}
</style>
