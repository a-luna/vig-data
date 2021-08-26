<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import ScatterPlot from '$lib/components/ScatterPlot/ScatterPlot.svelte';
	import { drawStrikeZoneRect } from '$lib/util';
	import { onMount } from 'svelte';

	export let pfx: PitchFx[] = [];
	export let cssId: string = '';
	export let showPitchNumber: boolean = true;
	export let showToolTip: boolean = true;
	const resizeObserver = new ResizeObserver(() => drawStrikeZoneRect(document, cssId));

	onMount(() => {
		const chartContainer = document.querySelector(`#${cssId} .layercake-container`);
		resizeObserver.observe(chartContainer);
		drawStrikeZoneRect(document, cssId);
	});
</script>

<ScatterPlot data={pfx} {showPitchNumber} {showToolTip} />
