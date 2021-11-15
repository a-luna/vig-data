<script lang="ts">
	import type { Boxscore, GameMeta, Linescore as LinescoreSchema } from '$lib/api/types';
	import AtBatResultsModal from '$lib/components/Game/Boxscore/AtBatResultsModal/AtBatResultsModal.svelte';
	import GameMetaInfo from '$lib/components/Game/Boxscore/GameMetaInfo.svelte';
	import GameSummary from '$lib/components/Game/Boxscore/GameSummary.svelte';
	import PitcherInningTotalsModal from '$lib/components/Game/Boxscore/PitcherInningTotalsModal.svelte';
	import TeamBattingStats from '$lib/components/Game/Boxscore/TeamBattingStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/Game/Boxscore/TeamPitchingStats/TeamPitchingStats.svelte';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';

	export let boxscore: Boxscore;
	let atBatResultsModal: AtBatResultsModal;
	let pitcherInningTotalsModal: PitcherInningTotalsModal;
	let linescore: LinescoreSchema;
	let linescore_complete: LinescoreSchema;
	let extra_innings: boolean;
	let game_meta: GameMeta;

	$: if (boxscore) {
		({ linescore, linescore_complete, extra_innings, game_meta } = boxscore);
	}
</script>

<AtBatResultsModal bind:this={atBatResultsModal} {boxscore} on:viewPitchFxForAtBat />
<PitcherInningTotalsModal bind:this={pitcherInningTotalsModal} {boxscore} />

{#if boxscore}
	<div class="boxscore">
		<div id="game-summary">
			<GameSummary away_team={boxscore.away_team} home_team={boxscore.home_team} />
			<Linescore {linescore} {linescore_complete} {extra_innings} expanded={true} />
		</div>
		<div id="team-stat-tables" class="mx-auto">
			<TeamBattingStats
				teamData={boxscore.away_team}
				on:viewAtBatResultsClicked={(e) => atBatResultsModal.viewAtBatResultsForPlayer(e.detail)}
			/>
			<TeamBattingStats
				teamData={boxscore.home_team}
				on:viewAtBatResultsClicked={(e) => atBatResultsModal.viewAtBatResultsForPlayer(e.detail)}
			/>
			<TeamPitchingStats
				teamData={boxscore.away_team}
				on:viewPitcherInningTotalsClicked={(e) => pitcherInningTotalsModal.viewInningTotalsForPitcher(e.detail)}
			/>
			<TeamPitchingStats
				teamData={boxscore.home_team}
				on:viewPitcherInningTotalsClicked={(e) => pitcherInningTotalsModal.viewInningTotalsForPitcher(e.detail)}
			/>
			<GameMetaInfo {...game_meta} />
		</div>
	</div>
{/if}

<style lang="postcss">
	.boxscore {
		@apply flex flex-col flex-nowrap justify-start overflow-hidden;
	}
</style>
