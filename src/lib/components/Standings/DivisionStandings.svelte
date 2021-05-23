<script lang="ts">
	import type { TeamSeasonData } from '$lib/api/types';

	export let division: 'e' | 'c' | 'w';
	export let teamStandings: TeamSeasonData[];
	let leagueName: string = '';
	let divName: string = '';

	function getDivisionName(div: string): string {
		const divisionNameMap = {
			w: 'West',
			c: 'Central',
			e: 'East'
		};
		return divisionNameMap[div];
	}

	$: if (teamStandings) leagueName = teamStandings[0].league;
	$: if (division) divName = getDivisionName(division);

</script>

<div class="responsive m-2">
	<div id={`${leagueName} ${divName}`} class="league-standings resp-table">
		<div class="resp-table-caption">{`${leagueName} ${divName}`}</div>
		<div class="resp-table-header col-header">
			<div class="team-id table-header-cell">&nbsp;</div>
			<div class="num table-header-cell">W</div>
			<div class="num table-header-cell">L</div>
			<div class="num table-header-cell">RS</div>
			<div class="num table-header-cell">RA</div>
		</div>
		<div class="resp-table-body">
			{#each teamStandings as team}
				<div class="at-bat resp-table-row">
					<div class="table-body-cell num-stat">
						<a sveltekit:prefetch href={`/team/${team.team_id_br}/${team.year}`}
							>{team.team_id_br}</a
						>
					</div>
					<div class="table-body-cell num-stat">{team.wins}</div>
					<div class="table-body-cell num-stat">{team.losses}</div>
					<div class="table-body-cell num-stat">{team.runs}</div>
					<div class="table-body-cell num-stat">{team.runs_against}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.league-standings {
		margin: 0 0 10px 0;
	}

</style>
