<script lang="ts">
	import { onMount } from 'svelte';
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';
	import SeasonStandings from '$lib/components/Standings/SeasonStandings.svelte';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueSelector/LeagueDropDown.svelte';
	import SeasonContentSelector from '$lib/components/Util/SeasonContentSelector/SeasonContentSelector.svelte';
	import SeasonSelector from '$lib/components/Util/SeasonSelector.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { seasonSettings } from '$lib/stores/seasonSettings';
	import { scoreboardDate, selectedSeason } from '$lib/stores/singleValueStores';
	import { teamBatStat } from '$lib/stores/teamBatStatFilter';
	import { teamPitchStat } from '$lib/stores/teamPitchStatFilter';
	import type {
		BatOrder,
		BatStatSplit,
		DefPositionNumber,
		League,
		PitchStatSplit,
		SeasonContent
	} from '$lib/types';
	import {
		formatDateString,
		getDateFromString,
		getSeasonDates,
		getStringFromDate
	} from '$lib/util';

	let gameDate: Date;
	let mounted: boolean = false;

	$: scoreboardShown = $seasonSettings.show === 'scoreboard';
	$: standingsShown = $seasonSettings.show === 'standings';
	$: teamBatStatsShown = $seasonSettings.show === 'team-bat';
	$: teamPitchStatsShown = $seasonSettings.show === 'team-pitch';

	function getPageTitle(seasonContent: SeasonContent, date: Date) {
		if (seasonContent === 'scoreboard') {
			return `MLB Scoreboard for ${formatDateString(date)}`;
		}
		if (seasonContent === 'standings') {
			return `${$selectedSeason} MLB Standings`;
		}
		if (seasonContent === 'team-bat') {
			return `${$selectedSeason} Team Batting Stats`;
		}
		if (seasonContent === 'team-pitch') {
			return `${$selectedSeason} Team Pitching Stats`;
		}
		return 'Home';
	}

	function getQueryParams(
		season: number,
		league: League,
		seasonContent: SeasonContent,
		date: string,
		batSplit: BatStatSplit,
		defPos: DefPositionNumber,
		batNum: BatOrder,
		pitchSplit: PitchStatSplit
	): string {
		let params = `?season=${season}&league=${league}&show=${seasonContent}`;
		if (seasonContent === 'scoreboard') {
			params = `${params}&date=${date}`;
		} else if (seasonContent === 'team-bat') {
			params = `${params}&split=${batSplit}`;
			if (batSplit === 'defpos') {
				params = `${params}&pos=${defPos}`;
			} else if (batSplit === 'batorder') {
				params = `${params}&num=${batNum}`;
			}
		} else if (seasonContent === 'team-pitch') {
			params = `${params}&split=${pitchSplit}`;
		}
		return params;
	}

	function changePageAddress(
		season: number,
		league: League,
		seasonContent: SeasonContent,
		date: string,
		batSplit: BatStatSplit,
		defPos: DefPositionNumber,
		batNum: BatOrder,
		pitchSplit: PitchStatSplit
	) {
		window.history.pushState(
			{ game_date: formatGameDate(date) },
			`${pageTitle} | Vigorish`,
			getQueryParams(season, league, seasonContent, date, batSplit, defPos, batNum, pitchSplit)
		);
	}

	function formatGameDate(date: string): string {
		return formatDateString(getDateFromString(date).value);
	}

	function handleSeasonChanged(year: number) {
		const gameDate = getDateFromString($scoreboardDate).value;
		if (gameDate.getFullYear() !== $selectedSeason) {
			const matches = $allSeasons.seasons.filter((s) => s.year === year);
			if (matches.length == 1) {
				const season = matches[0];
				const [season_start, _] = getSeasonDates(season.start_date, season.end_date).value;
				$scoreboardDate = getStringFromDate(season_start);
			}
		}
	}

	onMount(() => {
		mounted = true;
	});

	$: if (mounted)
		changePageAddress(
			$selectedSeason,
			$seasonSettings.league,
			$seasonSettings.show,
			$scoreboardDate,
			$teamBatStat.split,
			$teamBatStat.defPosition,
			$teamBatStat.lineupSlot,
			$teamPitchStat.split
		);
	$: pageTitle = getPageTitle($seasonSettings.show, gameDate);
	$: handleSeasonChanged($selectedSeason);

</script>

<svelte:head>
	<title>{pageTitle} | Vigorish</title>
</svelte:head>

<div id="season-stats" class="flex flex-col flex-nowrap mx-auto my-0">
	<div class="flex flex-row flex-nowrap justify-center mb-5">
		<div class="season-settings flex-grow sm:flex-grow-0 w-full sm:w-auto">
			<SeasonSelector width={'100%'} />
		</div>
		<div class="season-settings flex-grow sm:flex-grow-0 w-full sm:w-auto ml-4">
			<LeagueDropDown width={'100%'} />
		</div>
	</div>
	<div class="mb-5 sm:w-full">
		<SeasonContentSelector />
	</div>
	{#if scoreboardShown}
		<Scoreboard />
	{:else if standingsShown}
		<SeasonStandings />
	{:else if teamBatStatsShown}
		<TeamBattingStats />
	{:else if teamPitchStatsShown}
		<TeamPitchingStats />
	{/if}
</div>

<style lang="postcss">
	#season-stats {
		width: 100%;
	}

	@media screen and (min-width: 550px) {
		#season-stats {
			width: 95%;
		}
	}

</style>
