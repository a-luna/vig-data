<script lang="ts">
	import type { Boxscore } from '$lib/api/types';
	import AtBatResultsModal from '$lib/components/Boxscore/AtBatResultsModal/AtBatResultsModal.svelte';
	import GameMetaInfo from '$lib/components/Boxscore/GameMetaInfo.svelte';
	import GameSummary from '$lib/components/Boxscore/GameSummary.svelte';
	import PitcherInningTotalsModal from '$lib/components/Boxscore/PitcherInningTotalsModal.svelte';
	import TeamBattingStats from '$lib/components/Boxscore/TeamBattingStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/Boxscore/TeamPitchingStats/TeamPitchingStats.svelte';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';

	export let shown: boolean;
	export let boxscore: Boxscore;
	let atBatResultsModal: AtBatResultsModal;
	let pitcherInningTotalsModal: PitcherInningTotalsModal;
	const { linescore, linescore_complete, extra_innings } = boxscore;
	const { game_meta } = boxscore;
</script>

<AtBatResultsModal bind:this={atBatResultsModal} {boxscore} on:viewPitchFxForAtBatClicked />
<PitcherInningTotalsModal bind:this={pitcherInningTotalsModal} {boxscore} />

<div class:not-shown={!shown} class="boxscore">
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

<style lang="postcss">
	.boxscore {
		@apply flex flex-col flex-nowrap justify-start overflow-hidden;
	}

	.not-shown {
		display: none;
	}
</style>
