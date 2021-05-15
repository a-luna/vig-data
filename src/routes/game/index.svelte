<script lang="ts">
	import { contentShown } from '$lib/stores';
	import type { Boxscore as BoxscoreSchema } from '$lib/api/types';
	import AtBatViewer from '$lib/components/AtBatViewer/AtBatViewer.svelte';
	import Boxscore from '$lib/components/Boxscore/Boxscore.svelte';
	import GameContentSelector from '$lib/components/ButtonGroups/GameContentSelector.svelte';

	let game_summary: string;
	let boxscore: BoxscoreSchema;
	let game_id: string;
	let atBatViewer: AtBatViewer;

	$: pbpShown = $contentShown === 'pbp';
	$: boxShown = $contentShown === 'box';
	// $: chartsShown = $contentShown === 'charts';

	function changePageAddress(gameContent: 'pbp' | 'box' | 'charts') {
		window.history.pushState(
			{ game_id: game_id },
			`${game_summary} | Vigorish`,
			`game?id=${game_id}&show=${gameContent}`
		);
	}

	function viewAtBat(atBatId) {
		atBatViewer.viewAtBat(atBatId);
		$contentShown = 'pbp';
		changePageAddress('pbp');
	}
</script>

<svelte:head>
	<title>{game_summary} | Vigorish</title>
</svelte:head>

<GameContentSelector on:showGameContent={(event) => changePageAddress(event.detail)} />

<Boxscore
	bind:game_summary
	bind:boxscore
	bind:game_id
	bind:shown={boxShown}
	on:viewPitchFxForAtBatClicked={(event) => viewAtBat(event.detail)}
	on:allPlayByPlayDataFetched={(event) => atBatViewer.prepData(event.detail)}
/>
<AtBatViewer {boxscore} bind:this={atBatViewer} bind:shown={pbpShown} />
