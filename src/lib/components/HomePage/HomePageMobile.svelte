<script lang="ts">
	import type { GameData, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
	import ScoreboardForDate from '$lib/components/HomePage/ScoreboardForDate/ScoreboardForDate.svelte';
	import LeagueStandings from '$lib/components/HomePage/StandingsForDate/LeagueStandings.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
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

	$: if ($scoreboardDate) formatted = format($scoreboardDate, 'MMM do');
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
			<h3 class="mb-2 text-xl font-normal tracking-wide text-center whitespace-nowrap">
				MLB Standings after {formatted}
			</h3>
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
