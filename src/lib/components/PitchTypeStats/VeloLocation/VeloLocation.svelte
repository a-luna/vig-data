<script lang="ts">
	import type { PitchFxMetrics, PitchType } from '$lib/api/types';
	import BatterStanceSelector from '$lib/components/ButtonGroups/BatterStanceSelector.svelte';
	import VeloLocationTable from '$lib/components/PitchTypeStats/VeloLocation/VeloLocationTable.svelte';
	import { allPlayerSeasons, careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import { batStanceSplit } from '$lib/stores/singleValueStores';
	import type { BatterStance } from '$lib/types';

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

	$: pfxData = getCareerPfxData($batStanceSplit);
	$: pfxDataByYear = getPfxDataByYear($batStanceSplit);
</script>

<BatterStanceSelector />
<VeloLocationTable pitchTypeMetrics={pfxData} playerSeason={'career'} />
{#each $allPlayerSeasons as year}
	{#if year > 0}
		<VeloLocationTable pitchTypeMetrics={pfxDataByYear[year]} playerSeason={year} />
	{/if}
{/each}
