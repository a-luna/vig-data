<script lang="ts">
	import type { Boxscore } from '$lib/api/types';
	import GameSummary from '$lib/components/Boxscore/GameSummary.svelte';
	import Linescore from '$lib/components/Linescore/Linescore.svelte';
	import TeamBattingStats from '$lib/components/Boxscore/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/Boxscore/TeamPitchingStats.svelte';
	import AtBatResultsModal from '$lib/components/Modals/AtBatResultsModal.svelte';
	import PitcherInningTotalsModal from '$lib/components/Modals/PitcherInningTotalsModal.svelte';
	import GameMetaInfo from './GameMetaInfo.svelte';

	export let shown: boolean;
	export let boxscore: Boxscore;
	let atBatResultsModal: AtBatResultsModal;
	let pitcherInningTotalsModal: PitcherInningTotalsModal;

</script>

<AtBatResultsModal bind:this={atBatResultsModal} {boxscore} on:viewPitchFxForAtBatClicked />
<PitcherInningTotalsModal bind:this={pitcherInningTotalsModal} {boxscore} />

<div class:not-shown={!shown} class="boxscore">
	<GameSummary away_team={boxscore.away_team} home_team={boxscore.home_team} />
	<Linescore {...boxscore} expanded={true} />
	<div class="mx-auto my-0 w-min flex flex-col flex-nowrap justify-start">
		<TeamBattingStats
			teamData={boxscore.away_team}
			on:viewAtBatResultsClicked={(event) =>
				atBatResultsModal.viewAtBatResultsForPlayer(event.detail)}
		/>
		<TeamBattingStats
			teamData={boxscore.home_team}
			on:viewAtBatResultsClicked={(event) =>
				atBatResultsModal.viewAtBatResultsForPlayer(event.detail)}
		/>
		<TeamPitchingStats
			teamData={boxscore.away_team}
			on:viewPitcherInningTotalsClicked={(event) =>
				pitcherInningTotalsModal.viewInningTotalsForPitcher(event.detail)}
		/>
		<TeamPitchingStats
			teamData={boxscore.home_team}
			on:viewPitcherInningTotalsClicked={(event) =>
				pitcherInningTotalsModal.viewInningTotalsForPitcher(event.detail)}
		/>
		<GameMetaInfo {...boxscore.game_meta} />
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
