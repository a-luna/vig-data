<script lang="ts">
	import DivisionStandings from './DivisionStandings.svelte';
	import type { LeagueSeasonData } from '$lib/api/types';

	export let league: string;
	export let leagueData: LeagueSeasonData;

	$: leagueName = !league ? '' : league == 'al' ? 'American League' : 'National League';
</script>

<div class="league-standings">
	<table>
		<thead>
			<tr class="league-name col-header">
				<th colspan="5">{leagueName}</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(leagueData) as [division, teamStandings]}
				<DivisionStandings {league} {division} {teamStandings} />
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	.league-standings {
		margin: 0 10px;
	}

	.league-name {
		text-align: center;
	}
</style>
