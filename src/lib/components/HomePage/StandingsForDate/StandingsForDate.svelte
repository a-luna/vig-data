<script lang="ts">
	import type { SeasonData } from '$lib/api/types';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { format } from 'date-fns';

	export let seasonStandings: SeasonData;
	let formatted: string = '';

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMM do');
</script>

<div id={'standings-for-date'} class="flex flex-col flex-initial p-4 flex-nowrap">
	<h3
		class="mb-1.5 text-lg leading-none sm:leading-none tracking-wide sm:text-xl font-normal text-center whitespace-nowrap"
	>
		MLB Standings
	</h3>
	<span class="mb-1.5 italic leading-none sm:leading-none text-center text-xs sm:text-sm sub-heading"
		>after {formatted}</span
	>
	<div class="flex flex-col flex-nowrap">
		<div class="flex flex-col items-center justify-center gap-3 text-sm flex-nowrap">
			<LeagueStandings league={'al'} leagueStandings={seasonStandings['al']} />
			<LeagueStandings league={'nl'} leagueStandings={seasonStandings['nl']} />
		</div>
	</div>
</div>

<style lang="postcss">
	#standings-for-date {
		background-color: var(--section-content-bg-color);
		border: 2px dotted var(--section-content-border-color);
	}

	.sub-heading {
		color: var(--sec-color);
	}

	@media screen and (min-width: 640px) {
		#standings-for-date {
			width: 199px;
		}
	}

	@media screen and (min-width: 768px) {
		#standings-for-date {
			width: 208px;
		}
	}

	@media screen and (min-width: 1024px) {
		#standings-for-date {
			width: 217px;
		}
	}
</style>
