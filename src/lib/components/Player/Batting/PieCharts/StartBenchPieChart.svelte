<script lang="ts">
	import type { TeamBatStats } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { PieChartSettings, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util/ui';

	export let chartSettings: PieChartSettings;
	export let batStats: TeamBatStats;
	export let chartTitle: string;
	let pieSlices: PieSlice[] = [];
	const chartDescription = `${batStats.total_games} total games`;
	export let showTitle: boolean = true;
	export let showDescription: boolean = true;

	$: if (batStats) {
		const percentStart = ((batStats.total_games_started / batStats.total_games) * 100).toFixed(0);
		const percentSub = ((batStats.total_games_subbed / batStats.total_games) * 100).toFixed(0);
		pieSlices = [
			PieSlice.fromObject({
				value: batStats.total_games_started,
				pieTotal: batStats.total_games,
				label: 'ST',
				color: 'var(--pie-chart-start-color)',
				unit: 'games',
				description: `${batStats.total_games_started} games started (${percentStart}%)`
			}),
			PieSlice.fromObject({
				value: batStats.total_games_subbed,
				pieTotal: batStats.total_games,
				label: 'BN',
				color: 'var(--pie-chart-bench-color)',
				unit: 'games',
				description: `${batStats.total_games_subbed} games as sub (${percentSub}%)`
			})
		];
	}
	$: chartData = prepareSvgPieChart(pieSlices);
</script>

<PieChart {chartData} {chartTitle} {chartDescription} {showTitle} {showDescription} {...chartSettings} />
