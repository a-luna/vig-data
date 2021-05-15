<script lang="ts">
	import type { TeamSeasonData } from '$lib/api/types';

	export let league: string;
	export let division: string;
	export let teamStandings: TeamSeasonData[];
	let div_name: string = '';

	function getDivisionName(div: string): string {
		const divisionNameMap = {
			w: 'West',
			c: 'Central',
			e: 'East'
		};
		return divisionNameMap[div];
	}

	$: if (division) div_name = getDivisionName(division);
</script>

<h5>{league.toUpperCase()} {div_name}</h5>
<table class="league-standings">
	<thead>
		<tr class="col-headers">
			<th class="team-id">&nbsp;</th>
			<th class="num">W</th>
			<th class="num">L</th>
			<th class="num">RS</th>
			<th class="num">RA</th>
		</tr>
	</thead>
	<tbody>
		{#each teamStandings as team}
			<tr>
				<td
					><a sveltekit:prefetch href={`/team/${team.team_id_br}/${team.year}`}>{team.team_id_br}</a
					></td
				>
				<td>{team.wins}</td>
				<td>{team.losses}</td>
				<td>{team.runs}</td>
				<td>{team.runs_against}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="postcss">
	h5 {
		margin: 10px 0 0 0;
	}

	.league-standings {
		margin: 0 0 10px 0;
	}

	.col-headers {
		text-align: center;
	}

	th.team-id {
		width: 45px;
	}

	th.num {
		width: 34px;
	}
</style>
