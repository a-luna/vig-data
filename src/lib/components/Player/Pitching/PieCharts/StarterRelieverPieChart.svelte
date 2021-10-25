<script lang="ts">
	import type { TeamPitchStats } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { PieChartSettings, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let chartSettings: PieChartSettings;
	export let pitchStats: TeamPitchStats;
	export let chartTitle: string;
	let pieSlices: PieSlice[] = [];
	const chartDescription = `${pitchStats.total_games} total games`;
	export let showTitle: boolean = true;
	export let showDescription: boolean = true;

	$: if (pitchStats) {
		const percentSp = ((pitchStats.games_as_sp / pitchStats.total_games) * 100).toFixed(0);
		const percentRp = ((pitchStats.games_as_rp / pitchStats.total_games) * 100).toFixed(0);
		pieSlices = [
			PieSlice.fromObject({
				value: pitchStats.games_as_sp,
				pieTotal: pitchStats.total_games,
				label: 'SP',
				color: 'var(--pie-chart-start-color)',
				unit: 'games',
				description: `${pitchStats.games_as_sp} as SP (${percentSp}%)`
			}),
			PieSlice.fromObject({
				value: pitchStats.games_as_rp,
				pieTotal: pitchStats.total_games,
				label: 'RP',
				color: 'var(--pie-chart-bench-color)',
				unit: 'games',
				description: `${pitchStats.games_as_rp} as RP (${percentRp}%)`
			})
		];
	}
	$: chartData = prepareSvgPieChart(pieSlices);
</script>

<PieChart {chartData} {chartTitle} {chartDescription} {showTitle} {showDescription} {...chartSettings} />
