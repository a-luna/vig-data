<script lang="ts">
	import { siteTheme } from '$lib/stores/singleValueStores';
	import type { PieSlice } from '$lib/types';

	export let chartData: PieSlice[] = [];
	export let showTooltip: boolean;
	export let hovering = false;
	export let hoverId: string;
	const defaultCoordinates: [number, number] = [0, 0];

	$: sliceIds = chartData.map((s) => s.id);
	$: lastCoordinates =
		chartData && chartData.length > 0 ? chartData[chartData.length - 1].endCoordinates : defaultCoordinates;

	function getSvgPath(slice: PieSlice): string {
		const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
		const [startX, startY] = slice.startCoordinates;
		const [endX, endY] = slice.endCoordinates;
		return `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
	}

	function getRadialLine(x: number, y: number): string {
		return `M ${x} ${y} L 0 0`;
	}
</script>

<svg
	viewBox="-1.04 -1.04 2.08 2.08"
	style="transform: rotate(-90deg)"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
>
	<circle cx="0" cy="0" r="1.01" />
	{#each chartData as slice}
		<path
			d={getSvgPath(slice)}
			fill={slice.color}
			class:dim-40={$siteTheme === 'light' && hovering && hoverId !== slice.id}
			class:dim-20={$siteTheme === 'dark' && hovering && hoverId !== slice.id}
			on:mouseenter={() => (hoverId = slice.id)}
			on:mouseleave={() => (hoverId = '')}
		>
			{#if showTooltip}
				<title>{slice.description}</title>
			{/if}
		</path>
		{#if chartData.length > 1}
			<path class="radial-line" d={getRadialLine(...slice.startCoordinates)} />
		{/if}
	{/each}
	{#if chartData.length > 1}
		<path class="radial-line" d={getRadialLine(...lastCoordinates)} />
	{/if}
</svg>

<style lang="postcss">
	circle,
	.radial-line {
		fill: none;
		stroke: #000000;
	}
	circle {
		stroke-width: 0.02;
	}
	.radial-line {
		stroke-width: 0.01;
	}
	.dim-40 {
		opacity: 40%;
	}
	.dim-20 {
		opacity: 20%;
	}
</style>
