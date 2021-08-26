<script lang="ts">
	import type { SeasonData } from '$lib/api/types';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import PageSection from '$lib/components/Util/PageSection.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { format } from 'date-fns';

	export let seasonStandings: SeasonData;
	let formatted: string = '';

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMM do');
</script>

<PageSection id={'standings-for-date'}>
	<div class="flex flex-col flex-nowrap">
		<h3 class="m-0 text-lg tracking-wide sm:text-xl font-normal text-center whitespace-nowrap">MLB Standings</h3>
		<span class="mb-1 italic text-center text-xs sm:text-sm sub-heading">after {formatted}</span>
		<div class="flex flex-col flex-nowrap">
			<div class="flex flex-col items-center justify-center mb-3 text-sm flex-nowrap">
				<LeagueStandings league={'al'} leagueStandings={seasonStandings['al']} />
				<LeagueStandings league={'nl'} leagueStandings={seasonStandings['nl']} />
			</div>
		</div>
	</div>
</PageSection>

<style lang="postcss">
	.sub-heading {
		color: var(--sec-color);
	}
</style>
