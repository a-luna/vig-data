<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { InningTotalsMap, Boxscore, TeamData, PitchStats } from '$lib/api/types';
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';

	export let boxscore: Boxscore;
	let awayTeamData: TeamData;
	let homeTeamData: TeamData;
	let awayTeamId: string;
	let homeTeamId: string;
	let playerTeamMap: Record<number, string>;
	let playerPitchStatsMap: Record<number, PitchStats>;
	let modalContainer: ModalContainer;
	const dispatch = createEventDispatcher();

	$: if (boxscore) {
		awayTeamData = boxscore.away_team;
		homeTeamData = boxscore.home_team;
		awayTeamId = boxscore.away_team.team_id;
		homeTeamId = boxscore.home_team.team_id;
		createPlayerPitchStatsMap();
		createPlayerTeamMap();
	}

	function createPlayerPitchStatsMap() {
		playerPitchStatsMap = {};
		awayTeamData.pitching.map((pitchStats) => (playerPitchStatsMap[pitchStats.mlb_id] = pitchStats));
		homeTeamData.pitching.map((pitchStats) => (playerPitchStatsMap[pitchStats.mlb_id] = pitchStats));
	}

	function createPlayerTeamMap() {
		playerTeamMap = {};
		boxscore.away_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.home_team.team_id));
		boxscore.away_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.home_team.team_id));
	}

	let pitcherTeamId: string;
	let pitcherName: string;
	let statLine: string;
	let inningTotalsMap: InningTotalsMap = {};

	export function viewInningTotalsForPitcher(batterMlbId: number) {
		pitcherTeamId = playerTeamMap[batterMlbId];
		pitcherName = playerPitchStatsMap[batterMlbId].name;
		statLine = playerPitchStatsMap[batterMlbId].stat_line;
		inningTotalsMap = playerPitchStatsMap[batterMlbId].inning_totals;
		modalContainer.toggleModal();
	}

	function viewPitchFxforPitcher(mlb_id: number) {
		dispatch('viewPitchFxforPitcherClicked', mlb_id);
		modalContainer.toggleModal();
	}
</script>

<ModalContainer bind:this={modalContainer}>
	<div slot="heading" class="modal-heading-flex">
		<span class="text-base font-bold">{pitcherName} ({pitcherTeamId})</span>
		<span class="text-base font-normal">{statLine}</span>
	</div>

	<table slot="content">
		<thead>
			<tr class="col-header">
				<th>Inn</th>
				<th>Out</th>
				<th>H</th>
				<th>R</th>
				<th>BB</th>
				<th>SO</th>
				<th>BF</th>
				<th>Pit</th>
				<th>Str</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.keys(inningTotalsMap) as inning}
				<tr class="text-right">
					<td>{inning}</td>
					<td>{inningTotalsMap[inning].outs}</td>
					<td>{inningTotalsMap[inning].hits}</td>
					<td>{inningTotalsMap[inning].runs}</td>
					<td>{inningTotalsMap[inning].bb}</td>
					<td>{inningTotalsMap[inning].so}</td>
					<td>{inningTotalsMap[inning].bf}</td>
					<td>{inningTotalsMap[inning].pitch_count}</td>
					<td>{inningTotalsMap[inning].strikes}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</ModalContainer>

<style lang="postcss">
	.modal-heading-flex {
		@apply flex flex-col justify-start flex-grow;
	}

	td {
		vertical-align: middle;
	}
</style>
