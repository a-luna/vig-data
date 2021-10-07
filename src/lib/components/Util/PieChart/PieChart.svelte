<script lang="ts">
	import ChartLegend from '$lib/components/Util/PieChart/ChartLegend.svelte';
	import SvgPieChart from '$lib/components/Util/PieChart/SvgPieChart.svelte';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { PieSlice } from '$lib/types';

	export let chartTitle: string = '';
	export let chartDescription: string = '';
	export let chartData: PieSlice[] = [];
	export let showTooltip: boolean = true;
	export let showTitle: boolean = true;
	let hovering: boolean = false;
	let hoverId: string;
	let sliceIdMap: { [key: string]: PieSlice };

	$: sliceIdMap = getsliceIdMap(chartData);
	$: sliceUnit = chartData.length > 0 ? chartData[0].unit : null;
	$: pieTotal = chartData.length > 0 ? chartData[0].pieTotal : null;
	$: defaultChartDescription = sliceUnit && pieTotal ? `${pieTotal} total ${sliceUnit}s` : '';
	$: description = getDescription($playerSeason, hovering, hoverId);

	function getDescription(year: number, isHovering: boolean, sliceId: string): string {
		const sliceDescription = sliceIdMap[sliceId]?.description;
		return isHovering && sliceDescription ? sliceDescription : chartDescription || defaultChartDescription;
	}

	function getsliceIdMap(data: PieSlice[]): { [key: string]: PieSlice } {
		const newMap = {} as { [key: string]: PieSlice };
		data.map((s) => (newMap[s.id] = s));
		return newMap;
	}
</script>

<div class="flex flex-col">
	{#if showTitle}
		<span class="font-bold text-center chart-title">{chartTitle}</span>
	{/if}
	<div class="flex flex-row gap-1 flex-nowrap chart-wrapper">
		<div class="flex-initial mx-auto my-1 w-28 h28 lg:w-32 lg:h-32">
			<SvgPieChart {chartData} {showTooltip} bind:hovering bind:hoverId />
		</div>
		<ChartLegend {chartData} bind:hovering bind:hoverId />
	</div>
	<span class="font-bold text-center">{description}</span>
</div>

<style lang="postcss">
	.chart-title {
		font-size: 1.125rem;
	}

	.chart-wrapper {
		line-height: 1;
		font-size: 1rem;
		white-space: nowrap;
	}
</style>
