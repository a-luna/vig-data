<script lang="ts">
	import type { GameData, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
	import ScoreboardForDate from '$lib/components/HomePage/ScoreboardForDate/ScoreboardForDate.svelte';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import { homePageDate } from '$lib/stores/dateStore';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { format } from 'date-fns';
	import { Tab, TabList, TabPanel, Tabs } from 'svelte-tabs';
	import BatStatsForDate from './PlayerStatsForDate/BatStatsForDate.svelte';
	import PitchStatsForDate from './PlayerStatsForDate/PitchStatsForDate.svelte';

	export let games_for_date: GameData[];
	export let pitchStats: PlayerPitchStats[] = [];
	export let batStats: PlayerBatStats[] = [];
	export let seasonStandings: SeasonData;
	const tableIdSuffix = $pageBreakPoints.isDefault ? '-mobile' : '';
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
				sortBy={'game_score'}
				tableId={`sp-stats${tableIdSuffix}`}
			/>
		</div>
		<div class="p-2 mb-2 section">
			<PitchStatsForDate
				pitchStats={pitchStats.filter((p) => p.is_rp == 1)}
				sortBy={'wpa_pitch'}
				tableId={`rp-stats${tableIdSuffix}`}
			/>
		</div>
		<div class="p-2 section">
			<BatStatsForDate {batStats} sortBy={'total_bases'} tableId={`all-bat-stats${tableIdSuffix}`} />
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
