<script lang="ts">
	import type { GameData, PlayerPitchStats } from '$lib/api/types';
	import GameResult from '$lib/components/HomePage/ScoreboardForDate/GameResult.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { format } from 'date-fns';

	export let games_for_date: GameData[];
	export let pitchStats: PlayerPitchStats[];
	let formatted: string = '';

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMMM do, yyyy');
</script>

<div id="scoreboard" class="flex flex-col items-center justify-start flex-nowrap">
	<h3 class="my-2 text-xl text-center sm:text-2xl">Games Played on {formatted}</h3>
	<div class="flex flex-row flex-wrap justify-start flex-grow-0 m-0 text-xs sm:text-sm scoreboard">
		{#each games_for_date as game_data}
			<GameResult {...game_data} {pitchStats} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.scoreboard {
		max-width: 490px;
	}
</style>
