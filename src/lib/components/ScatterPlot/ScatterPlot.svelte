<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import AxisX from '$lib/components/ScatterPlot/AxisX-html.svelte';
	import AxisY from '$lib/components/ScatterPlot/AxisY-html.svelte';
	import Scatter from '$lib/components/ScatterPlot/Scatter-html.svelte';
	import { getXAxisMinMax, getYAxisMinMax } from '$lib/util';
	import LayerCake from '../../../../node_modules/layercake/src/LayerCake.svelte';
	import Html from '../../../../node_modules/layercake/src/layouts/Html.svelte';

	export let data: PitchFx[];
	export let showPitchNumber: boolean = true;
	export let showToolTip: boolean = true;

	const xKey = 'px';
	const yKey = 'pz';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});
	const padding = 0;
</script>

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

<style lang="postcss">
	:global(#game .layercake-container) {
		width: var(--ploc-chart-size, 350px);
		height: var(--ploc-chart-size, 350px);
	}
</style>
