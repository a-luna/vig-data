<script lang="ts">
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';
	import SeasonStandings from '$lib/components/Standings/SeasonStandings.svelte';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueSelector/LeagueDropDown.svelte';
	import SeasonContentSelector from '$lib/components/Util/SeasonContentSelector/SeasonContentSelector.svelte';
	import SeasonSelector from '$lib/components/Util/SeasonSelector.svelte';
	import { allSeasons } from '$lib/stores/allMlbSeasons';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import { seasonContentShown } from '$lib/stores/singleValueStores';
	import type { BatOrder,BatStatSplit,DefPositionNumber,League,PitchStatSplit,SeasonContent } from '$lib/types';
	import { formatDateString,getDateFromString,getSeasonDates,getStringFromDate } from '$lib/util';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	let gameDate: Date;
	let mounted: boolean = false;
	const displayDateformat: string = 'P';

	$: if (mounted)
		changePageAddress(
			$seasonStatFilter.season,
			$seasonStatFilter.league,
			$seasonContentShown,
			$seasonStatFilter.gameDate,
			$seasonStatFilter.batStatSplit,
			$seasonStatFilter.defPosition,
			$seasonStatFilter.batOrder,
			$seasonStatFilter.pitchStatSplit
		);
	$: scoreboardShown = $seasonContentShown === 'scoreboard';
	$: standingsShown = $seasonContentShown === 'standings';
	$: teamBatStatsShown = $seasonContentShown === 'team-bat';
	$: teamPitchStatsShown = $seasonContentShown === 'team-pitch';
	$: gameDate = getGameDate($seasonStatFilter.gameDate);
	$: formatted = gameDate ? format(gameDate, displayDateformat) : '';
	$: pageTitle = getPageTitle($seasonContentShown, gameDate);
	$: if (gameDate.getFullYear() !== $seasonStatFilter.season) {
		handleSeasonChanged($seasonStatFilter.season);
	}

	function getPageTitle(seasonContent: SeasonContent, date: Date) {
		if (seasonContent === 'scoreboard') {
			return `MLB Scoreboard for ${formatDateString(date)}`;
		}
		if (seasonContent === 'standings') {
			return `${$seasonStatFilter.season} MLB Standings`;
		}
		if (seasonContent === 'team-bat') {
			return `${$seasonStatFilter.season} Team Batting Stats`;
		}
		if (seasonContent === 'team-pitch') {
			return `${$seasonStatFilter.season} Team Pitching Stats`;
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
			{ game_date: { formatted } },
			`${pageTitle} | Vigorish`,
			getQueryParams(season, league, seasonContent, date, batSplit, defPos, batNum, pitchSplit)
		);
	}

	function handleSeasonChanged(year: number) {
		const matches = $allSeasons.seasons.filter((s) => s.year === year);
		if (matches.length == 1) {
			const season = matches[0];
			const [season_start, _] = getSeasonDates(season.start_date, season.end_date).value;
			seasonStatFilter.changeGameDate(getStringFromDate(season_start));
		}
	}

	function getGameDate(date: string): Date {
		const result = getDateFromString(date);
		if (result.success) {
			return result.value;
		}
	}

	onMount(() => (mounted = true));
</script>

<svelte:head>
	<title>{pageTitle} | Vigorish</title>
</svelte:head>

<div id="season-stats" class="flex flex-col mx-auto my-0 flex-nowrap">
	<div class="flex flex-row justify-center mb-5 flex-nowrap">
		<div class="flex-grow w-full season-settings sm:flex-grow-0 sm:w-auto">
			<SeasonSelector width={'100%'} />
		</div>
		<div class="flex-grow w-full ml-4 season-settings sm:flex-grow-0 sm:w-auto">
			<LeagueDropDown width={'100%'} />
		</div>
	</div>
	<div class="mb-5 sm:w-full">
		<SeasonContentSelector />
	</div>
	{#if scoreboardShown}
		<Scoreboard bind:value={gameDate} bind:formatted />
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
