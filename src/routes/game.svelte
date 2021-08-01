<script lang="ts">
	import { page } from '$app/stores';
	import { getAllPlayByPlayData, getBoxscore } from '$lib/api/game';
	import type { ApiResponse, AtBatDetails, Boxscore as BoxscoreSchema, Result } from '$lib/api/types';
	import AtBatViewer from '$lib/components/AtBatViewer/AtBatViewer.svelte';
	import Boxscore from '$lib/components/Boxscore/Boxscore.svelte';
	import GameContentSelector from '$lib/components/ButtonGroups/GameContentSelector.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { GAME_ID_REGEX } from '$lib/regex';
	import { gameContentShown } from '$lib/stores/singleValueStores';
	import type { GameContent } from '$lib/types';
	import { getDateFromGameId } from '$lib/util';
	import { onMount } from 'svelte';

	let game_id: string;
	let game_summary: string;
	let boxscore: BoxscoreSchema;
	let all_pbp: AtBatDetails[];
	let atBatViewer: AtBatViewer;
	let date_str: string;
	let getAllGameDataRequest: Promise<ApiResponse<BoxscoreSchema> | Result<Date> | ApiResponse<AtBatDetails[]>>;
	let getBoxscoreResult: ApiResponse<BoxscoreSchema>;
	let getGameDateResult: Result<Date>;
	let getAllPBPResult: ApiResponse<AtBatDetails[]>;
  let loading = false;

	$: pbpShown = $gameContentShown === 'pbp';
	$: boxShown = $gameContentShown === 'box';
	// $: chartsShown = $gameContentShown === 'charts';

	$: if (game_id !== undefined && game_id !== $page.query.get('id')) {
		updateGameData($page.query.get('id'));
	}

	onMount(() => {
		$gameContentShown = ($page.query.get('show') as GameContent) || 'box';
		getAllGameDataRequest = getAllGameData($page.query.get('id'));
	});

	async function getAllGameData(
		newGameId: string
	): Promise<ApiResponse<BoxscoreSchema> | Result<Date> | ApiResponse<AtBatDetails[]>> {
    loading = true;
		getBoxscoreResult = await getBoxscore(newGameId);
		if (!getBoxscoreResult.success) {
			return getBoxscoreResult;
		}
		game_id = newGameId;
		boxscore = getBoxscoreResult.value;

		getGameDateResult = getDateFromGameId(game_id);
		if (!getGameDateResult.success) {
      loading = false;
			return getGameDateResult;
		}
		const game_date = getGameDateResult.value;
		date_str = `${game_date.getMonth() + 1}/${game_date.getDate()}/${game_date.getFullYear()}`;
		game_summary = `${boxscore.away_team.team_id} vs ${boxscore.home_team.team_id} (${date_str})`;

		getAllPBPResult = await getAllPlayByPlayData(game_id);
		if (!getAllPBPResult.success) {
      loading = false;
			return getAllPBPResult;
		}
		all_pbp = getAllPBPResult.value;
    loading = false;
		return getAllPBPResult;
	}

	function viewAtBat(atBatId: string): void {
		atBatViewer.viewAtBat(atBatId);
		$gameContentShown = 'pbp';
		changePageAddress('pbp');
	}

	function updateGameData(newGameId: string): void {
		if ($page.query.get('show') !== 'box') {
			$gameContentShown = 'box';
			changePageAddress('box');
		}
		getAllGameDataRequest = getAllGameData(newGameId);
	}

	function changePageAddress(gameContent: 'pbp' | 'box' | 'charts') {
		window.history.pushState(
			{ game_id: game_id },
			`${game_summary ? game_summary : getDefaultGameSummary()} | Vigorish`,
			`game?id=${game_id}&show=${gameContent}`
		);
	}

	function getDefaultGameSummary(): string {
		const match = GAME_ID_REGEX.exec(game_id);
		if (match) {
			const date_str = `${match.groups.month}/${match.groups.day}/${match.groups.year}`;
			return `MLB Boxscore for ${date_str}`;
		}
		return 'MLB Boxscore';
	}
</script>

<svelte:head>
	<title>{game_summary ? game_summary : getDefaultGameSummary()} | Vigorish</title>
</svelte:head>

<GameContentSelector color={'secondary'} on:changed={(event) => changePageAddress(event.detail)} />
{#if getAllGameDataRequest}
	{#await getAllGameDataRequest}
    <LoadingScreen bind:loading />
  {:then result}
		{#if result.success}
			<Boxscore
				bind:boxscore
				bind:shown={boxShown}
				on:viewPitchFxForAtBatClicked={(event) => viewAtBat(event.detail)}
			/>
			<AtBatViewer
				bind:this={atBatViewer}
				bind:shown={pbpShown}
				on:readyForData={() => atBatViewer.init(all_pbp, boxscore)}
			/>
		{:else}
			<div class="error">Error: {result.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{/if}
