<script lang="ts">
	import {
		getBatStatsForAllTeams,
		getBatStatsForBenchForAllTeams,
		getBatStatsForDefPositionForAllTeams,
		getBatStatsForLineupSpotForAllTeams,
		getBatStatsForStartingLineupForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamBatStats, TeamBatStatsMap } from '$lib/api/types';
	import FilterSettings from '$lib/components/TeamStats/FilterSettings/FilterSettings.svelte';
	import FilterSettingsDescription from '$lib/components/TeamStats/FilterSettings/FilterSettingsDescription.svelte';
	import TeamBattingStatsTable from '$lib/components/TeamStats/TeamBattingStatsTable.svelte';
	import TeamBattingStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamBattingStatsByPlayerModal.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import type { BatOrder, BatStatSplit, DefPositionNumber, TeamStatFilter } from '$lib/types';
	import { onMount } from 'svelte';

	let settings: TeamStatFilter = {
		season: $mostRecentSeason ? $mostRecentSeason.year : null,
		league: 'both',
		statType: 'bat',
		batStatSplit: 'all',
		pitchStatSplit: 'all',
		defPosition: [],
		batOrder: []
	};
	let showFilters: boolean = false;
	let teamBatStatsMap: TeamBatStatsMap;
	let batStats: TeamBatStats[];
	let sortDir: 'asc' | 'desc' = 'desc';
	let loading: boolean = false;
	let pageSize: number = 10;
	let currentPage: number = 1;
	let startRow: number = 0;
	let endRow: number = 10;
	let teamBatStatsByPlayerModal: TeamBattingStatsByPlayerModal;
	const tableHeading = 'Team Batting Stats';

	$: batStats = getBatStatsfromTeamMap(teamBatStatsMap);
	$: totalRows = batStats ? batStats.length : 0;

	onMount(() => getSelectedBatStats(settings.season, settings.batStatSplit, settings.defPosition, settings.batOrder));

	const batStatsMap = {
		all: getBatStatsForAllTeams,
		starters: getBatStatsForStartingLineupForAllTeams,
		subs: getBatStatsForBenchForAllTeams,
		defpos: getBatStatsForDefPositionForAllTeams,
		batorder: getBatStatsForLineupSpotForAllTeams
	};

	async function getSelectedBatStats(
		year: number,
		split: BatStatSplit,
		defPos: DefPositionNumber[],
		batOrder: BatOrder[]
	): Promise<ApiResponse<TeamBatStatsMap>> {
		teamBatStatsMap = {};
		loading = true;
		let result: ApiResponse<TeamBatStatsMap>;
		if (split === 'all' || split === 'starters' || split === 'subs') {
			result = await batStatsMap[split](year);
		} else if (split === 'defpos') {
			result = await batStatsMap[split](year, defPos);
		} else {
			result = await batStatsMap[split](year, batOrder);
		}
		if (!result.success) {
			loading = false;
			return result;
		}
		teamBatStatsMap = result.value;
		loading = false;
		return result;
	}

	function getBatStatsfromTeamMap(teamMap: TeamBatStatsMap): TeamBatStats[] {
		if (teamMap) {
			let filteredStats = Object.values(teamMap);
			if (settings.league !== 'both') {
				filteredStats = filteredStats.filter((s) => s.league === settings.league.toUpperCase());
			}
			return filteredStats;
		}
	}
</script>

<TeamBattingStatsByPlayerModal
	bind:this={teamBatStatsByPlayerModal}
	bind:settings
	tableId={'team-bat-stats-by-player'}
	sortBy={'total_games'}
/>

<div class="flex flex-col my-0 flex-nowrap">
	<div class="flex flex-col items-start justify-end flex-nowrap">
		<h3 class="mb-1 text-xl tracking-wide md:text-2xl">{tableHeading}</h3>
		<FilterSettingsDescription bind:settings bind:showFilters bind:loading />
		<FilterSettings
			batting={true}
			bind:settings
			bind:showFilters
			on:changed={() =>
				getSelectedBatStats(settings.season, settings.batStatSplit, settings.defPosition, settings.batOrder)}
		/>
	</div>
	{#if loading}
		<Spinner />
	{:else}
		<div class="flex flex-col w-full player-stats-wrapper flex-nowrap responsive">
			<TeamBattingStatsTable
				tableId={`team-bat-stats`}
				sortBy={'re24_bat'}
				bind:batStats
				bind:year={settings.season}
				bind:sortDir
				bind:currentPage
				bind:startRow
				bind:endRow
				on:showPlayerStatsModal={(e) => teamBatStatsByPlayerModal.showModal(e.detail)}
			/>
			<Pagination
				bind:totalRows
				bind:pageSize
				bind:currentPage
				bind:startRow
				bind:endRow
				compactPageNav={false}
				rowTypeSingle={'team'}
				rowTypePlural={'teams'}
			/>
		</div>
	{/if}
</div>
