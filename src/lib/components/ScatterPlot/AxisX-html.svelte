<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, padding } = getContext('LayerCake');

	export let gridlines = true;
	export let tickMarks = false;
	export let formatTick = (d: number) => d;
	export let baseline = false;
	export let snapTicks = false;
	export let ticks = undefined;
	export let yTick = 7;
	export let dyTick = 0;
	let tickVals: number[];

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: {
		if (Array.isArray(ticks)) {
			tickVals = ticks;
		} else if (isBandwidth) {
			tickVals = $xScale.domain();
		} else if (typeof ticks === 'function') {
			const ticksFunc: (range: number[]) => number[] = ticks;
			tickVals = ticksFunc($xScale.ticks());
		} else {
			tickVals = $xScale.ticks(ticks);
		}
	}

</script>

<div class="axis x-axis" class:snapTicks>
	{#each tickVals as tick, i}
		{#if gridlines !== false}
			<div class="gridline" style="left:{$xScale(tick)}%;top: -{$padding.top}px;bottom: 0;" />
		{/if}
		{#if tickMarks === true}
			<div
				class="tick-mark"
				style="left:{$xScale(tick) + (isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;height:6px;bottom: -6px;"
			/>
		{/if}
		<div class="tick tick-{i}" style="left:{$xScale(tick) + (isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;top:100%;">
			<div class="text" style="top:{yTick + dyTick}px;">{formatTick(tick)}</div>
		</div>
	{/each}
	{#if baseline === true}
		<div class="baseline" style="top: 100%;width: 100%;" />
	{/if}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.gridline {
		border-left: 1px dashed var(--ploc-grid-color);
	}

	.tick-mark {
		border-left: 1px solid var(--ploc-grid-color);
	}
	.baseline {
		border-top: 1px solid var(--ploc-grid-color);
	}

	.tick .text {
		color: var(--ploc-axis-text-color);
		position: relative;
		white-space: nowrap;
		transform: translateX(-50%);
	}
	/* This looks a little better at 40 percent than 50 */
	.axis.snapTicks .tick:last-child {
		transform: translateX(-40%);
	}
	.axis.snapTicks .tick.tick-0 {
		transform: translateX(40%);
	}

</style>
