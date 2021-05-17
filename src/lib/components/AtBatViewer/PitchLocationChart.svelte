<script lang="ts">
	import { onMount } from 'svelte';
	import type { PitchFx } from '$lib/api/types';
	import ScatterPlot from '../ScatterPlot/ScatterPlot.svelte';
	import { drawStrikeZoneRect } from '$lib/util';

	export let pfx: PitchFx[] = [];
	const resizeObserver = new ResizeObserver(() => drawStrikeZoneRect(document));

	onMount(() => {
		const chartContainer = document.querySelector('.chart-container');
		resizeObserver.observe(chartContainer);
		drawStrikeZoneRect(document);
	});

</script>

<ScatterPlot data={pfx} />
