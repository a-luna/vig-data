<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');
</script>

<div class="scatter-group">
	{#each $data as d}
		<div
			class:circle={d.basic_type === 'S'}
			class:square={d.basic_type === 'B'}
			class:in-play={d.basic_type === 'X'}
			class:strike-zone-corner={d.basic_type === 'Z'}
			class:other={d.basic_type !== 'S' &&
				d.basic_type !== 'B' &&
				d.basic_type !== 'X' &&
				d.basic_type !== 'Z'}
			data-pitch-number={d.ab_count}
			data-pitch-type={d.mlbam_pitch_name}
			data-basic-type={d.basic_type}
			data-left-position={`${$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}`}
			data-top-position={`${$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}`}
			style="
				left: {$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}%;
				top: {$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}%;
			"
		/>
	{/each}
</div>

<style>
	.circle,
	.square,
	.in-play,
	.other {
		position: absolute;
		transform: translate(-50%, -50%);
		background-color: transparent;
		width: var(--ploc-data-point-radius);
		height: var(--ploc-data-point-radius);
	}

	.circle,
	.other {
		border-radius: 50%;
	}

	.strike-zone-corner {
		width: 0;
		height: 0;
	}

	[data-basic-type='X'] {
		border: none;
		background-color: transparent;
	}

	[data-basic-type='X']::after {
		position: absolute;
		z-index: 0;
		top: -3px;
		left: -1px;
		font-size: 0.75rem;
		line-height: 1;
		width: 12px;
		height: 16px;
		content: attr(data-basic-type);
		background-color: transparent;
		border: none;
		padding: 2px;
	}

	div[data-pitch-type]:not([data-pitch-number='0'])::before {
		color: var(--black4);
		position: absolute;
		z-index: 0;
		top: -5px;
		left: 12px;
		font-size: 0.75rem;
		content: attr(data-pitch-number);
	}

	:global(.strike-zone) {
		position: absolute;
		z-index: 0;
		background-color: transparent;
		border: 2px solid var(--black4);
	}
</style>
