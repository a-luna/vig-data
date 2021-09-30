<script lang="ts">
	import PitchMixPieChart from '$lib/components/Player/Pitching/PieCharts/PitchMixPieChart.svelte';
	import { allPlayerSeasons } from '$lib/stores/pfxPitcherMetrics';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { BatterStance } from '$lib/types';

	const getChartTitle = (stance: BatterStance): string =>
		$playerSeason === 0
			? `${$allPlayerSeasons[0]}-${$allPlayerSeasons.slice(-1)} (vs${stance.toUpperCase()})`
			: `${$playerSeason} (vs${stance.toUpperCase()})`;
</script>

<div class="flex flex-row justify-between gap-10 p-3 flex-nowrap section">
	<PitchMixPieChart year={$playerSeason} stance={'all'} chartTitle={getChartTitle('all')} />
	<PitchMixPieChart year={$playerSeason} stance={'rhb'} chartTitle={getChartTitle('rhb')} />
	<PitchMixPieChart year={$playerSeason} stance={'lhb'} chartTitle={getChartTitle('lhb')} />
</div>
