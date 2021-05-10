<script lang="ts">
	import { LayerCake, Html } from 'layercake';
	import type { PitchFx } from '$lib/api/types';
	import Scatter from './Scatter-html.svelte';
	import AxisX from './AxisX-html.svelte';
	import AxisY from './AxisY-html.svelte';

	export let width: number;
	export let height: number;
	export let data: PitchFx[];

	const xKey = 'px';
	const yKey = 'pz';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});

	const r = 4.5;
	const padding = 2.5;
</script>

<div class="chart-container" style="width: {width}px;height: {height}px;">
	<LayerCake
		ssr={true}
		percentRange={true}
		extents={{ x: [-6, 6], y: [-3, 8] }}
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
			<Scatter {r} />
		</Html>
	</LayerCake>
</div>
