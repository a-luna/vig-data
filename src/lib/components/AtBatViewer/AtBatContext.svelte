<script lang="ts">
	import type { AtBatDetails } from '$lib/api/types';
	import { INNING_ID_REGEX } from '$lib/regex';

	export let at_bat: AtBatDetails;

	function getInning(inning_id: string): string {
		if (inning_id.length > 0) {
			const match = INNING_ID_REGEX.exec(inning_id);
			if (match) {
				const inning_helf = match.groups.inning_half == 'TOP' ? 'Top' : 'Bot';
				const inning_number = match.groups.inning_number;
				return `${inning_helf} ${parseInt(inning_number)}`;
			}
		}
	}
</script>

{#if at_bat !== undefined}
	<div class="at-bat-details-top">
		<div class="at-bat-matchup">
			<span>
				<strong>At Bat: </strong>
				<a class="player-name" sveltekit:prefetch href="/player/{at_bat.batter_id_mlb}"
					>{at_bat.batter_name}</a
				>
			</span>
			<span>
				<strong>Pitching: </strong>
				<a class="player-name" sveltekit:prefetch href="/player/{at_bat.pitcher_id_mlb}"
					>{at_bat.pitcher_name}</a
				>
			</span>
		</div>
		<div class="at-bat-context">
			<span><strong>Inning: </strong>{getInning(at_bat.inning_id)}</span>
			<span><strong>Score: </strong>{at_bat.score}</span>
			<span><strong>Outs: </strong>{at_bat.outs_before_play}</span>
			<span><strong>ROB: </strong>{at_bat.runners_on_base}</span>
		</div>
	</div>
{/if}

<style lang="postcss">
	.at-bat-details-top {
		font-size: 0.9rem;
		flex: 0;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;

		background-color: var(--table-col-header-bg-color);
		border: 1px solid var(--table-col-header-bottom-border);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	.at-bat-matchup,
	.at-bat-context {
		flex: 1 0;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;

		padding: 3px 5px;
	}

	.at-bat-matchup > span,
	.at-bat-context > span {
		margin: 0 10px 0 0;
	}

	.at-bat-matchup > span:last-child,
	.at-bat-context > span:last-child {
		margin: 0;
	}
</style>
