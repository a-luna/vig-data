<script lang="ts">
	import SeasonStandings from '$lib/components/Standings/SeasonStandings.svelte';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats.svelte';
	import TeamPitchStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamPitchStatsByPlayerModal.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueSelector/LeagueDropDown.svelte';
	import SeasonContentSelector from '$lib/components/Util/SeasonContentSelector/SeasonContentSelector.svelte';
	import SeasonSelector from '$lib/components/Util/SeasonSelector.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import { seasonContentShown } from '$lib/stores/singleValueStores';
	import type {
		BatOrder,
		BatStatSplit,
		DefPositionNumber,
		League,
		PitchStatSplit,
		SeasonContent,
		TeamID
	} from '$lib/types';

	let mounted: boolean = false;
	let teamPitchStatsByPlayerModal: TeamPitchStatsByPlayerModal;

	$: if (mounted)
		changePageAddress(
			$seasonStatFilter.season,
			$seasonStatFilter.league,
			$seasonContentShown,
			$seasonStatFilter.batStatSplit,
			$seasonStatFilter.defPosition,
			$seasonStatFilter.batOrder,
			$seasonStatFilter.pitchStatSplit
		);
	$: standingsShown = $seasonContentShown === 'standings';
	$: teamBatStatsShown = $seasonContentShown === 'team-bat';
	$: teamPitchStatsShown = $seasonContentShown === 'team-pitch';
	$: pageTitle = getPageTitle($seasonContentShown);

	function getPageTitle(seasonContent: SeasonContent) {
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
		batSplit: BatStatSplit,
		defPos: DefPositionNumber,
		batNum: BatOrder,
		pitchSplit: PitchStatSplit
	): string {
		let params = `?season=${season}&league=${league}&show=${seasonContent}`;
		if (seasonContent === 'team-bat') {
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
		batSplit: BatStatSplit,
		defPos: DefPositionNumber,
		batNum: BatOrder,
		pitchSplit: PitchStatSplit
	) {
		window.history.pushState(
			{},
			`${pageTitle} | Vigorish`,
			getQueryParams(season, league, seasonContent, batSplit, defPos, batNum, pitchSplit)
		);
	}

	function showPitchStatsDetailModal(teamId: TeamID) {
		teamPitchStatsByPlayerModal.showModal(teamId);
	}
</script>

<svelte:head>
	<title>{pageTitle} | Vigorish</title>
</svelte:head>

<TeamPitchStatsByPlayerModal bind:this={teamPitchStatsByPlayerModal} />

<div id="season-stats" class="flex flex-col mx-auto my-0 flex-nowrap">
	<div id="stat-filters" class="flex flex-row justify-center mb-5 flex-nowrap">
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
	{#if standingsShown}
		<SeasonStandings />
	{:else if teamBatStatsShown}
		<TeamBattingStats />
	{:else if teamPitchStatsShown}
		<TeamPitchingStats on:showPlayerStatsModal={(e) => showPitchStatsDetailModal(e.detail)} />
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
