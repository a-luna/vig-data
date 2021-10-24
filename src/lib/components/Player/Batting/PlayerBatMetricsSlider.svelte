<script lang="ts">
	import type { CareerBatStats, TeamBatStats } from '$lib/api/types';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { OffensiveRole } from '$lib/types';
	import { onMount } from 'svelte';
	import BatOrderPieChart from './PieCharts/BatOrderPieChart.svelte';
	import DefPositionPieChart from './PieCharts/DefPositionPieChart.svelte';
	import StartBenchPieChart from './PieCharts/StartBenchPieChart.svelte';
	import BattingMetricsSelector from './Selectors/BattingMetricsSelector.svelte';

	export let careerBatStats: CareerBatStats;
	let seasonBatStats: { [key: number]: TeamBatStats } = {};
	let showMetrics: OffensiveRole = 'start/bench';
	let Carousel;

	$: careerBatStats.by_team_by_year.filter((s) => s.all_stats_for_season).map((s) => (seasonBatStats[s.year] = s));
	$: allSeasonsPlayed = Object.keys(seasonBatStats)
		.map((k) => parseInt(k))
		.sort((a, b) => a - b);
	$: firstYearPlayed = allSeasonsPlayed.slice(0, 1);
	$: mostRecentYearPlayed = allSeasonsPlayed.slice(-1);
	$: careerChartTitle = `${firstYearPlayed}-${mostRecentYearPlayed}`;
	$: width = getSliderWidth($pageBreakPoints.width);
	$: props = getSliderProps($pageBreakPoints.width);

	const getSliderWidth = (pageWidth: number) =>
		pageWidth >= 880
			? '580px'
			: pageWidth >= 768
			? '410px'
			: pageWidth >= 640
			? '300px'
			: `calc(${pageWidth}px - 1.5rem)`;

	const getSliderProps = (pageWidth: number) =>
		pageWidth >= 880
			? { infinite: false, dots: false, particlesToShow: 3 }
			: pageWidth >= 768
			? { infinite: false, dots: false, particlesToShow: 2 }
			: pageWidth >= 640
			? { infinite: true, dots: true, particlesToShow: 1 }
			: pageWidth >= 602
			? { infinite: false, dots: false, particlesToShow: 3 }
			: pageWidth >= 432
			? { infinite: false, dots: false, particlesToShow: 2 }
			: { infinite: true, dots: true, particlesToShow: 1 };
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});
</script>

<div class="carousel-wrapper section p-3 sm:pt-4 mt-5 sm:m-0" style="width: {width}">
	<BattingMetricsSelector on:changed={(e) => (showMetrics = e.detail)} />
	{#if showMetrics === 'start/bench'}
		<svelte:component this={Carousel} {...props}>
			<StartBenchPieChart batStats={careerBatStats.career} chartTitle={careerChartTitle} />
			{#each allSeasonsPlayed as year}
				<StartBenchPieChart batStats={seasonBatStats[year]} chartTitle={year.toString()} />
			{/each}
		</svelte:component>
	{:else if showMetrics === 'defpos'}
		<svelte:component this={Carousel} {...props}>
			<DefPositionPieChart defPosMetrics={careerBatStats.career.def_position_metrics} chartTitle={careerChartTitle} />
			{#each allSeasonsPlayed as year}
				<DefPositionPieChart defPosMetrics={seasonBatStats[year].def_position_metrics} chartTitle={year.toString()} />
			{/each}
		</svelte:component>
	{:else if showMetrics === 'batorder'}
		<svelte:component this={Carousel} {...props}>
			<BatOrderPieChart
				batOrderMetrics={careerBatStats.career.bat_order_metrics}
				threshold={5}
				chartTitle={careerChartTitle}
			/>
			{#each allSeasonsPlayed as year}
				<BatOrderPieChart
					batOrderMetrics={seasonBatStats[year].bat_order_metrics}
					threshold={5}
					chartTitle={year.toString()}
				/>
			{/each}
		</svelte:component>
	{/if}
</div>
