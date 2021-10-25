<script lang="ts">
	import type { BatOrderMetrics } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { BAT_ORDER_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { PieChartSettings, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let chartSettings: PieChartSettings;
	export let batOrderMetrics: BatOrderMetrics[];
	export let threshold: number;
	export let chartTitle: string;
	let chartData: PieSlice[] = [];
	export let showTitle: boolean = true;
	export let showDescription: boolean = true;

	$: pieTotal = batOrderMetrics
		.filter((batOrder) => batOrder.bat_order > 0 && batOrder.bat_order < 10)
		.filter((batOrder) => batOrder.percent > threshold)
		.map((d) => d.total_games)
		.reduce((prev, current) => prev + current, 0);
	$: pieSlices = batOrderMetrics
		.filter((batOrder) => batOrder.bat_order > 0 && batOrder.bat_order < 10)
		.filter((batOrder) => batOrder.percent > threshold)
		.map((batOrder) => createPieSlice($siteTheme, batOrder));
	$: chartData = prepareSvgPieChart(pieSlices);
	$: chartDescription = `${pieTotal} total games`;

	function createPieSlice(theme: string, batOrder: BatOrderMetrics): PieSlice {
		const percent = ((batOrder.total_games / pieTotal) * 100).toFixed(0);
		const abbrev = BAT_ORDER_NUM_TO_ABBREV_MAP[batOrder.bat_order];
		const sliceData = {
			value: batOrder.total_games,
			pieTotal: pieTotal,
			label: abbrev,
			color: `var(--bat-order-${batOrder.bat_order})`,
			unit: 'games',
			description: `${percent}% ${abbrev} (${batOrder.total_games} games)`
		};
		return PieSlice.fromObject(sliceData);
	}
</script>

<PieChart {chartData} {chartTitle} {chartDescription} {showTitle} {showDescription} {...chartSettings} />
