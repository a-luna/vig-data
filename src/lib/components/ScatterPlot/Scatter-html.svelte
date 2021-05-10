<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

	export let r = 5;
</script>

<div class="scatter-group">
	{#each $data as d}
		<div
			class:circle={d.basic_type === 'S'}
			class:square={d.basic_type === 'B'}
			class:other={d.basic_type !== 'S' && d.basic_type !== 'B'}
			data-pitch-number={d.ab_count}
			data-pitch-type={d.mlbam_pitch_name}
			data-basic-type={d.basic_type}
			style="
				left: {$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}%;
				top: {$yGet(d) +
				($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}%;
				width: {r * 2}px;
				height: {r * 2}px;
			"
		/>
	{/each}
</div>

<style>
	.circle,
	.square,
	.other {
		position: absolute;
		transform: translate(-50%, -50%);
	}

	.circle {
		border-radius: 50%;
	}

	/* 
	.square {
	} */

	.other {
		border-radius: 50%;
	}

	[data-pitch-number]:before {
		color: var(--black4);
		position: absolute;
		z-index: 0;
		top: -5px;
		left: 12px;
		font-size: 0.75rem;
		content: attr(data-pitch-number);
	}
</style>
