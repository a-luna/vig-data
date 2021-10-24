<script lang="ts">
	import type { PitchFxMetrics } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP, PITCH_TYPE_MAP } from '$lib/constants';
	import { pitchTypeMetricsByYearByStance } from '$lib/stores/pfxPitcherMetrics';
	import { BatterStance, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let pieWidth: string = '100px';
	export let chartHeight: string = '130px';
	export let chartTitleFontSize: string = '1.2rem';
	export let legendFontSize: string = '0.8rem';
	export let chartTitle: string = '';
	export let legendFontWeight: number = 500;
	export let year: number = 0;
	export let stance: BatterStance = 'all';
	export let showTitle: boolean = true;
	export let showDescription: boolean = true;

	$: pieTotal = $pitchTypeMetricsByYearByStance['total_pitches'][year][stance];
	$: pieSlices = $pitchTypeMetricsByYearByStance['metrics'][year][stance]
		.sort((a, b) => b.percent - a.percent)
		.map((metrics) => createPieSlice(metrics));
	$: chartData = prepareSvgPieChart(pieSlices);

	function createPieSlice(metrics: PitchFxMetrics): PieSlice {
		const pitchTypeAbbrev = PITCH_TYPE_MAP[metrics.pitch_type_int];
		const pitchTypeName = PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchTypeAbbrev];
		const percent = metrics.total_pitches / pieTotal;
		const unit = 'pitches';
		const sliceData = {
			value: metrics.total_pitches,
			pieTotal: pieTotal,
			label: pitchTypeAbbrev,
			color: `var(--pitch-type-${pitchTypeAbbrev})`,
			unit: unit,
			description: `${(percent * 100).toFixed(0)}% ${pitchTypeName}`,
			tooltip: `${Math.round(percent * 100)}% ${pitchTypeName} (${metrics.total_pitches} ${unit})`
		};
		return PieSlice.fromObject(sliceData);
	}
</script>

<PieChart
	{chartData}
	{chartTitle}
	{showTitle}
	{showDescription}
	{chartHeight}
	{pieWidth}
	{chartTitleFontSize}
	{legendFontSize}
	{legendFontWeight}
/>
