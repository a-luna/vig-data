<script lang="ts">
	import { page } from '$app/stores';
	import { getCareerBatStatsForPlayer, getPlayerDetails } from '$lib/api/player';
	import type {
		ApiResponse,
		CareerBatStats,
		DefPositionMetrics,
		PlayerDetails as PlayerDetailsSchema,
		TeamBatStats
	} from '$lib/api/types';
	import CareerBatStatsTable from '$lib/components/Player/Batting/CareerBatStatsTable.svelte';
	import DefPositionPieChart from '$lib/components/Player/Batting/PieCharts/DefPositionPieChart.svelte';
	import StartBenchPieChart from '$lib/components/Player/Batting/PieCharts/StartBenchPieChart.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { onMount } from 'svelte';

	export let playerDetails: PlayerDetailsSchema;
	let careerBatStats: CareerBatStats;
	let playerName: string;
	let allSeasonsPlayed: number[];
	let firstYearPlayed: number;
	let mostRecentYearPlayed: number;
	let careerDefPosMetrics: DefPositionMetrics[];
	let mostRecentBatStats: TeamBatStats;
	let getCareerPfxDataRequest: Promise<ApiResponse<CareerBatStats> | ApiResponse<PlayerDetailsSchema>>;
	let getCareerPfxDataResult: ApiResponse<CareerBatStats>;
	let getPlayerDetailsResult: ApiResponse<PlayerDetailsSchema>;
	let loading = false;

	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;
	$: if (careerBatStats) careerDefPosMetrics = careerBatStats.career.def_position_metrics;
	$: if (careerBatStats)
		allSeasonsPlayed = careerBatStats.by_team_by_year
			.filter((s) => s.all_stats_for_season)
			.sort((a, b) => b.year - a.year)
			.map((s) => s.year);
	$: if (allSeasonsPlayed) firstYearPlayed = allSeasonsPlayed[allSeasonsPlayed.length - 1];
	$: if (allSeasonsPlayed) mostRecentYearPlayed = allSeasonsPlayed[0];
	$: if (careerBatStats)
		mostRecentBatStats = careerBatStats.by_team_by_year
			.filter((s) => s.all_stats_for_season)
			.sort((a, b) => b.year - a.year)?.[0];

	onMount(() => {
		getCareerPfxDataRequest = getCareerBatStats();
	});

	async function getCareerBatStats() {
		const mlb_id = $page.params.mlb_id;
		loading = true;
		getCareerPfxDataResult = await getCareerBatStatsForPlayer(parseInt(mlb_id));
		if (!getCareerPfxDataResult.success) {
			loading = false;
			return getCareerPfxDataResult;
		}
		careerBatStats = getCareerPfxDataResult.value;

		getPlayerDetailsResult = await getPlayerDetails(parseInt(mlb_id));
		if (!getPlayerDetailsResult.success) {
			loading = false;
			return getPlayerDetailsResult;
		}
		playerDetails = getPlayerDetailsResult.value;
		loading = false;
		return getPlayerDetailsResult;
	}
</script>

<svelte:head>
	<title>{playerName ? playerName : ''} Player Data | Vigorish</title>
</svelte:head>
{#if getCareerPfxDataRequest}
	{#await getCareerPfxDataRequest}
		<LoadingScreen bind:loading />
	{:then result}
		{#if result.success}
			<div id="player-details" class="flex flex-row justify-between sm:mb-5">
				<PlayerDetails {...playerDetails} />
			</div>
			<div class="flex flex-row flex-wrap justify-around gap-5 mb-5">
				<div class="flex flex-row justify-between gap-3 p-3 flex-nowrap section">
					<StartBenchPieChart
						batStats={careerBatStats.career}
						chartTitle={`${firstYearPlayed}-${mostRecentYearPlayed}`}
					/>
					<StartBenchPieChart batStats={mostRecentBatStats} chartTitle={mostRecentYearPlayed.toString()} />
				</div>
				<div class="flex flex-row justify-between gap-3 p-3 flex-nowrap section">
					<DefPositionPieChart
						defPosMetrics={careerDefPosMetrics}
						chartTitle={`${firstYearPlayed}-${mostRecentYearPlayed}`}
					/>
					<DefPositionPieChart
						defPosMetrics={mostRecentBatStats.def_position_metrics}
						chartTitle={mostRecentYearPlayed.toString()}
					/>
				</div>
			</div>
			<CareerBatStatsTable {careerBatStats} sortBy={'year'} sortDir={'asc'} />
		{:else}
			<div class="error">Error: {result.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{/if}
