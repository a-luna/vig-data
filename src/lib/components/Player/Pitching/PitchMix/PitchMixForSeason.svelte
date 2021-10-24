<script lang="ts">
	import type { PitchFxMetrics, PitchType } from '$lib/api/types';
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

	const getChartTitle = (playerSeason: number, stance: BatterStance): string => {
		const year =
			playerSeason === 0 ? `${$allPlayerSeasons.slice(1, 2)}-${$allPlayerSeasons.slice(-1)}` : playerSeason.toString();
		const split =
			stance === 'all' ? 'vs All Batters' : stance === 'rhb' ? 'vs Right-handed Batters' : 'vs Left-handed Batters';
		return `${year} (${split})`;
	};
</script>

<div class="flex flex-col justify-start w-full gap-5 sm:w-auto flex-nowrap">
	{#each allStances as stance}
		<div class="flex flex-col flex-nowrap">
			<h3 class="table-caption mb-1 text-xl tracking-wide sm:text-2xl overflow-ellipsis">
				{getChartTitle($playerSeason, stance)}
			</h3>
			{#if $playerSeason === 0}
				<PitchMixTable pitchTypeMetrics={getCareerPfxData(stance)} playerSeason={'career'} />
			{:else}
				<PitchMixTable pitchTypeMetrics={getPfxDataByYear(stance)[$playerSeason]} playerSeason={$playerSeason} />
			{/if}
		</div>
	{/each}
</div>
