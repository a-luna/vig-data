<script lang="ts">
	import type { LeagueSeasonData, TeamSeasonData } from '$lib/api/types';
	import type { League } from '$lib/types';

	export let league: League;
	export let leagueStandings: LeagueSeasonData;
	const allDivisions: string[] = ['e', 'c', 'w'];
	let tableId: string = '';

	function getTeamsInDivision(div: string): TeamSeasonData[] {
		return div === 'e' ? leagueStandings.e : div === 'c' ? leagueStandings.c : div === 'w' ? leagueStandings.w : [];
	}

	function getDivisionAbbrev(div: string): string {
		return `${league.toUpperCase()}${div.toUpperCase()}`;
	}

	$: if (leagueStandings) tableId = `standings-${league}`;
</script>

<div class="responsive">
	<div id={tableId} class="resp-table">
		{#each allDivisions as div}
			<div class="text-center resp-table-header">
				<div class="team-id table-header-cell">{getDivisionAbbrev(div)}</div>
				<div class="num table-header-cell">W</div>
				<div class="num table-header-cell">L</div>
				<div class="num table-header-cell">RS</div>
				<div class="num table-header-cell">RA</div>
			</div>
			<div class="resp-table-body">
				{#each getTeamsInDivision(div) as team}
					<div class="at-bat resp-table-row">
						<div class="table-body-cell">
							<a sveltekit:prefetch href={`/team/${team.team_id_br}/${team.year}`}>{team.team_id_br}</a>
						</div>
						<div class="table-body-cell num-stat">{team.wins}</div>
						<div class="table-body-cell num-stat">{team.losses}</div>
						<div class="table-body-cell num-stat">{team.runs}</div>
						<div class="table-body-cell num-stat">{team.runs_against}</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.resp-table-row:last-child .table-body-cell:first-child,
	.resp-table-row:last-child .table-body-cell:first-child {
		border-bottom-left-radius: 0;
	}

	.resp-table-row:last-child .table-body-cell:last-child,
	.resp-table-row:last-child .table-body-cell:last-child {
		border-bottom-right-radius: 0;
	}

	.resp-table-body:last-of-type .resp-table-row:last-child .table-body-cell:first-child,
	.resp-table-body:last-of-type .resp-table-row:last-child .table-body-cell:first-child {
		border-bottom-left-radius: 4px;
	}

	.resp-table-body:last-of-type .resp-table-row:last-child .table-body-cell:last-child,
	.resp-table-body:last-of-type .resp-table-row:last-child .table-body-cell:last-child {
		border-bottom-right-radius: 4px;
	}
</style>
