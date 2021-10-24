<script lang="ts">
	import { page } from '$app/stores';
	import { getCareerBatStatsForPlayer, getPlayerDetails } from '$lib/api/player';
	import type {
		ApiResponse,
		BatOrderMetrics,
		CareerBatStats,
		DefPositionMetrics,
		PlayerDetails as PlayerDetailsSchema,
		TeamBatStats
	} from '$lib/api/types';
	import ErrorMessageModal from '$lib/components/Modals/ErrorMessageModal.svelte';
	import CareerBatStatsTable from '$lib/components/Player/Batting/CareerBatStatsTable.svelte';
	import PlayerBatMetricsSlider from '$lib/components/Player/Batting/PlayerBatMetricsSlider.svelte';
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
	let careerBatOrderMetrics: BatOrderMetrics[];
	let mostRecentBatStats: TeamBatStats;
	let loading = false;
	let error: string = null;
	let getCareerStatsComplete = false;
	// let getCareerPfxComplete = false;
	let getPlayerBioComplete = false;

	$: allRequestsComplete = getCareerStatsComplete && getPlayerBioComplete;
	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;
	$: if (careerBatStats) careerDefPosMetrics = careerBatStats.career.def_position_metrics;
	$: if (careerBatStats) careerBatOrderMetrics = careerBatStats.career.bat_order_metrics;
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
		loading = true;
		const mlb_id = parseInt($page.params.mlb_id);
		getCareerBatStats(mlb_id);
		// getCareerPfxData(mlb_id);
		getPlayerBio(mlb_id);
	});

	function removeLoadingScreen(_el: HTMLElement) {
		loading = false;
	}

	async function getCareerBatStats(mlb_id: number) {
		const result = await getCareerBatStatsForPlayer(mlb_id);
		if (!result.success) {
			error = result.message;
			return result;
		}
		careerBatStats = result.value;
		getCareerStatsComplete = true;
		return result;
	}

	// async function getCareerPfxData(mlb_id: number): Promise<ApiResponse<CareerPfxMetricsForPitcher>> {
	// 	const result = await getCareerPfxDataForPitcher(mlb_id);
	// 	if (!result.success) {
	// 		error = result.message;
	// 		return result;
	// 	}
	// 	$careerPfxData = result.value;
	// 	getCareerPfxComplete = true;
	// 	return result;
	// }

	async function getPlayerBio(mlb_id: number): Promise<ApiResponse<PlayerDetailsSchema>> {
		const result = await getPlayerDetails(mlb_id);
		if (!result.success) {
			error = result.message;
			return result;
		}
		playerDetails = result.value;
		getPlayerBioComplete = true;
		return result;
	}
</script>

<svelte:head>
	<title>{playerName ? playerName : ''} Player Data | Vigorish</title>
</svelte:head>

<LoadingScreen {loading} />

{#if error}
	<ErrorMessageModal {error} />
{/if}

{#if allRequestsComplete}
	<div id="player-details" class="flex flex-col items-start justify-start gap-5 flex-nowrap" use:removeLoadingScreen>
		<div class="flex flex-col sm:flex-row justify-start sm:justify-between items-start w-auto sm:w-full flex-nowrap">
			<PlayerDetails {...playerDetails} />
			<PlayerBatMetricsSlider {careerBatStats} />
		</div>
		<CareerBatStatsTable {careerBatStats} sortBy={'year'} sortDir={'asc'} />
	</div>
{/if}
