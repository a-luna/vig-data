<script lang="ts">
	import { getAllPlayByPlayData, getBoxscore } from '$lib/api/game';
	import type { ApiResponse, AtBatDetails, Boxscore as BoxscoreSchema, Result } from '$lib/api/types';
	import Boxscore from '$lib/components/Game/Boxscore/Boxscore.svelte';
	import PlayByPlay from '$lib/components/Game/PlayByPlay/PlayByPlay.svelte';
	import PitchAppViewer from '$lib/components/PitchAppViewer/PitchAppViewer.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';
	import GameContentSelector from '$lib/components/Util/Selectors/GameContentSelector.svelte';
	import { BBREF_GAME_ID_REGEX } from '$lib/regex';
	import { gameContentShown } from '$lib/stores/singleValueStores';
	import type { GameContent } from '$lib/types';
	import { getDateFromGameId } from '$lib/util/datetime';
	import { getQueryStringParameter } from '$lib/util/ui';
	import { onMount, tick } from 'svelte';

	let game_id: string;
	let game_summary: string;
	let boxscore: BoxscoreSchema;
	let all_pbp: AtBatDetails[];
	let date_str: string;
	let getBoxscoreResult: ApiResponse<BoxscoreSchema>;
	let getGameDateResult: Result<Date>;
	let getAllPBPResult: ApiResponse<AtBatDetails[]>;
	let playByPlayComponent: PlayByPlay;
	let errorModal: ErrorMessageModal;
	let loading = false;

	$: if (game_id !== undefined && game_id !== getQueryStringParameter('id')) {
		updateGameData(getQueryStringParameter('id'));
	}

	onMount(() => {
		$gameContentShown = (getQueryStringParameter('show') as GameContent) || 'box';
		getAllGameData(getQueryStringParameter('id'));
	});

	async function getAllGameData(newGameId: string) {
		loading = true;
		getBoxscoreResult = await getBoxscore(newGameId);
		if (!getBoxscoreResult.success) {
			errorModal.toggleModal(getBoxscoreResult.message);
			loading = false;
			return;
		}
		game_id = newGameId;
		boxscore = getBoxscoreResult.value;

		getGameDateResult = getDateFromGameId(game_id);
		if (!getGameDateResult.success) {
			errorModal.toggleModal(getGameDateResult.message);
			loading = false;
			return;
		}
		const game_date = getGameDateResult.value;
		date_str = `${game_date.getMonth() + 1}/${game_date.getDate()}/${game_date.getFullYear()}`;
		game_summary = `${boxscore.away_team.team_id} vs ${boxscore.home_team.team_id} (${date_str})`;

		getAllPBPResult = await getAllPlayByPlayData(game_id);
		if (!getAllPBPResult.success) {
			errorModal.toggleModal(getAllPBPResult.message);
			loading = false;
			return;
		}
		all_pbp = getAllPBPResult.value;
		loading = false;
	}

	async function viewAtBat(atBatId: string) {
		$gameContentShown = 'pbp';
		await tick();
		playByPlayComponent.viewAtBat(atBatId);
		changePageAddress('pbp');
	}

	function updateGameData(newGameId: string): void {
		if (getQueryStringParameter('show') !== 'box') {
			$gameContentShown = 'box';
			changePageAddress('box');
		}
		getAllGameData(newGameId);
	}

	function changePageAddress(gameContent: 'pbp' | 'box' | 'charts') {
		window.history.pushState(
			{ game_id: game_id },
			`${game_summary ? game_summary : getDefaultGameSummary()} | Vigorish`,
			`game?id=${game_id}&show=${gameContent}`
		);
	}

	function getDefaultGameSummary(): string {
		const match = BBREF_GAME_ID_REGEX.exec(game_id);
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

<LoadingScreen {loading} />

<ErrorMessageModal bind:this={errorModal} />

{#if !loading}
	<div id="game">
		<GameContentSelector color={'secondary'} on:changed={(event) => changePageAddress(event.detail)} />
		{#if $gameContentShown === 'box'}
			<Boxscore {boxscore} on:viewPitchFxForAtBat={(event) => viewAtBat(event.detail)} />
		{:else if $gameContentShown === 'pbp'}
			<PlayByPlay bind:this={playByPlayComponent} {boxscore} {all_pbp} />
		{:else if $gameContentShown === 'charts'}
			<PitchAppViewer {boxscore} />
		{/if}
	</div>
{/if}
