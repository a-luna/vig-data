<script lang="ts">
	import type { LeagueSeasonData, SeasonData } from '$lib/api/types';
	import DivisionStandings from './DivisionStandings.svelte';

	export let seasonStandings: SeasonData;
	export let selectedLeague: 'al' | 'nl' | 'both' = 'al';
	let leagueData: LeagueSeasonData;

	$: leagueData = seasonStandings[selectedLeague];

</script>

{#each Object.entries(leagueData) as [division, teamStandings]}
	<DivisionStandings {division} {teamStandings} />
{/each}
