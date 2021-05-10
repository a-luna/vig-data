<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { getBoxscore, getAllPlayByPlayData } from '$lib/api/game';
	import type { ApiResponse, AtBatDetails, Boxscore, Result } from '$lib/api/types';
	import { getDateFromGameId } from '$lib/util';
	import GameSummary from '$lib/components/Boxscore/GameSummary.svelte';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';
	import TeamBattingStats from '$lib/components/Boxscore/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/Boxscore/TeamPitchingStats.svelte';
	import AtBatResultsModal from '$lib/components/Modals/AtBatResultsModal.svelte';
	import PitcherInningTotalsModal from '$lib/components/Modals/PitcherInningTotalsModal.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import GameMetaInfo from './GameMetaInfo.svelte';

	export let shown: boolean;
	export let game_summary: string;
	export let boxscore: Boxscore;
	export let game_id: string;
	export let all_pbp: AtBatDetails[];
	let success: boolean;
	let getBoxscoreRequest: Promise<
		ApiResponse<Boxscore> | Result<Date> | ApiResponse<AtBatDetails[]>
	>;
	let matchup: string[];
	let date_str: string;
	let atBatResultsModal: AtBatResultsModal;
	let pitcherInningTotalsModal: PitcherInningTotalsModal;
	const dispatch = createEventDispatcher();

	async function getBoxscoreForGame(
		newGameId: string
	): Promise<ApiResponse<Boxscore> | Result<Date> | ApiResponse<AtBatDetails[]>> {
		const getBoxscoreResult = await getBoxscore(newGameId);
		success = getBoxscoreResult.success;
		if (!success) {
			return getBoxscoreResult;
		}
		game_id = newGameId;
		boxscore = getBoxscoreResult.value;

		const getGameDateResult = getDateFromGameId(game_id);
		success = getGameDateResult.success;
		if (!success) {
			return getGameDateResult;
		}
		const game_date = getGameDateResult.value;
		matchup = [boxscore.away_team.team_id, boxscore.home_team.team_id];
		date_str = `${game_date.getMonth() + 1}/${game_date.getDate()}/${game_date.getFullYear()}`;
		game_summary = `${boxscore.away_team.team_id} vs ${boxscore.home_team.team_id} (${date_str})`;

		const getAllPBPResult = await getAllPlayByPlayData(game_id);
		success = getAllPBPResult.success;
		if (!success) {
			return getAllPBPResult;
		}
		all_pbp = getAllPBPResult.value;
		dispatch('allPlayByPlayDataFetched', all_pbp);
		return getAllPBPResult;
	}

	onMount(() => (game_id = $page.params.game_id));
	if (!boxscore) getBoxscoreRequest = getBoxscoreForGame($page.params.game_id);

	$: if (game_id !== undefined && game_id !== $page.params.game_id)
		getBoxscoreRequest = getBoxscoreForGame($page.params.game_id);
</script>

<AtBatResultsModal bind:this={atBatResultsModal} {boxscore} on:viewPitchFxForAtBatClicked />
<PitcherInningTotalsModal bind:this={pitcherInningTotalsModal} {boxscore} />

<div class:not-shown={!shown} class="boxscore">
	{#if getBoxscoreRequest}
		{#await getBoxscoreRequest}
			<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
		{:then result}
			{#if result.success}
				<GameSummary away_team={boxscore.away_team} home_team={boxscore.home_team} />
				<Linescore {...boxscore} expanded={true} />
				<div class="mx-auto my-0 w-min">
					<TeamBattingStats
						teamData={boxscore.away_team}
						on:viewAtBatResultsClicked={(event) =>
							atBatResultsModal.viewAtBatResultsForPlayer(event.detail)}
					/>
					<TeamBattingStats
						teamData={boxscore.home_team}
						on:viewAtBatResultsClicked={(event) =>
							atBatResultsModal.viewAtBatResultsForPlayer(event.detail)}
					/>
					<TeamPitchingStats
						teamData={boxscore.away_team}
						on:viewPitcherInningTotalsClicked={(event) =>
							pitcherInningTotalsModal.viewInningTotalsForPitcher(event.detail)}
					/>
					<TeamPitchingStats
						teamData={boxscore.home_team}
						on:viewPitcherInningTotalsClicked={(event) =>
							pitcherInningTotalsModal.viewInningTotalsForPitcher(event.detail)}
					/>
					<GameMetaInfo {...boxscore.game_meta} />
				</div>
			{:else}
				<div class="error">Error: {result.message}</div>
			{/if}
		{:catch error}
			<div class="error">Error: {error.message}</div>
		{/await}
	{/if}
</div>

<style lang="postcss">
	.boxscore {
		@apply flex flex-col flex-nowrap justify-start;
	}

	.not-shown {
		display: none;
	}
</style>
