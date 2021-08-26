<script lang="ts">
	import type { GameData, PlayerPitchStats } from '$lib/api/types';
	import GameResult from '$lib/components/HomePage/ScoreboardForDate/GameResult.svelte';

	export let games_for_date: GameData[];
	export let pitchStats: PlayerPitchStats[];
</script>

<div id="scoreboard" class="flex flex-col items-center justify-start flex-nowrap">
	<div class="grid grid-cols-2 gap-1.5 mb-5 text-xs sm:gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:text-sm">
		{#each games_for_date as game_data}
			<GameResult {...game_data} {pitchStats} />
		{/each}
	</div>
</div>
