<script lang="ts">
	import type { CareerPitchStats, TeamPitchStats } from '$lib/api/types';
	import PitchMixPieChart from '$lib/components/Player/Pitching/PieCharts/PitchMixPieChart.svelte';
	import StarterRelieverPieChart from '$lib/components/Player/Pitching/PieCharts/StarterRelieverPieChart.svelte';
	import PitchingMetricsSelector from '$lib/components/Player/Pitching/Selectors/PitchingMetricsSelector.svelte';
	import type { CarouselSettings, PieChartSettings, PitcherPieChart } from '$lib/types';
	import Carousel from '@beyonk/svelte-carousel/src/Carousel.svelte';

	export let careerPitchStats: CareerPitchStats;
	export let carouselSettings: CarouselSettings;
	export let chartSettings: PieChartSettings;
	let seasonPitchStats: { [key: number]: TeamPitchStats } = {};
	let showMetrics: PitcherPieChart = 'pitch-mix';

	$: careerPitchStats.by_team_by_year.filter((s) => s.all_stats_for_season).map((s) => (seasonPitchStats[s.year] = s));
	$: allSeasonsPlayed = Object.keys(seasonPitchStats)
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
	<PitchingMetricsSelector on:changed={(e) => (showMetrics = e.detail)} />
	{#if showMetrics === 'pitch-mix'}
		<Carousel {...carouselSettings.props}>
			<PitchMixPieChart
				slideContent={true}
				year={0}
				stance={'all'}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<PitchMixPieChart
					slideContent={true}
					{year}
					stance={'all'}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</Carousel>
	{:else if showMetrics === 'role'}
		<Carousel {...carouselSettings.props}>
			<StarterRelieverPieChart
				slideContent={true}
				pitchStats={careerPitchStats.career}
				{chartSettings}
				chartTitle={careerChartTitle}
				showDescription={false}
			/>
			{#each allSeasonsPlayed as year}
				<StarterRelieverPieChart
					slideContent={true}
					pitchStats={seasonPitchStats[year]}
					{chartSettings}
					chartTitle={year.toString()}
					showDescription={false}
				/>
			{/each}
		</Carousel>
	{/if}
</div>
