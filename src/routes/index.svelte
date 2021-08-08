<script lang="ts">
	import { getScoreboardForDate } from '$lib/api/game';
	import { getPlayerPitchStatsForDate, getStandingsOnDate } from '$lib/api/season';
	import type {
		ApiResponse,
		GameData,
		MlbSeason,
		PlayerPitchStats,
		Result,
		Scoreboard,
		SeasonData
	} from '$lib/api/types';
	import PitchStatsForDate from '$lib/components/HomePage/PitchStatsForDate/PitchStatsForDate.svelte';
	import ScoreboardForDate from '$lib/components/HomePage/ScoreboardForDate/ScoreboardForDate.svelte';
	import StandingsForDate from '$lib/components/HomePage/StandingsForDate/StandingsForDate.svelte';
	import DateNavigation from '$lib/components/Scoreboard/DateNavigation.svelte';
	import DatePickerModal from '$lib/components/Scoreboard/DatePickerModal.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { getSeasonDates, getStringFromDate } from '$lib/util';

	let error_message: string;
	let games_for_date: GameData[];
	let season: MlbSeason;
	let minDate: Date;
	let maxDate: Date;
	let pitchStats: PlayerPitchStats[] = [];
	let seasonStandings: SeasonData;
	let datePickerModal: DatePickerModal;
	let loading = true;
	let allApiRequests: Promise<
		[ApiResponse<Scoreboard> | Result<Date[]>, ApiResponse<SeasonData>, ApiResponse<PlayerPitchStats[]>]
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

	async function getPlayerPitchStats(date: Date): Promise<ApiResponse<PlayerPitchStats[]>> {
		const result = await getPlayerPitchStatsForDate(getStringFromDate(date));
		if (!result.success) {
			error_message = result.message;
			return result;
		}
		pitchStats = result.value;
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

	$: if ($scoreboardDate) {
		allApiRequests = Promise.all([
			getScoreboard($scoreboardDate),
			getStandings($scoreboardDate),
			getPlayerPitchStats($scoreboardDate)
		]);
	}
	$: if (season) getSeasonStartAndEndDates();
</script>

<svelte:head>
	<title>MLB Stats, Scores and Charts | Vigorish</title>
</svelte:head>

<DatePickerModal bind:this={datePickerModal} bind:minDate bind:maxDate />

{#if allApiRequests}
	{#await allApiRequests}
		<LoadingScreen {loading} />
	{:then result}
		{#if result.every((r) => r.success)}
			<div class="flex flex-col flex-nowrap" use:removeLoadingScreen>
				<DateNavigation {minDate} {maxDate} on:showDatePicker={() => datePickerModal.toggleModal()} />
				<div class="flex flex-col sm:flex-row justify-start sm:justify-around flex-grow mb-2 mx-auto sm:mx-0 flex-wrap">
					<ScoreboardForDate {games_for_date} {pitchStats} />
					<StandingsForDate {seasonStandings} />
				</div>
				<PitchStatsForDate {pitchStats} />
			</div>
		{:else}
			<div class="error">Error: {error_message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error}</div>
	{/await}
{/if}
