<script lang="ts">
	import PitchStatSplitDropDown from '$lib/components/TeamStats/DropDownLists/PitchStatSplitDropDown.svelte';
	import TeamStatTypeDropDown from '$lib/components/TeamStats/DropDownLists/TeamStatTypeDropDown.svelte';
	import TeamBatStatDropDowns from '$lib/components/TeamStats/TeamBatStatDropDowns.svelte';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats.svelte';
	import TeamBattingStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamBattingStatsByPlayerModal.svelte';
	import TeamPitchStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamPitchStatsByPlayerModal.svelte';
	import LeagueDropDown from '$lib/components/Util/LeagueDropDown.svelte';
	import SeasonDropDown from '$lib/components/Util/SeasonDropDown.svelte';
	import { season, teamStatType } from '$lib/stores/singleValueStores';
	import type { TeamID, TeamStatType } from '$lib/types';
	import { onMount } from 'svelte';

	let pageLoaded: boolean = false;
	let teamPitchStatsByPlayerModal: TeamPitchStatsByPlayerModal;
	let teamBattingStatsByPlayerModal: TeamBattingStatsByPlayerModal;
	let showFilters: boolean = false;
	let teamBatStatsComponent: TeamBattingStats;
	let teamPitchStatsComponent: TeamPitchingStats;
	let teamBatStatsShown: boolean = $teamStatType === 'bat';
	let teamPitchStatsShown: boolean = $teamStatType === 'pitch';

	$: pageTitle = getPageTitle($teamStatType);

	function getPageTitle(seasonContent: TeamStatType) {
		if (seasonContent === 'bat') {
			return `${$season} Team Batting Stats`;
		}
		if (seasonContent === 'pitch') {
			return `${$season} Team Pitching Stats`;
		}
		return 'Home';
	}

	function showPitchStatsDetailModal(teamId: TeamID) {
		teamPitchStatsByPlayerModal.showModal(teamId);
	}

	function showBattingStatsDetailModal(teamId: TeamID) {
		teamBattingStatsByPlayerModal.showModal(teamId);
	}

	function updateTeamStatsTable() {
		if (teamPitchStatsShown) {
			teamPitchStatsComponent.updateTeamPitchStats();
		} else if (teamBatStatsShown) {
			teamBatStatsComponent.updateTeamBatStats();
		}

		teamBatStatsShown = $teamStatType === 'bat';
		teamPitchStatsShown = $teamStatType === 'pitch';
		showFilters = false;
	}

	onMount(() => {
		pageLoaded = true;
	});
</script>

<svelte:head>
	<title>{pageTitle} | Vigorish</title>
</svelte:head>

<TeamBattingStatsByPlayerModal bind:this={teamBattingStatsByPlayerModal} />
<TeamPitchStatsByPlayerModal bind:this={teamPitchStatsByPlayerModal} />

<div id="season-stats" class="flex flex-col mx-auto my-0 flex-nowrap">
	{#if showFilters}
		<div id="stat-filters" class="flex flex-row flex-wrap justify-center mb-5">
			<div class="flex-grow-0 w-auto m-1">
				<SeasonDropDown width={'100%'} />
			</div>
			<div class="flex-grow-0 w-auto m-1">
				<LeagueDropDown width={'100%'} />
			</div>
			<div class="flex-grow-0 w-auto m-1">
				<TeamStatTypeDropDown width={'100%'} />
			</div>
			{#if $teamStatType === 'pitch'}
				<div class="flex-grow-0 w-auto m-1">
					<PitchStatSplitDropDown width={'100%'} />
				</div>
			{:else if $teamStatType === 'bat'}
				<TeamBatStatDropDowns />
			{/if}
			<button class="w-auto m-1 btn btn-secondary" on:click={() => updateTeamStatsTable()}>Update</button>
		</div>
	{/if}

	{#if teamBatStatsShown}
		<TeamBattingStats
			bind:this={teamBatStatsComponent}
			bind:pageLoaded
			on:showFilterControls={() => (showFilters = true)}
			on:showPlayerStatsModal={(e) => showBattingStatsDetailModal(e.detail)}
		/>
	{:else if teamPitchStatsShown}
		<TeamPitchingStats
			bind:this={teamPitchStatsComponent}
			bind:pageLoaded
			on:showFilterControls={() => (showFilters = true)}
			on:showPlayerStatsModal={(e) => showPitchStatsDetailModal(e.detail)}
		/>
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
