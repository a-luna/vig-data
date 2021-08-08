<script lang="ts">
	import { getScoreboardForDate } from '$lib/api/game';
	import type { ApiResponse, GameData, MlbSeason, Result, Scoreboard } from '$lib/api/types';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';
	import PitcherResults from '$lib/components/Linescore/PitcherResults.svelte';
	import DateNavigation from '$lib/components/Scoreboard/DateNavigation.svelte';
	import DatePickerModal from '$lib/components/Scoreboard/DatePickerModal.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { getSeasonDates, getStringFromDate } from '$lib/util';

	export let value: Date;
	let success: boolean;
	let error_message: string;
	let games_for_date: GameData[];
	let season: MlbSeason;
	let minDate: Date;
	let maxDate: Date;
	let getScoreboardRequest: Promise<ApiResponse<Scoreboard> | Result<Date> | Result<Date[]>>;
	let datePickerModal: DatePickerModal;

	async function getScoreboard(date: Date) {
		const getScoreboardResult = await getScoreboardForDate(getStringFromDate(date));
		success = getScoreboardResult.success;
		if (!success) {
			error_message = getScoreboardResult.message;
			return getScoreboardResult;
		}
		const scoreboard = getScoreboardResult.value;
		season = scoreboard.season;
		games_for_date = scoreboard.games_for_date;
		const getSeasonDatesResult = getSeasonDates(season.start_date, season.end_date);
		if (!getSeasonDatesResult.success) {
			error_message = getSeasonDatesResult.message;
			return getSeasonDatesResult;
		}
		[minDate, maxDate] = getSeasonDatesResult.value;
	}

	$: if ($scoreboardDate) getScoreboardRequest = getScoreboard($scoreboardDate);
</script>

<DatePickerModal bind:this={datePickerModal} bind:minDate bind:maxDate />

<div id="scoreboard" class="scoreboard-wrapper">
	{#if getScoreboardRequest}
		{#await getScoreboardRequest}
			<Spinner />
		{:then _result}
			{#if success}
				<DateNavigation {minDate} {maxDate} on:showDatePicker={() => datePickerModal.toggleModal()} />
				<h3 class="my-2 text-xl text-center sm:text-2xl">Games Played on {value.toDateString()}</h3>
				<div class="flex flex-row flex-wrap justify-center flex-grow-0 mx-auto my-0 text-sm scoreboard">
					{#each games_for_date as { linescore, pitcher_results, game_id }}
						<div class="self-start m-3 game">
							<Linescore {linescore} />
							<div class="flex flex-row justify-between game-footer flex-nowrap">
								<PitcherResults {...pitcher_results} />
								<div class="links flex flex-col flex-nowrap justify-start text-right mt-1.5 mr1.5">
									<a sveltekit:prefetch href="/game?id={game_id}&show=box">Boxscore</a>
									<a sveltekit:prefetch href="/game?id={game_id}&show=pbp">Play-By-Play</a>
									<a sveltekit:prefetch href="/game?id={game_id}&show=charts">Charts/Graphs</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="error">Error: {error_message}</div>
			{/if}
		{:catch error}
			<div class="error">Error: {error}</div>
		{/await}
	{/if}
</div>

<style lang="postcss">
	.game {
		width: 295px;
	}

	#scoreboard :global(.resp-table) {
		width: 100%;
	}
</style>
