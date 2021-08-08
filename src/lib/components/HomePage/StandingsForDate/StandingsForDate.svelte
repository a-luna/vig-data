<script lang="ts">
	import type { SeasonData } from '$lib/api/types';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueDropDown.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import type { League } from '$lib/types';
	import { format } from 'date-fns';

	export let seasonStandings: SeasonData;
	let selectedLeague: League = 'both';
	let formatted: string = '';

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMMM do, yyyy');
</script>

<div class="flex flex-col items-center justify-start overflow-x-auto season-wrapper">
	<h3 class="my-2 text-xl text-center sm:text-2xl">Standings After {formatted}</h3>
	<div class="flex-grow w-full m-2 md:hidden">
		<LeagueDropDown {selectedLeague} width={'auto'} on:changed={(e) => (selectedLeague = e.detail)} />
	</div>
	<div class="flex flex-row flex-nowrap justify-center">
		{#if selectedLeague === 'both' || selectedLeague === 'al'}
			<div class="flex flex-col items-center justify-start mx-2 text-sm flex-nowrap">
				<LeagueStandings league={'al'} leagueStandings={seasonStandings['al']} />
			</div>
		{/if}
		{#if selectedLeague === 'both' || selectedLeague === 'nl'}
			<div class="flex flex-col items-center justify-start mx-2 text-sm flex-nowrap">
				<LeagueStandings league={'nl'} leagueStandings={seasonStandings['nl']} />
			</div>
		{/if}
	</div>
</div>
