<script lang="ts">
	import { getScoreboard } from '$lib/api/game';
	import type { ApiResponse, GameData, MlbSeason, Result, Scoreboard } from '$lib/api/types';
	import DateNavigation from '$lib/components/ButtonGroups/DateNavigation.svelte';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';
	import PitcherResults from '$lib/components/Linescore/PitcherResults.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import { getDateFromString, getSeasonDates } from '$lib/util';
	import { Pulse } from '../../../../node_modules/svelte-loading-spinners/src';

	let selected: Date;
	let success: boolean;
	let error_message: string;
	let games_for_date: GameData[];
	let season: MlbSeason;
	let start: Date;
	let end: Date;
	let getScoreboardRequest: Promise<ApiResponse<Scoreboard> | Result<Date> | Result<Date[]>>;

	async function getScoreboardForDate(date: string) {
		const getScoreboardResult = await getScoreboard(date);
		success = getScoreboardResult.success;
		if (!success) {
			error_message = getScoreboardResult.message;
			return getScoreboardResult;
		}
		const scoreboard = getScoreboardResult.value;
		season = scoreboard.season;
		games_for_date = scoreboard.games_for_date;
		const getGameDateresult = getDateFromString(date);
		if (!getGameDateresult.success) {
			error_message = getGameDateresult.message;
			return getGameDateresult;
		}
		selected = getGameDateresult.value;
		const getSeasonDatesResult = getSeasonDates(season.start_date, season.end_date);
		if (!getSeasonDatesResult.success) {
			error_message = getSeasonDatesResult.message;
			return getSeasonDatesResult;
		}
		[start, end] = getSeasonDatesResult.value;
	}

	$: if ($seasonStatFilter.gameDate) getScoreboardRequest = getScoreboardForDate($seasonStatFilter.gameDate);

</script>

<div id="scoreboard" class="scoreboard-wrapper">
	{#if getScoreboardRequest}
		{#await getScoreboardRequest}
			<div class="pending"><Pulse size="40" color={`currentColor`} /></div>
		{:then _result}
			{#if success}
				<DateNavigation {start} {end} bind:selected />
				<h3 class="text-center my-2">Games Played on {selected.toDateString()}</h3>
				<div class="scoreboard">
					{#each games_for_date as { linescore, pitcher_results, game_id }}
						<div class="game">
							<Linescore {linescore} />
							<div class="game-footer flex flex-row flex-nowrap justify-between">
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
	.scoreboard {
		@apply text-sm flex flex-row flex-wrap justify-center flex-grow-0 mx-auto my-0;
	}

	.game {
		@apply self-start m-3;
		width: 295px;
	}

	#scoreboard :global(.resp-table) {
		width: 100%;
	}

</style>
