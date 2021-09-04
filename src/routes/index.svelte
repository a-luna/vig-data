<script lang="ts">
	import { getScoreboardForDate } from '$lib/api/game';
	import { getPlayerBatStatsForDate, getPlayerPitchStatsForDate, getStandingsOnDate } from '$lib/api/season';
	import type {
		ApiResponse,
		GameData,
		MlbSeason,
		PlayerBatStats,
		PlayerPitchStats,
		Result,
		Scoreboard,
		SeasonData
	} from '$lib/api/types';
	import DateNavigation from '$lib/components/HomePage/DateNavigation.svelte';
	import DateNavigationMobile from '$lib/components/HomePage/DateNavigationMobile.svelte';
	import HomePage from '$lib/components/HomePage/HomePage.svelte';
	import HomePageMobile from '$lib/components/HomePage/HomePageMobile.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { getSeasonDates, getStringFromDate } from '$lib/util';

	let error_message: string;
	let games_for_date: GameData[];
	let season: MlbSeason;
	let minDate: Date;
	let maxDate: Date;
	let pitchStats: PlayerPitchStats[] = [];
	let batStats: PlayerBatStats[] = [];
	let seasonStandings: SeasonData;
	let loading = true;
	let allApiRequests: Promise<
		[
			ApiResponse<Scoreboard> | Result<Date[]>,
			ApiResponse<SeasonData>,
			ApiResponse<PlayerPitchStats[]>,
			ApiResponse<PlayerBatStats[]>
		]
	>;

	function removeLoadingScreen(_el: HTMLElement) {
		loading = false;
	}

	async function getStandings(date: Date): Promise<ApiResponse<SeasonData>> {
		const result = await getStandingsOnDate(date);
		if (!result.success) {
			error_message = result.message;
			return result;
		}
		seasonStandings = result.value;
		return result;
	}

	async function getScoreboard(date: Date): Promise<ApiResponse<Scoreboard>> {
		const result = await getScoreboardForDate(getStringFromDate(date));
		if (!result.success) {
			error_message = result.message;
			return result;
		}
		const scoreboard = result.value;
		({ season, games_for_date } = scoreboard);
		return result;
	}

	async function getPitchStatsForDate(date: Date): Promise<ApiResponse<PlayerPitchStats[]>> {
		const result = await getPlayerPitchStatsForDate(getStringFromDate(date));
		if (!result.success) {
			error_message = result.message;
			return result;
		}
		pitchStats = result.value;
		return result;
	}

	async function getBatStatsForDate(date: Date): Promise<ApiResponse<PlayerBatStats[]>> {
		const result = await getPlayerBatStatsForDate(getStringFromDate(date));
		if (!result.success) {
			error_message = result.message;
			return result;
		}
		batStats = result.value;
		return result;
	}

	function getSeasonStartAndEndDates() {
		const getSeasonDatesResult = getSeasonDates(season.start_date, season.end_date);
		if (!getSeasonDatesResult.success) {
			error_message = getSeasonDatesResult.message;
			return getSeasonDatesResult;
		}
		[minDate, maxDate] = getSeasonDatesResult.value;
	}

	function handleDateChanged() {
		loading = true;
	}

	$: if ($scoreboardDate) {
		allApiRequests = Promise.all([
			getScoreboard($scoreboardDate),
			getStandings($scoreboardDate),
			getPitchStatsForDate($scoreboardDate),
			getBatStatsForDate($scoreboardDate)
		]);
	}
	$: if (season) getSeasonStartAndEndDates();
</script>

<svelte:head>
	<title>MLB Stats, Scores and Charts | Vigorish</title>
</svelte:head>

{#if allApiRequests}
	{#await allApiRequests}
		<LoadingScreen {loading} />
	{:then result}
		{#if result.every((r) => r.success)}
			<div id="home" class="flex flex-col flex-nowrap" use:removeLoadingScreen>
				<div class="hidden sm:block">
					<DateNavigation {minDate} {maxDate} on:dateChanged={() => handleDateChanged()} />
					<HomePage {games_for_date} {seasonStandings} {pitchStats} {batStats} />
				</div>
				<div class="block sm:hidden">
					<DateNavigationMobile {minDate} {maxDate} on:dateChanged={() => handleDateChanged()} />
					<HomePageMobile {games_for_date} {seasonStandings} {pitchStats} {batStats} />
				</div>
			</div>
		{:else}
			<div class="error">Error: {error_message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error}</div>
	{/await}
{/if}

<style lang="postcss">
	:global(#home .svelte-tabs__tab-list) {
		@apply flex flex-row justify-center flex-grow-0 flex-nowrap text-center my-5;
		border-bottom: none;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab) {
		@apply px-2 py-1 m-0 font-normal rounded-none shadow-md focus:outline-none;
		color: var(--sec-color);
		border-top: 1px solid var(--sec-color);
		border-bottom: 1px solid var(--sec-color);
		border-left: 1px solid var(--sec-color);
		border-right: none;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:hover) {
		background-color: var(--sec-color-hov);
		color: var(--color-on-sec-hov);
		border-top: 1px solid transparent;
		border-bottom: 1px solid transparent;
		border-left: 1px solid transparent;
		border-right: none;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:first-child),
	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:first-child:hover) {
		@apply rounded-tr-none rounded-br-none rounded-tl-md rounded-bl-md;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:last-child) {
		@apply rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md;
		border-right: 1px solid var(--sec-color);
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__tab:last-child:hover) {
		@apply rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md;
		border-right: 1px solid transparent;
	}

	:global(.svelte-tabs__tab-list li.svelte-tabs__selected),
	:global(.svelte-tabs__tab-list li.svelte-tabs__selected:hover) {
		@apply px-2 py-1 m-0 font-normal rounded-none shadow-md focus:outline-none;
		background: var(--sec-color);
		color: var(--color-on-sec);
	}
</style>
