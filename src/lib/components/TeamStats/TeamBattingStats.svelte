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
	import { createPaginationStore } from '$lib/stores/pagination';
	import type { BatOrder, BatStatSplit, DefPositionNumber, PaginationStore, TeamStatFilter } from '$lib/types';

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
	let pagination: PaginationStore = createPaginationStore(0, 0);
	let sortDir: 'asc' | 'desc' = 'desc';
	let loading: boolean = false;
	let teamBatStatsByPlayerModal: TeamBattingStatsByPlayerModal;
	const tableHeading = 'Team Batting Stats';

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

	function setupPagination(_el: HTMLElement) {
		batStats = getBatStatsfromTeamMap(teamBatStatsMap);
		pagination.changeTotalRows(batStats.length);
		pagination.changePageSize(10);
	}

	getSelectedBatStats(settings.season, settings.batStatSplit, settings.defPosition, settings.batOrder);
</script>

<TeamBattingStatsByPlayerModal
	bind:this={teamBatStatsByPlayerModal}
	bind:settings
	tableId={'team-bat-stats-by-player'}
	sortBy={'total_games'}
/>

<div class="flex flex-col gap-1 my-0 flex-nowrap">
	<div class="flex flex-col items-start justify-end flex-nowrap">
		<h3 class="mb-1 text-2xl tracking-wide">{tableHeading}</h3>
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
		<div class="flex flex-col w-full player-stats-wrapper flex-nowrap responsive" use:setupPagination>
			<TeamBattingStatsTable
				tableId={`team-bat-stats`}
				sortBy={'re24_bat'}
				bind:pagination
				bind:batStats
				bind:year={settings.season}
				bind:sortDir
				on:showPlayerStatsModal={(e) => teamBatStatsByPlayerModal.showModal(e.detail)}
			/>
			<Pagination {pagination} alwaysUseCompact={false} rowTypeSingle={'team'} rowTypePlural={'teams'} />
		</div>
	{/if}
</div>
