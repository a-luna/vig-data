<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AtBatSummary, BatStats, Boxscore } from '$lib/api/types';
	import InningLabel from '$lib/components/Util/InningLabel.svelte';
	import FlexStrings from '$lib/components/Util/FlexStrings.svelte';
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';
	import { scrollToTop } from '$lib/util';

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
		boxscore.away_team.batting.map(
			(batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.away_team.team_id)
		);
		boxscore.home_team.batting.map(
			(batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.home_team.team_id)
		);
		boxscore.away_team.pitching.map(
			(pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.away_team.team_id)
		);
		boxscore.home_team.pitching.map(
			(pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.home_team.team_id)
		);
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

	<div slot="content" class="table-wrapper">
		<table>
			<thead>
				<tr class="col-header">
					<th>Inn</th>
					<th>Outs</th>
					<th>RoB</th>
					<th>Play Description</th>
					<th>Pitcher</th>
					<th>Pit Seq</th>
				</tr>
			</thead>
			<tbody>
				{#each atBatResults as at_bat}
					<tr>
						<td class="text-center">
							<InningLabel inning={at_bat.inning} />
						</td>
						<td class="text-center">{at_bat.outs}</td>
						<td class="text-center">{at_bat.runners_on_base}</td>
						<td>
							<FlexStrings stringArray={formatAtBatResult(at_bat.play_description)} />
						</td>
						<td>{at_bat.pitcher_name}</td>
						<td
							><span
								class="at-bat-link text-indigo-600 cursor-pointer"
								title="View PitchFX Data for At Bat"
								on:click={() => viewPitchFxforAtBat(at_bat.at_bat_id)}>{at_bat.pitch_sequence}</span
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</ModalContainer>

<style lang="postcss">
	.modal-heading-flex {
		@apply flex flex-row justify-start;
	}

	td {
		vertical-align: middle;
	}

	.at-bat-link {
		text-decoration: underline;
	}
</style>
