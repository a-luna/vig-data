<script lang="ts">
	import type { DefPositionMetrics } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { DEF_POS_NUM_COLOR_MAP_DARK, DEF_POS_NUM_COLOR_MAP_LIGHT, DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let defPosMetrics: DefPositionMetrics[];
	export let chartTitle: string;
	let chartData: PieSlice[] = [];

	$: pieTotal = defPosMetrics
		.filter((d) => d.is_starter)
		.map((d) => d.total_games)
		.reduce((prev, current) => prev + current, 0);
	$: pieSlices = defPosMetrics.filter((d) => d.is_starter).map((d) => createPieSlice($siteTheme, d));
	$: chartData = prepareSvgPieChart(pieSlices);
	$: chartDescription = `${pieTotal} total games`;

	function createPieSlice(theme: string, d: DefPositionMetrics): PieSlice {
		const percent = ((d.total_games / pieTotal) * 100).toFixed(0);
		const posAbbrev = DEF_POS_NUM_TO_ABBREV_MAP[d.def_pos];
		const sliceData = {
			value: d.total_games,
			pieTotal: pieTotal,
			label: posAbbrev,
			color: getPosColor(theme, d.def_pos),
			unit: 'games',
			description: `${percent}% ${posAbbrev} (${d.total_games} games)`
		};
		return PieSlice.fromObject(sliceData);
	}

	function getPosColor(theme: string, posNumber: number): string {
		return theme === 'light'
			? DEF_POS_NUM_COLOR_MAP_LIGHT[posNumber]
			: theme === 'dark'
			? DEF_POS_NUM_COLOR_MAP_DARK[posNumber]
			: '#000000';
	}
</script>

<PieChart {chartData} {chartDescription} {chartTitle} />
