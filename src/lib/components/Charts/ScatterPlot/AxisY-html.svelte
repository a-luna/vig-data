<script lang="ts">
	import { getContext } from 'svelte';

	const { padding, xRange, yScale } = getContext('LayerCake');

	export let ticks = 4;
	export let tickMarks = false;
	export let gridlines = true;
	export let baseline = false;
	export let formatTick = (d: number) => d;
	export let xTick = -4;
	export let yTick = 2;
	// export let dxTick = 0;
	// export let dyTick = -4;
	// export let textAnchor = 'start';
	let tickVals: number[];

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: {
		if (Array.isArray(ticks)) {
			tickVals = ticks;
		} else if (isBandwidth) {
			tickVals = $yScale.domain();
		} else if (typeof ticks === 'function') {
			const ticksFunc: (range: number[]) => number[] = ticks;
			tickVals = ticksFunc($yScale.ticks());
		} else {
			tickVals = $yScale.ticks(ticks);
		}
	}

</script>

<div class="axis y-axis" style="transform:translate(-{$padding.left}px, 0)">
	{#each tickVals as tick, i}
		<div
			class="tick tick-{i}"
			style="top:{$yScale(tick) + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}%;left:{$xRange[0]}%;"
		>
			{#if gridlines !== false}
				<div
					class="gridline"
					style="top:0;left:{isBandwidth ? $padding.left : 0}px;right:-{$padding.left + $padding.right}px;"
				/>
			{/if}
			{#if baseline !== false && i === 0}
				<div
					class="gridline baseline"
					style="top:0;left:{isBandwidth ? $padding.left : 0};right:-{$padding.left + $padding.right}px;"
				/>
			{/if}
			{#if tickMarks === true}
				<div class="tick-mark" style="top:0;left:{isBandwidth ? $padding.left - 6 : 0}px;width:6px;" />
			{/if}
			<div
				class="text"
				style="
					top:{yTick - 3}px;
					left:{isBandwidth ? $padding.left + xTick - 4 : 0}px;
					transform: translate({isBandwidth ? '-100%' : 0}, {isBandwidth ? -50 - Math.floor($yScale.bandwidth() / -2) : '-100'}%);
				"
			>
				{formatTick(tick)}
			</div>
		</div>
	{/each}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline,
	.text {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 12px;
		width: 100%;
		font-weight: 100;
	}

	.gridline {
		border-top: 1px dashed var(--ploc-grid-color);
	}
	.tick-mark {
		border-top: 1px solid var(--ploc-grid-color);
	}

	.baseline.gridline {
		border-top-style: solid;
	}

	.tick .text {
		color: var(--ploc-axis-text-color);
	}

</style>
