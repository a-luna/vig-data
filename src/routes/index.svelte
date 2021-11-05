<script lang="ts">
	import { getScoreboardForDate } from '$lib/api/game';
	import {
		getAllValidSeasons,
		getBarrelsForDate,
		getMostRecentScrapedDate,
		getPlayerBatStatsForDate,
		getPlayerPitchStatsForDate,
		getStandingsOnDate
	} from '$lib/api/season';
	import type {
		ApiResponse,
		GameData,
		MlbSeason,
		PitchFx,
		PlayerBatStats,
		PlayerPitchStats,
		Scoreboard,
		SeasonData
	} from '$lib/api/types';
	import DateNavigation from '$lib/components/HomePage/DateNavigation.svelte';
	import DateNavigationMobile from '$lib/components/HomePage/DateNavigationMobile.svelte';
	import HomePage from '$lib/components/HomePage/HomePage.svelte';
	import HomePageMobile from '$lib/components/HomePage/HomePageMobile.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { homePageDate } from '$lib/stores/dateStore';
	import { getStringFromDate } from '$lib/util/datetime';
	import { onMount } from 'svelte';

	let season: MlbSeason;
	let seasonStandings: SeasonData;
	let games_for_date: GameData[];
	let pitchStats: PlayerPitchStats[] = [];
	let batStats: PlayerBatStats[] = [];
	let pfxBarrels: PitchFx[] = [];
	let loading = true;
	let error: string = null;
	let getAllSeasonsComplete = false;
	let getStandingsComplete = false;
	let getScoreboardComplete = false;
	let getPitchStatsComplete = false;
	let getBatStatsComplete = false;
	let getBarrelsComplete = false;

	$: allRequestsComplete =
		getAllSeasonsComplete &&
		getStandingsComplete &&
		getScoreboardComplete &&
		getPitchStatsComplete &&
		getBatStatsComplete &&
		getBarrelsComplete;

	async function getAllSeasons(): Promise<ApiResponse<MlbSeason[]>> {
		const result = await getAllValidSeasons();
		if (!result.success) {
			error = result.message;
			getAllSeasonsComplete = true;
			return result;
		}
		$allSeasons = result.value;
		getAllSeasonsComplete = true;
		return result;
	}

	async function getStandings(date: Date): Promise<ApiResponse<SeasonData>> {
		const result = await getStandingsOnDate(date);
		if (!result.success) {
			error = result.message;
			getStandingsComplete = true;
			return result;
		}
		seasonStandings = result.value;
		getStandingsComplete = true;
		return result;
	}

	async function getScoreboard(date: Date): Promise<ApiResponse<Scoreboard>> {
		const result = await getScoreboardForDate(getStringFromDate(date));
		if (!result.success) {
			error = result.message;
			getScoreboardComplete = true;
			return result;
		}
		const scoreboard = result.value;
		({ season, games_for_date } = scoreboard);
		getScoreboardComplete = true;
		return result;
	}

	async function getPitchStatsForDate(date: Date): Promise<ApiResponse<PlayerPitchStats[]>> {
		const result = await getPlayerPitchStatsForDate(getStringFromDate(date));
		if (!result.success) {
			error = result.message;
			getPitchStatsComplete = true;
			return result;
		}
		pitchStats = result.value;
		getPitchStatsComplete = true;
		return result;
	}

	async function getBatStatsForDate(date: Date): Promise<ApiResponse<PlayerBatStats[]>> {
		const result = await getPlayerBatStatsForDate(getStringFromDate(date));
		if (!result.success) {
			error = result.message;
			getBatStatsComplete = true;
			return result;
		}
		batStats = result.value;
		getBatStatsComplete = true;
		return result;
	}

	async function getAllBarrelsForDate(date: Date): Promise<ApiResponse<PitchFx[]>> {
		const result = await getBarrelsForDate(getStringFromDate(date));
		if (!result.success) {
			error = result.message;
			getBarrelsComplete = true;
			return result;
		}
		pfxBarrels = result.value;
		getBarrelsComplete = true;
		return result;
	}

	async function handleDateChanged(newDate: Date) {
		loading = true;
		getScoreboardComplete = false;
		getStandingsComplete = false;
		getPitchStatsComplete = false;
		getBatStatsComplete = false;
		getBarrelsComplete = false;

		homePageDate.changeDate(newDate);
		await getScoreboard($homePageDate);
		await getStandings($homePageDate);
		await getPitchStatsForDate($homePageDate);
		await getBatStatsForDate($homePageDate);
		await getAllBarrelsForDate($homePageDate);
	}

	function handleSeasonChanged(year: number) {
		if ($allSeasons) {
			season = $allSeasons.find((s) => s.year === year);
			if (season) {
				handleDateChanged(season.start);
			}
		}
	}

	function removeLoadingScreen(_el: HTMLElement) {
		loading = false;
	}

	onMount(async () => {
		await getAllSeasons();
		const mostRecentDate = await getMostRecentScrapedDate();
		await handleDateChanged(mostRecentDate);
	});
</script>

<svelte:head>
	<title>MLB Stats, Scores and Charts | Vigorish</title>
</svelte:head>

<LoadingScreen {loading} />

{#if error}
	<ErrorMessageModal {error} />
{/if}

{#if allRequestsComplete}
	<div id="home" class="flex flex-col flex-nowrap" use:removeLoadingScreen>
		<div class="hidden sm:block">
			<DateNavigation
				{season}
				color={'secondary'}
				on:dateChanged={(e) => handleDateChanged(e.detail)}
				on:seasonChanged={(e) => handleSeasonChanged(e.detail)}
			/>
			<HomePage {games_for_date} {seasonStandings} {pitchStats} {batStats} />
		</div>
		<div class="block sm:hidden">
			<DateNavigationMobile
				{season}
				color={'secondary'}
				on:dateChanged={(e) => handleDateChanged(e.detail)}
				on:seasonChanged={(e) => handleSeasonChanged(e.detail)}
			/>
			<HomePageMobile {games_for_date} {seasonStandings} {pitchStats} {batStats} />
		</div>
	</div>
{/if}

<style lang="postcss">
	:global(#home .svelte-tabs__tab-list) {
		@apply flex flex-row justify-center flex-grow-0 flex-nowrap text-center my-5;
		border-bottom: none;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab) {
		@apply px-2 py-1 m-0 font-normal rounded-none shadow-md focus:outline-none;
		background-color: var(--sec-color);
		color: var(--color-on-sec);
		background-position: center;
		transition: background 0.2s;
		border: 1px solid var(--sec-color);
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:hover) {
		background: var(--sec-color-hov) radial-gradient(circle, transparent 1%, var(--sec-color-hov) 1%) center/15000%;
		color: var(--color-on-sec-hov);
		border: 1px solid transparent;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__selected),
	:global(.svelte-tabs__tab-list li.svelte-tabs__selected:hover) {
		@apply px-2 py-1 m-0 font-normal rounded-none shadow-md focus:outline-none;
		background: var(--sec-color-hov);
		color: var(--color-on-sec-hov);
		border: 1px solid var(--sec-color-hov);
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:first-child),
	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:first-child:hover) {
		@apply rounded-tr-none rounded-br-none rounded-tl-md rounded-bl-md;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:last-child),
	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:last-child:hover) {
		@apply rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md;
	}
</style>
