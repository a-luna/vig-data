<script lang="ts">
	import { page } from '$app/stores';
	import { contentShown } from '$lib/stores';
	import type {
		ApiResponse,
		AtBatDetails,
		Boxscore as BoxscoreSchema,
		Result
	} from '$lib/api/types';
	import AtBatViewer from '$lib/components/AtBatViewer/AtBatViewer.svelte';
	import Boxscore from '$lib/components/Boxscore/Boxscore.svelte';
	import GameContentSelector from '$lib/components/ButtonGroups/GameContentSelector.svelte';
	import { GAME_ID_REGEX } from '$lib/regex';
	import { getAllPlayByPlayData, getBoxscore } from '$lib/api/game';
	import { getDateFromGameId } from '$lib/util';
	import { onMount } from 'svelte';
	import { SyncLoader } from '../../../node_modules/svelte-loading-spinners/src';

	let game_summary: string;
	let boxscore: BoxscoreSchema;
	let all_pbp: AtBatDetails[];
	let game_id: string;
	let atBatViewer: AtBatViewer;
	let date_str: string;
	let success: boolean;
	let getAllGameDataRequest: Promise<
		ApiResponse<BoxscoreSchema> | Result<Date> | ApiResponse<AtBatDetails[]>
	>;

	let contentShownLast: string;
	$: pbpShown = $contentShown === 'pbp';
	$: boxShown = $contentShown === 'box';
	// $: chartsShown = $contentShown === 'charts';

	$: if (game_id !== undefined && game_id !== $page.query.get('id')) {
		updateGameData($page.query.get('id'));
	}

	// $: if (contentShownLast !== $page.query.get('show')) {
	// 	$contentShown = $page.query.get('show');
	// 	contentShownLast = $page.query.get('show');
	// 	changePageAddress($page.query.get('show') as 'box' | 'pbp' | 'charts');
	// }

	onMount(() => {
		$contentShown = $page.query.get('show') || 'box';
		getAllGameDataRequest = getAllGameData($page.query.get('id'));
	});

	async function getAllGameData(
		newGameId: string
	): Promise<ApiResponse<BoxscoreSchema> | Result<Date> | ApiResponse<AtBatDetails[]>> {
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
		date_str = `${game_date.getMonth() + 1}/${game_date.getDate()}/${game_date.getFullYear()}`;
		game_summary = `${boxscore.away_team.team_id} vs ${boxscore.home_team.team_id} (${date_str})`;

		const getAllPBPResult = await getAllPlayByPlayData(game_id);
		success = getAllPBPResult.success;
		if (!success) {
			return getAllPBPResult;
		}
		all_pbp = getAllPBPResult.value;
		return getAllPBPResult;
	}

	function viewAtBat(atBatId: string): void {
		atBatViewer.viewAtBat(atBatId);
		$contentShown = 'pbp';
		changePageAddress('pbp');
	}

	function updateGameData(newGameId: string): void {
		if ($page.query.get('show') !== 'box') {
			$contentShown = 'box';
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

<GameContentSelector on:showGameContent={(event) => changePageAddress(event.detail)} />
{#if getAllGameDataRequest}
	{#await getAllGameDataRequest}
		<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
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
