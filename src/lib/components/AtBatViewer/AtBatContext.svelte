<script lang="ts">
	import type { AtBatDetails } from '$lib/api/types';
	import { INNING_ID_REGEX } from '$lib/regex';

	export let selectedAtBat: AtBatDetails;

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

{#if selectedAtBat !== undefined}
	<div class="at-bat-details-top">
		<div class="at-bat-matchup">
			<span class="flex flex-row flex-nowrap">
				<strong>At Bat: </strong>
				<a class="player-name ml-1" sveltekit:prefetch href="/player/{selectedAtBat.batter_id_mlb}">
					{selectedAtBat.batter_name}
				</a>
				<span class="batter-stance ml-1">({selectedAtBat.batter_stance})</span>
			</span>
			<span class="flex flex-row flex-nowrap">
				<strong>Pitching: </strong>
				<a
					class="player-name ml-1"
					sveltekit:prefetch
					href="/player/{selectedAtBat.pitcher_id_mlb}"
				>
					{selectedAtBat.pitcher_name}
				</a>
				<span class="pitcher-throws ml-1">({selectedAtBat.pitcher_throws})</span>
			</span>
		</div>
		<div class="at-bat-context">
			<span class="flex flex-row flex-nowrap">
				<strong>Inning: </strong>
				<span class="ml-1">{getInning(selectedAtBat.inning_id)}</span>
			</span>
			<span class="flex flex-row flex-nowrap">
				<strong>Score: </strong>
				<span class="ml-1">{selectedAtBat.score}</span>
			</span>
			<span class="flex flex-row flex-nowrap">
				<strong>Outs: </strong>
				<span class="ml-1">{selectedAtBat.outs_before_play}</span>
			</span>
			<span class="flex flex-row flex-nowrap">
				<strong>ROB: </strong>
				<span class="ml-1">{selectedAtBat.runners_on_base}</span>
			</span>
		</div>
	</div>
{/if}

<style lang="postcss">
	.at-bat-details-top {
		flex: 0;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;

		background-color: var(--table-col-header-bg-color);

		border-left: none;
		border-right: none;
		border-top: none;
		border-bottom: 1px solid var(--table-col-header-bottom-border);
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
		line-height: 1.2;
	}

	.at-bat-matchup > span,
	.at-bat-context > span {
		white-space: nowrap;
		margin: 0 10px 0 0;
	}

	.at-bat-matchup > span:last-child,
	.at-bat-context > span:last-child {
		margin: 0;
	}

</style>
