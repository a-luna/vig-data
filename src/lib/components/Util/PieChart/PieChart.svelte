<script lang="ts">
	import ChartLegend from '$lib/components/Util/PieChart/ChartLegend.svelte';
	import SvgPieChart from '$lib/components/Util/PieChart/SvgPieChart.svelte';
	import type { PieSlice } from '$lib/types';
	import { formatNumber } from '$lib/util';

	export let pieWidth: string = '100px';
	export let chartHeight: string = '130px';
	export let chartTitleFontSize: string = '1.2rem';
	export let legendFontSize: string = '0.8rem';
	export let legendFontWeight: number = 500;
	export let chartTitle: string = '';
	export let chartDescription: string = '';
	export let chartData: PieSlice[] = [];
	export let showTooltip: boolean = true;
	export let showTitle: boolean = true;
	export let showDescription: boolean = true;
	export let showLegend: boolean = true;
	let description: string;
	let hovering: boolean = false;
	let hoverId: string = null;
	let sliceIdMap: { [key: string]: PieSlice };

	$: if (chartData) {
		sliceIdMap = {};
		chartData.map((s) => (sliceIdMap[s.id] = s));
	}
	$: sliceUnit = chartData.length > 0 ? chartData[0].unit : null;
	$: pieTotal = chartData.length > 0 ? chartData[0].pieTotal : null;
	$: defaultChartDescription = sliceUnit && pieTotal ? `${formatNumber(pieTotal)} total ${sliceUnit}` : '';
	$: {
		const sliceDescription = sliceIdMap[hoverId]?.description;
		description = hovering && sliceDescription ? sliceDescription : chartDescription || defaultChartDescription;
	}
</script>

<div
	class="flex flex-col font-medium gap-1 mx-1 leading-none whitespace-nowrap justify-around items-center text-center"
	style="height: {chartHeight}"
>
	<div class="flex flex-row flex-nowrap gap-1 justify-start chart-inner-wrapper">
		<div class="flex flex-col gap-1 flex-nowrap">
			{#if showTitle}
				<span class="flex-initial" style="font-size: {chartTitleFontSize}">{chartTitle}</span>
			{/if}
			<div class="flex-grow" style="width: {pieWidth}">
				<SvgPieChart {chartData} {showTooltip} bind:hovering bind:hoverId />
			</div>
		</div>
		{#if showLegend}
			<ChartLegend {chartData} {showTooltip} {legendFontSize} {legendFontWeight} bind:hovering bind:hoverId />
		{/if}
	</div>
	{#if showDescription}
		<span class="chart-description">{description}</span>
	{/if}
</div>
