<script lang="ts">
	import type { TeamData } from '$lib/api/types';

	export let away_team: TeamData;
	export let home_team: TeamData;

</script>

<div class="game-summary">
	<div class="matchup">
		<span class="team-name">{away_team.team_name}</span>
		<span class="team-runs-scored font-bold">{away_team.runs_scored_by_team}</span>
		<span class="team-record">({away_team.total_wins}-{away_team.total_losses})</span>
	</div>
	<div class="matchup">
		<span class="team-name text">{home_team.team_name}</span>
		<span class="team-runs-scored font-bold">{home_team.runs_scored_by_team}</span>
		<span class="team-record">({home_team.total_wins}-{home_team.total_losses})</span>
	</div>
</div>

<style lang="postcss">
	.game-summary {
		@apply flex flex-row flex-nowrap justify-center items-center mb-5;
	}

	.matchup {
		@apply flex flex-col flex-nowrap justify-start items-center my-0 mx-3;
	}

	.team-name {
		@apply text-base;
	}

	.team-runs-scored {
		@apply text-lg;
	}

	.team-record {
		@apply text-sm;
	}

	@media screen and (min-width: 550px) {
		.team-name {
			@apply text-lg;
		}

		.team-runs-scored {
			@apply text-xl;
		}

		.team-record {
			@apply text-base;
		}
	}

	@media screen and (min-width: 768px) {
		.team-name {
			@apply text-xl;
		}

		.team-runs-scored {
			@apply text-2xl;
		}

		.team-record {
			@apply text-lg;
		}
	}

</style>
