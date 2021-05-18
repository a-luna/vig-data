<script lang="ts">
	import { LayerCake, Html } from 'layercake';
	import type { PitchFx } from '$lib/api/types';
	import Scatter from './Scatter-html.svelte';
	import AxisX from './AxisX-html.svelte';
	import AxisY from './AxisY-html.svelte';
	import { getXAxisMinMax, getYAxisMinMax } from '$lib/util';

	export let data: PitchFx[];

	const xKey = 'px';
	const yKey = 'pz';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});
	const padding = 0;

</script>

<div
	class="chart-container"
	style="width: var(--at-bat-ploc-chart-size, 350px); height: var(--at-bat-ploc-chart-size, 350px)"
>
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
