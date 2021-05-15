<script lang="ts">
	import { onMount } from 'svelte';
	import type { PitchFx, StrikeZoneCorner } from '$lib/api/types';
	import ScatterPlot from '../ScatterPlot/ScatterPlot.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import { drawStrikeZoneRect } from '$lib/util';

	export let pfx: PitchFx[];
	const resizeObserver = new ResizeObserver(() => drawStrikeZoneRect(document));

	onMount(() => {
		drawStrikeZoneRect(document);
		const chartContainer = document.querySelector('.chart-container');
		resizeObserver.observe(chartContainer);
	});
</script>

{#if !pfx || pfx.length == 0}
	<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
{:else}
	<ScatterPlot data={pfx} />
{/if}
