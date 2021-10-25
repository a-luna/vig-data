<script lang="ts">
	import type { DefPositionMetrics } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { PieChartSettings, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let chartSettings: PieChartSettings;
	export let defPosMetrics: DefPositionMetrics[];
	export let chartTitle: string;
	let chartData: PieSlice[] = [];
	export let showTitle: boolean = true;
	export let showDescription: boolean = true;

	$: pieTotal = defPosMetrics
		.filter((d) => d.is_starter)
		.map((d) => d.total_games)
		.reduce((prev, current) => prev + current, 0);
	$: pieSlices = defPosMetrics.filter((d) => d.is_starter).map((d) => createPieSlice(d));
	$: chartData = prepareSvgPieChart(pieSlices);
	$: chartDescription = `${pieTotal} total games`;

	function createPieSlice(d: DefPositionMetrics): PieSlice {
		const percent = ((d.total_games / pieTotal) * 100).toFixed(0);
		const posAbbrev = DEF_POS_NUM_TO_ABBREV_MAP[d.def_pos];
		const sliceData = {
			value: d.total_games,
			pieTotal: pieTotal,
			label: posAbbrev,
			color: `var(--def-pos-${posAbbrev})`,
			unit: 'games',
			description: `${percent}% ${posAbbrev} (${d.total_games} games)`
		};
		return PieSlice.fromObject(sliceData);
	}
</script>

<PieChart {chartData} {chartTitle} {chartDescription} {showTitle} {showDescription} {...chartSettings} />
