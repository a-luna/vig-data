<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import PitchFxToolTip from '$lib/components/AtBatViewer/PitchFxToolTip.svelte';
	import Hoverable from '$lib/components/Util/Hoverable.svelte';
	import { getContext } from 'svelte';

	export let showPitchNumber = true;
	export let showToolTip = true;
	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');
	let pfxData: PitchFx[] = [];

	$: pfxData = $data;

	function getLeftPosition(pfx: PitchFx) {
		return $xGet(pfx) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0);
	}

	function getTopPosition(pfx: PitchFx) {
		return $yGet(pfx) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0);
	}
</script>

<div class="scatter-group">
	{#each pfxData as pfx}
		{#if !pfx.is_out_of_boundary}
			<Hoverable let:hovering>
				<div
					class:circle={pfx.basic_type === 'S'}
					class:square={pfx.basic_type === 'B'}
					class:in-play={pfx.basic_type === 'X'}
					class:strike-zone-corner={pfx.basic_type === 'Z'}
					class:other={pfx.basic_type !== 'S' &&
						pfx.basic_type !== 'B' &&
						pfx.basic_type !== 'X' &&
						pfx.basic_type !== 'Z'}
					data-pitch-number={showPitchNumber ? pfx.ab_count : ''}
					data-pitch-type={pfx.mlbam_pitch_name}
					data-basic-type={pfx.basic_type}
					data-left-position={getLeftPosition(pfx)}
					data-top-position={getTopPosition(pfx)}
					style="left: {getLeftPosition(pfx)}%; top: {getTopPosition(pfx)}%;"
				/>
				{#if hovering && showToolTip}
					<PitchFxToolTip {pfx} pLocLeft={getLeftPosition(pfx)} pLocTop={getTopPosition(pfx)} />
				{/if}
			</Hoverable>
		{/if}
	{/each}
</div>

<style lang="postcss">
	.circle,
	.square,
	.in-play,
	.other {
		position: absolute;
		transform: translate(-50%, -50%);
		background-color: currentColor;
		width: var(--ploc-data-point-radius);
		height: var(--ploc-data-point-radius);
		z-index: 15;
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

	[data-basic-type='X']::before {
		top: -8px;
		left: 10px;
	}

	div[data-pitch-type]:not([data-basic-type='X']):not([data-pitch-number='0'])::before {
		top: -10px;
		left: 7px;
	}

	[data-basic-type='X']::before,
	div[data-pitch-type]:not([data-basic-type='X']):not([data-pitch-number='0'])::before {
		color: var(--ploc-pitch-num-color);
		position: absolute;
		z-index: 15;
		font-size: 0.75rem;
		font-weight: var(--ploc-pitch-num-font-weight);
		content: attr(data-pitch-number);
	}

	:global(.layercake-layout-html) {
		z-index: 10;
	}

	:global(.strike-zone) {
		position: absolute;
		z-index: 0;
		background-color: transparent;
		border: 2px solid var(--strike-zone-border-color);
	}

	@media screen and (min-width: 640px) {
		[data-basic-type='X']::before,
		div[data-pitch-type]:not([data-basic-type='X']):not([data-pitch-number='0'])::before {
			top: -9px;
			left: 10px;
		}
	}
</style>
