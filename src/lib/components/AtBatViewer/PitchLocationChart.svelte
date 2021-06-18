<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import ScatterPlot from '$lib/components/ScatterPlot/ScatterPlot.svelte';
	import { drawStrikeZoneRect } from '$lib/util';
	import { onMount } from 'svelte';

	export let pfx: PitchFx[] = [];
	const resizeObserver = new ResizeObserver(() => drawStrikeZoneRect(document));

	onMount(() => {
		const chartContainer = document.querySelector('.chart-container');
		resizeObserver.observe(chartContainer);
		drawStrikeZoneRect(document);
	});

</script>

<ScatterPlot data={pfx} />
