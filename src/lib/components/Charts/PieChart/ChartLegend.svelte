<script lang="ts">
	import type { PieSlice } from '$lib/types';

	export let chartData: PieSlice[] = [];
	export let legendFontSize: string = '0.8rem';
	export let legendFontWeight: number = 500;
	export let showTooltip: boolean = true;
	export let hovering: boolean = false;
	export let hoverId: string;

	function getColorStyles(slice: PieSlice, hoverId: string): string {
		const hoverStyle = `color: var(--color-on-sec); background-color: ${slice.color}`;
		const baseStyle = `color: ${slice.color}; background-color: inherit`;
		return slice.id == hoverId ? hoverStyle : baseStyle;
	}
</script>

<div
	class="flex flex-col flex-initial justify-center chart-legend"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
>
	{#each chartData as slice}
		<span
			class="px-1 py-0.5 w-full text-right font-mono leading-none tracking-wider"
			style="{getColorStyles(slice, hoverId)}; font-size: {legendFontSize}; font-weight: {legendFontWeight}"
			title={showTooltip ? slice.tooltip : ''}
			on:mouseenter={() => (hoverId = slice.id)}
			on:mouseleave={() => (hoverId = '')}
		>
			{@html slice.legend}
		</span>
	{/each}
</div>

<style lang="postcss">
	.chart-legend span {
		border-radius: 4px;
	}
</style>
