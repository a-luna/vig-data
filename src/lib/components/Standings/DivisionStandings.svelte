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

<tr class="division-name col-header">
	<td colspan="5">{league.toUpperCase()} {div_name}</td>
</tr>
<tr class="col-headers">
	<td class="team-id">&nbsp;</td>
	<td class="num">W</td>
	<td class="num">L</td>
	<td class="num">RS</td>
	<td class="num">RA</td>
</tr>
{#each teamStandings as team}
	<tr>
		<td><a sveltekit:prefetch href={`/team/${team.team_id_br}/${team.year}`}>{team.team_id_br}</a></td>
		<td>{team.wins}</td>
		<td>{team.losses}</td>
		<td>{team.runs}</td>
		<td>{team.runs_against}</td>
	</tr>
{/each}

<style lang="postcss">
	.division-name,
	.col-headers {
		text-align: center;
	}

	td.team-id {
		width: 45px;
	}

	td.num {
		width: 30px;
	}
</style>
