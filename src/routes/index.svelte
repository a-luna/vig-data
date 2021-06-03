<script lang="ts">
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';
	import SeasonStandings from '$lib/components/Standings/SeasonStandings.svelte';
	import SeasonSelector from '$lib/components/Util/SeasonSelector.svelte';
	import SeasonContentSelector from '$lib/components/Util/SeasonContentSelector/SeasonContentSelector.svelte';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats.svelte';
	import { scoreboardDate, selectedSeason } from '$lib/stores/singleValueStores';
	import { seasonSettings } from '$lib/stores/seasonSettings';
	import type { League, SeasonContent } from '$lib/types';
	import { formatDateString } from '$lib/util';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import LeagueDropDown from '$lib/components/Util/LeagueSelector/LeagueDropDown.svelte';

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

	function getQueryParams(season: number, league: League, seasonContent: SeasonContent): string {
		if ($seasonSettings.show !== 'scoreboard') {
			return `?season=${season}&league=${league}&show=${seasonContent}`;
		}
		return `?season=${season}&league=${league}&show=${seasonContent}&date=${$scoreboardDate}`;
	}

	function changePageAddress(season: number, league: League, seasonContent: SeasonContent) {
		window.history.pushState(
			{ game_date: formatDateString(gameDate) },
			`${pageTitle} | Vigorish`,
			getQueryParams(season, league, seasonContent)
		);
	}

	onMount(() => {
		$selectedSeason = parseInt($page.query.get('season')) || 2019;
		seasonSettings.changeLeague(($page.query.get('league') as League) || 'both');
		seasonSettings.changeContent(($page.query.get('show') as SeasonContent) || 'scoreboard');
		mounted = true;
	});

	$: if (mounted) changePageAddress($selectedSeason, $seasonSettings.league, $seasonSettings.show);
	$: pageTitle = getPageTitle($seasonSettings.show, gameDate);

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
		<Scoreboard bind:gameDate />
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
