<script lang="ts">
	import type { PitchFxMetrics } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP, PITCH_TYPE_MAP } from '$lib/constants';
	import { pitchTypeMetricsByYearByStance } from '$lib/stores/pfxPitcherMetrics';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import { BatterStance, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let chartTitle: string = '';
	export let stance: BatterStance = 'all';
	export let showTitle: boolean = true;

	$: pieTotal = $pitchTypeMetricsByYearByStance['total_pitches'][$playerSeason][stance];
	$: pieSlices = $pitchTypeMetricsByYearByStance['metrics'][$playerSeason][stance].map((metrics) =>
		createPieSlice(metrics)
	);
	$: chartData = prepareSvgPieChart(pieSlices);

	function createPieSlice(metrics: PitchFxMetrics): PieSlice {
		const pitchTypeAbbrev = PITCH_TYPE_MAP[metrics.pitch_type_int];
		const pitchTypeName = PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchTypeAbbrev];
		const percent = metrics.total_pitches / pieTotal;
		const sliceData = {
			value: metrics.total_pitches,
			pieTotal: pieTotal,
			label: pitchTypeAbbrev,
			color: `var(--pitch-type-${pitchTypeAbbrev})`,
			unit: 'pitches',
			description: `${(percent * 100).toFixed(0)}% ${pitchTypeName}`
		};
		return PieSlice.fromObject(sliceData);
	}
</script>

<div class="flex-initial my-auto pitch-mix-chart">
	<PieChart {chartData} {chartTitle} {showTitle} />
</div>
