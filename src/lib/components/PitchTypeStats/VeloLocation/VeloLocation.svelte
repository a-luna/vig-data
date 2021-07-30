<script lang="ts">
	import type { CareerPfxMetricsForPitcher, PitchFxMetrics, PitchType } from '$lib/api/types';
	import BatterStanceSelector from '$lib/components/ButtonGroups/BatterStanceSelector.svelte';
	import VeloLocationTable from '$lib/components/PitchTypeStats/VeloLocation/VeloLocationTable.svelte';
	import type { BatterStance } from '$lib/types';

	export let seasons: number[];
	export let allPitchTypes: PitchType[];
	export let careerPfxData: CareerPfxMetricsForPitcher;
	let batterStance: BatterStance = 'all';

	function getPfxData(stance: BatterStance): Record<PitchType, PitchFxMetrics> {
		const pfxDataForBatStance = {} as Record<PitchType, PitchFxMetrics>;
		allPitchTypes.map((pt) => {
			if (careerPfxData[stance][0][pt] !== undefined) {
				pfxDataForBatStance[pt] = careerPfxData[stance][0][pt]['metrics'];
			}
		});
		return pfxDataForBatStance;
	}

	function getPfxDataByYear(stance: BatterStance) {
		const pfxDataForBatStanceByYear = {};
		seasons.map((year) => {
			pfxDataForBatStanceByYear[year] = {};
			allPitchTypes.map((pt) => {
				if (careerPfxData[stance][year][pt] !== undefined) {
					pfxDataForBatStanceByYear[year][pt] = careerPfxData[stance][year][pt]['metrics'];
				}
			});
		});
		return pfxDataForBatStanceByYear;
	}

	$: pfxData = getPfxData(batterStance);
	$: pfxDataByYear = getPfxDataByYear(batterStance);
</script>

<BatterStanceSelector on:changed={(event) => (batterStance = event.detail)} />
<VeloLocationTable pitchTypeMetrics={pfxData} playerSeason={'career'} />
{#each seasons as year}
	{#if year > 0}
		<VeloLocationTable pitchTypeMetrics={pfxDataByYear[year]} playerSeason={year} />
	{/if}
{/each}
