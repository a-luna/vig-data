<script lang="ts">
	import type { CareerBatStats, TeamBatStats } from '$lib/api/types';
	import BatOrderPieChart from '$lib/components/Player/Batting/PieCharts/BatOrderPieChart.svelte';
	import DefPositionPieChart from '$lib/components/Player/Batting/PieCharts/DefPositionPieChart.svelte';
	import StartBenchPieChart from '$lib/components/Player/Batting/PieCharts/StartBenchPieChart.svelte';
	import BattingMetricsSelector from '$lib/components/Player/Batting/Selectors/BattingMetricsSelector.svelte';
	import type { BatterPieChart, CarouselSettings, PieChartSettings } from '$lib/types';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte';

	export let careerBatStats: CareerBatStats;
	export let carouselSettings: CarouselSettings;
	export let chartSettings: PieChartSettings;
	let seasonBatStats: { [key: number]: TeamBatStats } = {};
	let showMetrics: BatterPieChart = 'start/bench';

	$: careerBatStats.by_team_by_year.filter((s) => s.all_stats_for_season).map((s) => (seasonBatStats[s.year] = s));
	$: allSeasonsPlayed = Object.keys(seasonBatStats)
		.map((k) => parseInt(k))
		.sort((a, b) => b - a);
	$: firstYearPlayed = allSeasonsPlayed.slice(-1);
	$: mostRecentYearPlayed = allSeasonsPlayed.slice(0, 1);
	$: careerChartTitle = `${firstYearPlayed}-${mostRecentYearPlayed}`;
</script>

<div
	class="carousel-wrapper section {carouselSettings.padding} m-0 flex flex-col gap-4 sm:gap-2"
	style="width: {carouselSettings.width}"
>
	<BattingMetricsSelector on:changed={(e) => (showMetrics = e.detail)} />
	{#if showMetrics === 'start/bench'}
		<Carousel {...carouselSettings.props}>
			<StartBenchPieChart
				slideContent={true}
				batStats={careerBatStats.career}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<StartBenchPieChart
					slideContent={true}
					batStats={seasonBatStats[year]}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</Carousel>
	{:else if showMetrics === 'defpos'}
		<Carousel {...carouselSettings.props}>
			<DefPositionPieChart
				slideContent={true}
				defPosMetrics={careerBatStats.career.def_position_metrics}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<DefPositionPieChart
					slideContent={true}
					defPosMetrics={seasonBatStats[year].def_position_metrics}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</Carousel>
	{:else if showMetrics === 'batorder'}
		<Carousel {...carouselSettings.props}>
			<BatOrderPieChart
				slideContent={true}
				batOrderMetrics={careerBatStats.career.bat_order_metrics}
				threshold={5}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<BatOrderPieChart
					slideContent={true}
					batOrderMetrics={seasonBatStats[year].bat_order_metrics}
					threshold={5}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</Carousel>
	{/if}
</div>
