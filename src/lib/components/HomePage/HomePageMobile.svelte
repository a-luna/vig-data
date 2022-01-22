<script lang="ts">
	import type { GameData, PitchFx, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
	import BarrelsForDate from '$lib/components/HomePage/PlayerStatsForDate/BarrelsForDate/BarrelsForDate.svelte';
	import BatStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/BatStatsForDate/BatStatsForDate.svelte';
	import PitchStatsForDate from '$lib/components/HomePage/PlayerStatsForDate/PitchStatsForDate/PitchStatsForDate.svelte';
	import ScoreboardForDate from '$lib/components/HomePage/ScoreboardForDate/ScoreboardForDate.svelte';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import { homePageDate } from '$lib/stores/dateStore';
	import { format } from 'date-fns';
	import { Tab, TabList, TabPanel, Tabs } from 'svelte-tabs';

	export let games_for_date: GameData[];
	export let pitchStats: PlayerPitchStats[] = [];
	export let batStats: PlayerBatStats[] = [];
	export let pfxBarrels: PitchFx[] = [];
	export let seasonStandings: SeasonData;
	let formatted: string = '';

	$: if ($homePageDate) formatted = format($homePageDate, 'MMM do');
</script>

<Tabs>
	<TabList>
		<Tab>Scores</Tab>
		<Tab>Standings</Tab>
		<Tab>Player Stats</Tab>
	</TabList>

	<TabPanel>
		<ScoreboardForDate {games_for_date} {pitchStats} />
	</TabPanel>

	<TabPanel>
		<div class="flex flex-col flex-nowrap">
			<h3
				class="mb-1.5 text-lg leading-none sm:leading-none tracking-wide sm:text-xl font-normal text-center whitespace-nowrap"
			>
				MLB Standings
			</h3>
			<span class="mb-1.5 italic leading-none sm:leading-none text-center text-xs sm:text-sm sub-heading"
				>after {formatted}</span
			>
			<div class="flex flex-row items-center justify-center gap-5 flex-nowrap">
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
		<div class="p-2 mb-2 section">
			<PitchStatsForDate
				pitchStats={pitchStats.filter((p) => p.is_sp == 1)}
				tableHeading={'Starting Pitcher Stats'}
				tableId={`sp-stats`}
				sortBy={'game_score'}
			/>
		</div>
		<div class="p-2 mb-2 section">
			<PitchStatsForDate
				pitchStats={pitchStats.filter((p) => p.is_rp == 1)}
				tableHeading={'Relief Pitcher Stats'}
				tableId={`rp-stats`}
				sortBy={'wpa_pitch'}
			/>
		</div>
		<div class="p-2 mb-2 section">
			<BatStatsForDate {batStats} tableHeading={'Batting Stats'} tableId={`all-bat-stats`} sortBy={'total_bases'} />
		</div>
		<div class="p-2 section">
			<BarrelsForDate {pfxBarrels} tableHeading={'Barrels'} tableId={'all-barrels'} sortBy={'launch_speed'} />
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
