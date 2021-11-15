<script lang="ts">
	import type { Boxscore, InningTotalsMap, PitchStats, TeamData } from '$lib/api/types';
	import ModalContainer from '$lib/components/Util/ModalContainer.svelte';
	import { createEventDispatcher } from 'svelte';

	export let boxscore: Boxscore;
	let awayTeamData: TeamData;
	let homeTeamData: TeamData;
	let playerTeamMap: Record<number, string>;
	let playerPitchStatsMap: Record<number, PitchStats>;
	let modalContainer: ModalContainer;
	const dispatch = createEventDispatcher();

	$: if (boxscore) {
		awayTeamData = boxscore.away_team;
		homeTeamData = boxscore.home_team;
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

	<div slot="content" class="responsive">
		<div class="resp-table w-full text-sm">
			<div class="resp-table-header col-header">
				<div class="table-header-cell">Inn</div>
				<div class="num table-header-cell">Out</div>
				<div class="num table-header-cell">H</div>
				<div class="num table-header-cell">R</div>
				<div class="num table-header-cell">BB</div>
				<div class="num table-header-cell">SO</div>
				<div class="num table-header-cell">BF</div>
				<div class="num table-header-cell">Pit</div>
				<div class="num table-header-cell">Str</div>
			</div>
			<div class="resp-table-body">
				{#each Object.keys(inningTotalsMap) as inning}
					<div class="resp-table-row">
						<div class="table-body-cell text-center">{inning}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].outs}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].hits}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].runs}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].bb}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].so}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].bf}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].pitch_count}</div>
						<div class="table-body-cell num">{inningTotalsMap[inning].strikes}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</ModalContainer>

<style lang="postcss">
	.modal-heading-flex {
		@apply flex flex-col justify-start flex-grow;
	}

	.table-body-cell {
		vertical-align: middle;
	}
</style>
