<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import ScatterPlot from '$lib/components/Charts/ScatterPlot/ScatterPlot.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';

	export let loading: boolean = false;
	export let pfx: PitchFx[] = [];
	export let cssId: string = '';
	export let showPitchNumber: boolean = true;
	export let showToolTip: boolean = true;
</script>

<div id={cssId} class="flex-grow-0 pitch-location">
	{#if loading}
		<Spinner />
	{:else}
		<ScatterPlot data={pfx} {cssId} {showPitchNumber} {showToolTip} />
	{/if}
</div>

<style lang="postcss">
	.pitch-location {
		background-color: var(--ploc-chart-bg-color);
		border-radius: 4px;
		border: 1px solid var(--ploc-outer-border-color);
		width: var(--ploc-chart-size);
		height: var(--ploc-chart-size);
		margin: 10px 5px;
	}
</style>
