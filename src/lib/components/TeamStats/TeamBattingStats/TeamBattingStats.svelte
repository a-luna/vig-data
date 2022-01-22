<script lang="ts">
	import {
	getBatStatsForAllTeams,
	getBatStatsForBenchForAllTeams,
	getBatStatsForDefPositionForAllTeams,
	getBatStatsForLineupSpotForAllTeams,
	getBatStatsForStartingLineupForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse,TeamBatStats,TeamBatStatsMap } from '$lib/api/types';
	import FilterSettings from '$lib/components/TeamStats/FilterSettings/FilterSettings.svelte';
	import FilterSettingsDescription from '$lib/components/TeamStats/FilterSettings/FilterSettingsDescription.svelte';
	import TeamBattingStatsByPlayerModal from '$lib/components/TeamStats/TeamBattingStats/TeamBattingStatsByPlayerModal.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import type { BatOrder,BatStatSplit,DefPositionNumber,TeamStatFilter } from '$lib/types';
	import { prefersDarkTheme } from '$lib/util';
	import { isTeamID } from '$lib/util/typeguards';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import type { TableSettings,TableState } from '@a-luna/svelte-simple-tables/types';
	import { teamColumnSettings } from './columnSettings';

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
	let sortBy = 're24_bat';
	let sortDir: 'asc' | 'desc' = 'desc';
	let loading: boolean = false;
	let teamBatStatsByPlayerModal: TeamBattingStatsByPlayerModal;
	let tableState: TableState;
	const tableId = 'team-bat-stats';
	const tableHeading = 'Team Batting Stats';
	const tableIdSuffix = $pageWidth.isDefault ? '-mobile' : '';

	$: themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';

	const tableSettings: TableSettings = {
		tableId: `${tableId}${tableIdSuffix}`,
		showHeader: false,
		showSortDescription: true,
		sortBy,
		sortDir,
		themeName,
		clickableRows: true,
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageNavFormat: 'auto',
		rowType: 'batters'
	};

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
		tableState.reset(batStats.length, 10);
	}

	function showPlayerStatsModal(stats: TeamBatStats) {
		if (isTeamID(stats.player_team_id_bbref)) {
			teamBatStatsByPlayerModal.showModal(stats.player_team_id_bbref);
		}
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
		<div use:setupPagination>
			<SimpleTable
				data={batStats}
				columnSettings={teamColumnSettings}
				{tableSettings}
				bind:tableState
				on:rowClicked={(e) => showPlayerStatsModal(e.detail)}
			/>
		</div>
	{/if}
</div>
