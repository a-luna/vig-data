<script lang="ts">
	import type { SeasonData } from '$lib/api/types';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { format } from 'date-fns';

	export let seasonStandings: SeasonData;
	let formatted: string = '';

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMM do');
</script>

<div id={'standings-for-date'} class="flex flex-col flex-nowrap p-4">
	<h3 class="m-0 text-lg tracking-wide sm:text-xl font-normal text-center whitespace-nowrap">MLB Standings</h3>
	<span class="mb-1 italic text-center text-xs sm:text-sm sub-heading">after {formatted}</span>
	<div class="flex flex-col flex-nowrap">
		<div class="flex flex-col gap-3 items-center justify-center text-sm flex-nowrap">
			<LeagueStandings league={'al'} leagueStandings={seasonStandings['al']} />
			<LeagueStandings league={'nl'} leagueStandings={seasonStandings['nl']} />
		</div>
	</div>
</div>

<style lang="postcss">
	#standings-for-date {
		background-color: var(--section-content-bg-color);
		border: 1px dotted var(--section-content-border-color);
	}

	#standings-for-date h3 {
		line-height: 1;
	}

	.sub-heading {
		color: var(--sec-color);
	}

	@media screen and (min-width: 768px) {
		#standings-for-date {
			background-color: var(--section-content-bg-color);
			border: 2px dotted var(--section-content-border-color);
		}
	}
</style>
