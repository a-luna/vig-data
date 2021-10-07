<script lang="ts">
	import type { PieSlice } from '$lib/types';

	export let chartData: PieSlice[] = [];
	export let hovering: boolean = false;
	export let hoverId: string;

	function getColorStyles(slice: PieSlice, hoverId: string): string {
		const hoverStyle = `color: var(--color-on-sec); background-color: ${slice.color}`;
		const baseStyle = `color: ${slice.color}; background-color: inherit`;
		return slice.id == hoverId ? hoverStyle : baseStyle;
	}
</script>

<div
	class="flex flex-col items-end flex-initial mt-2 mb-auto chart-legend"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
>
	{#each chartData as slice}
		<span
			class="px-1 py-0.5 w-full text-right font-mono leading-none"
			style="{getColorStyles(slice, hoverId)}; font-size: 0.8rem"
			on:mouseenter={() => (hoverId = slice.id)}
			on:mouseleave={() => (hoverId = '')}
		>
			{slice.legend}
		</span>
	{/each}
</div>

<style lang="postcss">
	.chart-legend {
		margin-top: 10px;
	}

	.chart-legend span {
		border-radius: 4px;
	}
</style>
