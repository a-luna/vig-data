<script lang="ts">
	import type { PitchFxMetrics } from '$lib/api/types';
	import PieChart from '$lib/components/Util/PieChart/PieChart.svelte';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP, PITCH_TYPE_MAP } from '$lib/constants';
	import { pitchTypeMetricsByYearByStance } from '$lib/stores/pfxPitcherMetrics';
	import { BatterStance, PieSlice } from '$lib/types';
	import { prepareSvgPieChart } from '$lib/util';

	export let chartTitle: string;
	export let stance: BatterStance = 'all';
	export let year: number = 0;

	const pieTotal = $pitchTypeMetricsByYearByStance['total_pitches'][year][stance];
	const pieSlices = $pitchTypeMetricsByYearByStance['metrics'][year][stance].map((metrics) => createPieSlice(metrics));
	const chartData = prepareSvgPieChart(pieSlices);
	const totalBattersFaced = $pitchTypeMetricsByYearByStance['metrics'][year][stance]
		.map((metrics) => metrics.total_at_bats)
		.reduce((prev, current) => prev + current, 0);
	const chartDescription = `${totalBattersFaced} total at bats`;

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

<PieChart {chartData} {chartDescription} {chartTitle} />
