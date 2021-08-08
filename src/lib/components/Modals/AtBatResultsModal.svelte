<script lang="ts">
	import type { AtBatSummary, BatStats, Boxscore } from '$lib/api/types';
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import InningLabel from '$lib/components/Util/InningLabel.svelte';
	import { scrollToTop } from '$lib/util';
	import { createEventDispatcher } from 'svelte';

	export let boxscore: Boxscore;
	let playerTeamMap: Record<number, string>;
	let playerBatStatsMap: Record<number, BatStats>;
	let modalContainer: ModalContainer;
	const dispatch = createEventDispatcher();

	$: if (boxscore) {
		createPlayerTeamMap();
		createPlayerBatStatsMap();
	}

	function createPlayerTeamMap() {
		playerTeamMap = {};
		boxscore.away_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.home_team.team_id));
		boxscore.away_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.home_team.team_id));
	}

	function createPlayerBatStatsMap() {
		playerBatStatsMap = {};
		boxscore.away_team.batting.map((batStats) => (playerBatStatsMap[batStats.mlb_id] = batStats));
		boxscore.home_team.batting.map((batStats) => (playerBatStatsMap[batStats.mlb_id] = batStats));
	}

	let batterTeamId: string;
	let batterName: string;
	let statLine: string;
	let atBatResults: AtBatSummary[] = [];

	export function viewAtBatResultsForPlayer(batterMlbId: number) {
		batterTeamId = playerTeamMap[batterMlbId];
		batterName = playerBatStatsMap[batterMlbId].name;
		statLine = playerBatStatsMap[batterMlbId].stat_line;
		atBatResults = playerBatStatsMap[batterMlbId].at_bat_results;
		modalContainer.toggleModal();
		scrollToTop();
	}

	function formatAtBatResult(atBatResult: string): string[] {
		const split = atBatResult.split(';');
		return split.length > 1 ? split : [atBatResult];
	}

	function viewPitchFxforAtBat(at_bat_id: string) {
		dispatch('viewPitchFxForAtBatClicked', at_bat_id);
		modalContainer.toggleModal();
	}
</script>

<ModalContainer bind:this={modalContainer}>
	<div slot="heading" class="modal-heading-flex">
		<span class="text-base font-bold">{batterName} ({batterTeamId})</span>
		<span class="text-base font-normal ml-2">{statLine}</span>
	</div>

	<div slot="content" class="responsive">
		<div class="resp-table w-full text-sm">
			<div class="resp-table-header col-header">
				<div class="table-header-cell">Inn</div>
				<div class="num table-header-cell">Outs</div>
				<div class="table-header-cell">RoB</div>
				<div class="table-header-cell">Play Description</div>
				<div class="table-header-cell">Pitcher</div>
				<div class="table-header-cell">Pit Seq</div>
			</div>
			<div class="resp-table-body">
				{#each atBatResults as at_bat}
					<div class="resp-table-row">
						<div class="table-body-cell text-center"><InningLabel inning={at_bat.inning} /></div>
						<div class="table-body-cell text-center">{at_bat.outs}</div>
						<div class="table-body-cell text-center">{at_bat.runners_on_base}</div>
						<div class="table-body-cell">
							<FlexStrings stringArray={formatAtBatResult(at_bat.play_description)} />
						</div>
						<div class="table-body-cell">{at_bat.pitcher_name}</div>
						<div class="table-body-cell">
							<a
								href="#"
								class="at-bat-link"
								title="View PitchFX Data for At Bat"
								on:click={() => viewPitchFxforAtBat(at_bat.at_bat_id)}>{at_bat.pitch_sequence}</a
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</ModalContainer>

<style lang="postcss">
	.modal-heading-flex {
		@apply flex flex-row justify-start;
	}

	.table-body-cell {
		vertical-align: middle;
	}

	.at-bat-link {
		color: var(--pri-color);
		text-decoration: underline;
	}
</style>
