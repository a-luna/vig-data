<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import AxisX from '$lib/components/Charts/ScatterPlot/AxisX-html.svelte';
	import AxisY from '$lib/components/Charts/ScatterPlot/AxisY-html.svelte';
	import Scatter from '$lib/components/Charts/ScatterPlot/Scatter-html.svelte';
	import { drawStrikeZoneRect, getXAxisMinMax, getYAxisMinMax } from '$lib/util/gameData';
	import { Html, LayerCake } from 'layercake';

	export let data: PitchFx[];
	export let cssId: string;
	export let showPitchNumber: boolean = true;
	export let showToolTip: boolean = true;
	const resizeObserver = new ResizeObserver(() => drawStrikeZoneRect(document, cssId));

	const xKey = 'px';
	const yKey = 'pz';

	data.forEach((d) => (d[yKey] = +d[yKey]));
	const padding = 0;

	function drawStrikeZone(_el: HTMLElement) {
		const chartContainer = document.querySelector(`#${cssId} .layercake-container`);
		resizeObserver.observe(chartContainer);
		drawStrikeZoneRect(document, cssId);
	}
</script>

<div style="width: var(--ploc-chart-size, 350px); height: var(--ploc-chart-size, 350px)" use:drawStrikeZone>
	<LayerCake
		ssr={true}
		percentRange={true}
		extents={{ x: getXAxisMinMax(), y: getYAxisMinMax() }}
		padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Html>
			<AxisX />
			<AxisY />
			<Scatter {showPitchNumber} {showToolTip} />
		</Html>
	</LayerCake>
</div>
