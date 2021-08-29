<script lang="ts">
	import FilterSettings from '$lib/components/TeamStats/FilterSettings/FilterSettings.svelte';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats.svelte';
	import TeamBattingStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamBattingStatsByPlayerModal.svelte';
	import TeamPitchStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamPitchStatsByPlayerModal.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID, TeamStatType } from '$lib/types';

	let teamPitchStatsByPlayerModal: TeamPitchStatsByPlayerModal;
	let teamBattingStatsByPlayerModal: TeamBattingStatsByPlayerModal;
	let filterSettings: FilterSettings;
	let teamBatStatsComponent: TeamBattingStats;
	let teamPitchStatsComponent: TeamPitchingStats;
	let teamBatStatsShown: boolean = $teamStatFilter.statType === 'bat';
	let teamPitchStatsShown: boolean = $teamStatFilter.statType === 'pitch';

	$: pageTitle = getPageTitle($teamStatFilter.statType);

	function getPageTitle(seasonContent: TeamStatType) {
		if (seasonContent === 'bat') {
			return `${$teamStatFilter.season} Team Batting Stats`;
		}
		if (seasonContent === 'pitch') {
			return `${$teamStatFilter.season} Team Pitching Stats`;
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
		teamBatStatsShown = $teamStatFilter.statType === 'bat';
		teamPitchStatsShown = $teamStatFilter.statType === 'pitch';
	}
</script>

<svelte:head>
	<title>{pageTitle} | Vigorish</title>
</svelte:head>

<TeamBattingStatsByPlayerModal bind:this={teamBattingStatsByPlayerModal} sortBy={'total_games'} />
<TeamPitchStatsByPlayerModal bind:this={teamPitchStatsByPlayerModal} />

<div id="season-stats" class="flex flex-col mx-auto my-0 flex-nowrap">
	<FilterSettings bind:this={filterSettings} on:changed={() => updateTeamStatsTable()} />
	{#if teamBatStatsShown}
		<TeamBattingStats
			bind:this={teamBatStatsComponent}
			on:showFilterControls={() => filterSettings.handleShowFilters()}
			on:showPlayerStatsModal={(e) => showBattingStatsDetailModal(e.detail)}
		/>
	{:else if teamPitchStatsShown}
		<TeamPitchingStats
			bind:this={teamPitchStatsComponent}
			on:showFilterControls={() => filterSettings.handleShowFilters()}
			on:showPlayerStatsModal={(e) => showPitchStatsDetailModal(e.detail)}
		/>
	{/if}
</div>

<style lang="postcss">
	#season-stats {
		width: 100%;
	}

	@media screen and (min-width: 550) {
		#season-stats {
			width: 95%;
		}
	}
</style>
