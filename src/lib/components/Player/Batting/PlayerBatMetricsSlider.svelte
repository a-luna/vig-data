<script lang="ts">
	import type { CareerBatStats, TeamBatStats } from '$lib/api/types';
	import type { BatMetricOption, CarouselSettings, PieChartSettings } from '$lib/types';
	import { onMount } from 'svelte';
	import BatOrderPieChart from './PieCharts/BatOrderPieChart.svelte';
	import DefPositionPieChart from './PieCharts/DefPositionPieChart.svelte';
	import StartBenchPieChart from './PieCharts/StartBenchPieChart.svelte';
	import BattingMetricsSelector from './Selectors/BattingMetricsSelector.svelte';

	export let careerBatStats: CareerBatStats;
	export let carouselSettings: CarouselSettings;
	export let chartSettings: PieChartSettings;
	let seasonBatStats: { [key: number]: TeamBatStats } = {};
	let showMetrics: BatMetricOption = 'start/bench';
	let Carousel;

	$: careerBatStats.by_team_by_year.filter((s) => s.all_stats_for_season).map((s) => (seasonBatStats[s.year] = s));
	$: allSeasonsPlayed = Object.keys(seasonBatStats)
		.map((k) => parseInt(k))
		.sort((a, b) => b - a);
	$: firstYearPlayed = allSeasonsPlayed.slice(-1);
	$: mostRecentYearPlayed = allSeasonsPlayed.slice(0, 1);
	$: careerChartTitle = `${firstYearPlayed}-${mostRecentYearPlayed}`;

	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});
</script>

<div
	class="carousel-wrapper section {carouselSettings.padding} m-0 flex flex-col gap-4 sm:gap-2"
	style="width: {carouselSettings.width}"
>
	<BattingMetricsSelector on:changed={(e) => (showMetrics = e.detail)} />
	{#if showMetrics === 'start/bench'}
		<svelte:component this={Carousel} {...carouselSettings.props}>
			<StartBenchPieChart
				batStats={careerBatStats.career}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<StartBenchPieChart
					batStats={seasonBatStats[year]}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</svelte:component>
	{:else if showMetrics === 'defpos'}
		<svelte:component this={Carousel} {...carouselSettings.props}>
			<DefPositionPieChart
				defPosMetrics={careerBatStats.career.def_position_metrics}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<DefPositionPieChart
					defPosMetrics={seasonBatStats[year].def_position_metrics}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</svelte:component>
	{:else if showMetrics === 'batorder'}
		<svelte:component this={Carousel} {...carouselSettings.props}>
			<BatOrderPieChart
				batOrderMetrics={careerBatStats.career.bat_order_metrics}
				threshold={5}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<BatOrderPieChart
					batOrderMetrics={seasonBatStats[year].bat_order_metrics}
					threshold={5}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</svelte:component>
	{/if}
</div>
