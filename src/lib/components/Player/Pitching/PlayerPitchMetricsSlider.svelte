<script lang="ts">
	import type { CareerPitchStats, TeamPitchStats } from '$lib/api/types';
	import type { CarouselSettings, PieChartSettings, PitchMetricOption } from '$lib/types';
	import { onMount } from 'svelte';
	import PitchMixPieChart from './PieCharts/PitchMixPieChart.svelte';
	import StarterRelieverPieChart from './PieCharts/StarterRelieverPieChart.svelte';
	import PitchingMetricsSelector from './Selectors/PitchingMetricsSelector.svelte';

	export let careerPitchStats: CareerPitchStats;
	export let carouselSettings: CarouselSettings;
	export let chartSettings: PieChartSettings;
	let seasonBatStats: { [key: number]: TeamPitchStats } = {};
	let showMetrics: PitchMetricOption = 'pitch-mix';
	let Carousel;

	$: careerPitchStats.by_team_by_year.filter((s) => s.all_stats_for_season).map((s) => (seasonBatStats[s.year] = s));
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
	<PitchingMetricsSelector on:changed={(e) => (showMetrics = e.detail)} />
	{#if showMetrics === 'pitch-mix'}
		<svelte:component this={Carousel} {...carouselSettings.props}>
			<PitchMixPieChart
				year={0}
				stance={'all'}
				{...chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<PitchMixPieChart
					{year}
					stance={'all'}
					{...chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</svelte:component>
	{:else if showMetrics === 'role'}
		<svelte:component this={Carousel} {...carouselSettings.props}>
			<StarterRelieverPieChart
				pitchStats={careerPitchStats.career}
				{...chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<StarterRelieverPieChart
					pitchStats={seasonBatStats[year]}
					{...chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</svelte:component>
	{/if}
</div>
