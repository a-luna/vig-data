<script lang="ts">
	import type { TeamData } from '$lib/api/types';

	export let away_team: TeamData;
	export let home_team: TeamData;
</script>

<div class="game-summary">
	<div class="matchup">
		<span class="text-lg">{away_team.team_name}</span>
		<span class="text-2xl font-bold">{away_team.runs_scored_by_team}</span>
		<span>({away_team.total_wins}-{away_team.total_losses})</span>
	</div>
	<div class="matchup">
		<span class="text-lg">{home_team.team_name}</span>
		<span class="text-2xl font-bold">{home_team.runs_scored_by_team}</span>
		<span>({home_team.total_wins}-{home_team.total_losses})</span>
	</div>
</div>

<style lang="postcss">
	.game-summary {
		@apply flex flex-row flex-nowrap justify-center items-center mb-5;
	}

	.matchup {
		@apply flex flex-col flex-nowrap justify-start items-center my-0 mx-3;
	}
</style>
