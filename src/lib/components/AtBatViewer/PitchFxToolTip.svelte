<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import { syncHeight } from '$lib/stores/elementHeight';
	import { syncWidth } from '$lib/stores/elementWidth';
	import { getCSSPropNumberOfPixels } from '$lib/util/cssCustomProps';
	import { capitalize } from '$lib/util/format';
	import { getToolTipPositionForPfxData } from '$lib/util/gameData';

	export let pfx: PitchFx;
	export let pLocLeft: number;
	export let pLocTop: number;
	let toolTipDiv: HTMLElement;
	let dimensions: [number, number];
	let toolTipPosition: string;

	$: position = getToolTipPositionForPfxData(pfx.px, pfx.pz);
	$: ballInPlay = pfx.basic_type === 'X';
	$: wrongCalledStrike = pfx.pdes === 'Called strike' && !isWithinStrikeZone(pfx);
	$: wrongCalledBall = pfx.pdes === 'Ball' && isWithinStrikeZone(pfx);
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

	const bb_type_map = {
		ground_ball: 'Ground Ball',
		line_drive: 'Line Drive',
		fly_ball: 'Fly Ball',
		popup: 'Popup'
	};

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
	class="absolute z-50 flex flex-col items-start justify-start p-1 leading-snug tracking-wide tooltip"
	style={toolTipPosition}
>
	<strong data-pitch-type={pfx.mlbam_pitch_name} style="border: none">
		{pfx.start_speed.toFixed(1)} mph {capitalize(PITCH_TYPE_ABBREV_TO_NAME_MAP[pfx.mlbam_pitch_name])}
	</strong>
	{#if ballInPlay}
		<strong class="description">{bb_type_map[pfx.trajectory]} ({capitalize(pfx.hardness)} hit)</strong>
	{:else}
		<strong class="description">{pfx.pdes}</strong>
	{/if}
	<div class="flex flex-row justify-start flex-nowrap">
		<strong class="mr-1">Spin Rate </strong><span>{pfx.spin_rate}</span>
	</div>
	{#if ballInPlay}
		<div class="flex flex-row justify-start flex-nowrap">
			<strong class="mr-1">Exit Velo. </strong><span>{pfx.launch_speed} mph</span>
		</div>
		<div class="flex flex-row justify-start flex-nowrap">
			<strong class="mr-1">Launch Angle </strong><span>{pfx.launch_angle} deg</span>
		</div>
		<div class="flex flex-row justify-start flex-nowrap">
			<strong class="mr-1">Distance </strong><span>{pfx.total_distance} ft</span>
		</div>
	{/if}
	{#if wrongCalledStrike}
		<strong class="error">Called strike, outside strike zone!</strong>
	{:else if wrongCalledBall}
		<strong class="error">Called ball, inside strike zone!</strong>
	{/if}
	<div class="flex flex-row justify-start flex-nowrap">
		<strong class="mr-1">Thrown At </strong><span>{pfx.time_pitch_thrown_est}</span>
	</div>
	<div class="flex flex-row justify-start flex-nowrap">
		<strong class="mr-1">Location </strong><span>X: {pfx.px.toFixed(2)}ft, Y: {pfx.pz.toFixed(2)}ft</span>
	</div>
</div>

<style lang="postcss">
	.description {
		color: var(--sec-color);
	}

	.tooltip {
		white-space: nowrap;
		color: var(--table-col-header-color);
		background-color: var(--table-col-header-bg-color);
		border: 1px solid var(--table-outer-border-color);
	}
</style>
