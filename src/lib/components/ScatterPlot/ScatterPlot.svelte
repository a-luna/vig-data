<script lang="ts">
	import { LayerCake, Html } from 'layercake';
	import type { PitchFx } from '$lib/api/types';
	import Scatter from './Scatter-html.svelte';
	import AxisX from './AxisX-html.svelte';
	import AxisY from './AxisY-html.svelte';
	import { getCSSPropNumberOfPixels, getCSSPropNumber } from '$lib/util';

	export let data: PitchFx[];

	const xKey = 'px';
	const yKey = 'pz';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});
	const padding = 0;

	function getXAxisMinMax() {
		const xMin = getCSSPropNumber(document.documentElement, '--ploc-x-min');
		const xMax = getCSSPropNumber(document.documentElement, '--ploc-x-max');
		return [xMin, xMax];
	}

	function getYAxisMinMax() {
		const yMin = getCSSPropNumber(document.documentElement, '--ploc-y-min');
		const yMax = getCSSPropNumber(document.documentElement, '--ploc-y-max');
		return [yMin, yMax];
	}
</script>

<div class="chart-container">
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
			<Scatter />
		</Html>
	</LayerCake>
</div>

<style lang="postcss">
	.chart-container {
		width: var(--at-bat-ploc-chart-size);
		height: var(--at-bat-ploc-chart-size);
	}
</style>
