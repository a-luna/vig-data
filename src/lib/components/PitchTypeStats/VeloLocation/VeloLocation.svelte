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
	let batterStance: 'all' | 'rhb' | 'lhb' = 'all';

	$: pfxData = careerPfxData[batterStance]['metrics']['metrics_by_pitch_type'];
	$: pfxDataByYear = careerPfxDataByYear[batterStance]['metrics'];
</script>

<BatterStanceSelector on:changed={(event) => (batterStance = event.detail)} />
<VeloLocationTable pitchTypeMetrics={pfxData} playerSeason={'career'} />
{#each seasons as year}
	{#if year > 0}
		<VeloLocationTable pitchTypeMetrics={pfxDataByYear[year]['metrics_by_pitch_type']} playerSeason={year} />
	{/if}
{/each}
