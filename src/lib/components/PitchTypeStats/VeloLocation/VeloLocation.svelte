<script lang="ts">
	import type {
		CareerPfxPitchingMetricsWithPercentiles,
		CareerPfxPitchingMetricsWithPercentilesByYear
	} from '$lib/api/types';
	import BatterStanceSelector from '$lib/components/ButtonGroups/BatterStanceSelector.svelte';
	import VeloLocationTable from '$lib/components/PitchTypeStats/VeloLocation/VeloLocationTable.svelte';

	export let seasons: number[];
	export let careerPfxData: CareerPfxPitchingMetricsWithPercentiles;
	export let careerPfxDataByYear: CareerPfxPitchingMetricsWithPercentilesByYear;
	let batterStance: 'both' | 'rhb' | 'lhb' = 'both';

	$: pfxData = careerPfxData[batterStance]['metrics']['pitch_type_metrics'];
	$: pfxDataByYear = careerPfxDataByYear[batterStance]['metrics'];

</script>

<BatterStanceSelector on:changed={(event) => (batterStance = event.detail)} />
<VeloLocationTable pitchTypeMetrics={pfxData} playerSeason={'career'} />
{#each seasons as year}
	{#if year > 0}
		<VeloLocationTable pitchTypeMetrics={pfxDataByYear[year]['pitch_type_metrics']} playerSeason={year} />
	{/if}
{/each}
