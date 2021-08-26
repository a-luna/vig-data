<script lang="ts">
	import type { GameData, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
	import PlayerStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/PlayerStatsForDate.svelte';
	import ScoreboardForDate from '$lib/components/HomePage/ScoreboardForDate/ScoreboardForDate.svelte';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { format } from 'date-fns';
	import { Tab, TabList, TabPanel, Tabs } from 'svelte-tabs';

	export let games_for_date: GameData[];
	export let pitchStats: PlayerPitchStats[] = [];
	export let batStats: PlayerBatStats[] = [];
	export let seasonStandings: SeasonData;
	let formatted: string = '';

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMM do');
</script>

<Tabs>
	<TabList>
		<Tab>Scores</Tab>
		<Tab>Standings</Tab>
		<Tab>Player Stats</Tab>
	</TabList>

	<TabPanel>
		<ScoreboardForDate {games_for_date} {pitchStats} isMobile={true} />
	</TabPanel>

	<TabPanel>
		<div class="flex flex-col flex-nowrap">
			<h3 class="mb-2 text-xl font-normal tracking-wide text-center whitespace-nowrap">
				MLB Standings after {formatted}
			</h3>
			<div class="flex flex-row items-center justify-center flex-nowrap">
				<div class="flex flex-col items-center justify-center league-wrapper flex-nowrap">
					<LeagueStandings league={'al'} leagueStandings={seasonStandings['al']} />
				</div>
				<div class="flex flex-col items-center justify-center league-wrapper flex-nowrap">
					<LeagueStandings league={'nl'} leagueStandings={seasonStandings['nl']} />
				</div>
			</div>
		</div>
	</TabPanel>

	<TabPanel>
		<div class="flex flex-col justify-start flex-nowrap">
			<PlayerStatsForDate {pitchStats} {batStats} />
		</div>
	</TabPanel>
</Tabs>

<style lang="postcss">
	.league-wrapper {
		@apply text-xs;
	}

	@media screen and (min-width: 350px) {
		.league-wrapper {
			@apply text-sm;
		}
	}
</style>
