<script lang="ts">
	import {
		getPitchStatsForAllTeams,
		getPitchStatsForRpForAllTeams,
		getPitchStatsForSpForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats, TeamPitchStatsMap } from '$lib/api/types';
	import FilterSettings from '$lib/components/TeamStats/FilterSettings/FilterSettings.svelte';
	import FilterSettingsDescription from '$lib/components/TeamStats/FilterSettings/FilterSettingsDescription.svelte';
	import TeamPitchStatsByPlayerModal from '$lib/components/TeamStats/TeamPitchingStats/TeamPitchingStatsByPlayerModal.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import type { PitchStatSplit, TeamStatFilter } from '$lib/types';
	import { prefersDarkTheme } from '$lib/util';
	import { isTeamID } from '$lib/util/typeguards';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import type { TableSettings, TableState } from '@a-luna/svelte-simple-tables/types';
	import { teamColumnSettings } from './columnSettings';

	let settings: TeamStatFilter = {
		season: $mostRecentSeason ? $mostRecentSeason.year : null,
		league: 'both',
		statType: 'pitch',
		batStatSplit: 'all',
		pitchStatSplit: 'all',
		defPosition: [],
		batOrder: []
	};
	let showFilters: boolean = false;
	let teamPitchStatsMap: TeamPitchStatsMap;
	let pitchStats: TeamPitchStats[];
	let sortBy = 're24_pitch';
	let sortDir: 'asc' | 'desc' = 'desc';
	let loading: boolean = false;
	let teamPitchStatsByPlayerModal: TeamPitchStatsByPlayerModal;
	let tableState: TableState;
	const tableId = 'team-pitch-stats';
	const tableHeading = 'Team Pitching Stats';
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

	const pitchStatsMap = {
		all: getPitchStatsForAllTeams,
		sp: getPitchStatsForSpForAllTeams,
		rp: getPitchStatsForRpForAllTeams
	};

	async function getSelectedPitchStats(year: number, split: PitchStatSplit): Promise<ApiResponse<TeamPitchStatsMap>> {
		teamPitchStatsMap = {};
		loading = true;
		let result = await pitchStatsMap[split](year);
		if (!result.success) {
			loading = false;
			return result;
		}
		teamPitchStatsMap = result.value;
		loading = false;
		return result;
	}

	function getPitchStatsfromTeamMap(teamMap: TeamPitchStatsMap): TeamPitchStats[] {
		if (teamMap) {
			let filteredStats = Object.values(teamMap);
			if (settings.league !== 'both') {
				filteredStats = filteredStats.filter((s) => s.league === settings.league.toUpperCase());
			}
			return filteredStats;
		}
	}

	function setupPagination(_el: HTMLElement) {
		pitchStats = getPitchStatsfromTeamMap(teamPitchStatsMap);
		tableState.reset(pitchStats.length, 10);
	}

	function showPlayerStatsModal(stats: TeamPitchStats) {
		if (isTeamID(stats.player_team_id_bbref)) {
			teamPitchStatsByPlayerModal.showModal(stats.player_team_id_bbref);
		}
	}

	getSelectedPitchStats(settings.season, settings.pitchStatSplit);
</script>

<TeamPitchStatsByPlayerModal
	bind:this={teamPitchStatsByPlayerModal}
	bind:settings
	tableId={'team-pitch-stats-by-player'}
	sortBy={'innings_pitched'}
/>

<div class="flex flex-col gap-1 my-0 flex-nowrap">
	<div class="flex flex-col items-start justify-end flex-nowrap">
		<h3 class="mb-1 text-2xl tracking-wide">{tableHeading}</h3>
		<FilterSettingsDescription bind:settings bind:showFilters bind:loading />
		<FilterSettings
			pitching={true}
			bind:settings
			bind:showFilters
			on:changed={() => getSelectedPitchStats(settings.season, settings.pitchStatSplit)}
		/>
	</div>
	{#if loading}
		<Spinner />
	{:else}
		<div use:setupPagination>
			<SimpleTable
				data={pitchStats}
				columnSettings={teamColumnSettings}
				{tableSettings}
				bind:tableState
				on:rowClicked={(e) => showPlayerStatsModal(e.detail)}
			/>
		</div>
	{/if}
</div>
