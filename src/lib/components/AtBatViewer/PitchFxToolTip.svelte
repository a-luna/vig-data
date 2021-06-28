<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import { syncHeight } from '$lib/stores/elementHeight';
	import { syncWidth } from '$lib/stores/elementWidth';
	import { capitalize, getCSSPropNumberOfPixels, getToolTipPositionForPfxData } from '$lib/util';
	import { format, parseISO } from 'date-fns';

	export let d: PitchFx;
	export let pLocLeft: number;
	export let pLocTop: number;
	let toolTipDiv: HTMLElement;
	let dimensions: [number, number];
	let toolTipPosition: string;

	$: position = getToolTipPositionForPfxData(d.px, d.pz);
	$: thrown_at = format(parseISO(d.time_pitch_thrown_utc), 'pp');
	$: wrongCalledStrike = d.pdes === 'Called strike' && !isWithinStrikeZone(d);
	$: wrongCalledBall = d.pdes === 'Ball' && isWithinStrikeZone(d);
	$: heightStore = syncHeight(toolTipDiv);
	$: widthStore = syncWidth(toolTipDiv);
	$: hasBothDimensions = $heightStore !== null && $widthStore !== null;
	$: if (hasBothDimensions) {
		const chartSize = getCSSPropNumberOfPixels(document.documentElement, '--ploc-chart-size');
		const widthPerc = ($widthStore / chartSize) * 100;
		const heightPerc = ($heightStore / chartSize) * 100;
		dimensions = [widthPerc, heightPerc];
	}
	$: if (hasBothDimensions) toolTipPosition = getPosition();

	function isWithinStrikeZone(pfx: PitchFx): boolean {
		return pfx.px <= 0.70833 && pfx.px >= -0.70833 && pfx.pz <= pfx.sz_top && pfx.pz >= pfx.sz_bot;
	}

	function getPosition() {
		let top: number;
		let left: number;
		const toolTipHeight = dimensions[1];
		const toolTipWidth = dimensions[0];
		const margin = 5;

		if (position === 'top') {
			top = pLocTop - toolTipHeight - 1.5 * margin;
			left = pLocLeft - toolTipWidth / 2;
		} else if (position === 'right') {
			top = pLocTop;
			left = pLocLeft + margin;
		} else if (position === 'bottom') {
			top = pLocTop + margin;
			left = pLocLeft - toolTipWidth / 2;
		} else if (position === 'left') {
			top = pLocTop;
			left = pLocLeft - toolTipWidth - 2 * margin;
		}
		return `top: ${top.toFixed(1)}%; left: ${left.toFixed(1)}%;`;
	}
</script>

<div
	bind:this={toolTipDiv}
	class="tooltip absolute flex flex-col justify-start items-start p-1 z-50 leading-snug tracking-wide"
	style={toolTipPosition}
>
	<strong>
		{d.start_speed.toFixed(1)}mph {capitalize(PITCH_TYPE_ABBREV_TO_NAME_MAP[d.mlbam_pitch_name])}
	</strong>
	<div class="flex flex-row flex-nowrap justify-start mr-1">
		<strong class="mr-1">Count </strong><span>{d.balls}-{d.strikes}</span>
	</div>
	<div class="flex flex-row flex-nowrap justify-start">
		<strong class="mr-1">Result </strong><span>{d.pdes}</span>
	</div>
	{#if wrongCalledStrike}
		<strong class="error">Called strike, outside strike zone!</strong>
	{:else if wrongCalledBall}
		<strong class="error">Called ball, inside strike zone!</strong>
	{/if}
	<div class="flex flex-row flex-nowrap justify-start">
		<strong class="mr-1">Thrown At </strong><span>{thrown_at}</span>
	</div>
	<div class="flex flex-row flex-nowrap justify-start">
		<strong class="mr-1">Location </strong><span>X: {d.px.toFixed(2)}ft, Y: {d.pz.toFixed(2)}ft</span>
	</div>
</div>

<style lang="postcss">
	.tooltip {
		white-space: nowrap;
		color: var(--table-col-header-color);
		background-color: var(--table-col-header-bg-color);
		border: 1px solid var(--table-outer-border-color);
	}
</style>
