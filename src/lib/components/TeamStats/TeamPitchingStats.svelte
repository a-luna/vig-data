<script lang="ts">
	import {
		getPitchStatsForAllTeams,
		getPitchStatsForRpForAllTeams,
		getPitchStatsForSpForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats, TeamPitchStatsMap } from '$lib/api/types';
	import FilterSettings from '$lib/components/TeamStats/FilterSettings/FilterSettings.svelte';
	import FilterSettingsDescription from '$lib/components/TeamStats/FilterSettings/FilterSettingsDescription.svelte';
	import TeamPitchingStatsTable from '$lib/components/TeamStats/TeamPitchingStatsTable.svelte';
	import TeamPitchStatsByPlayerModal from '$lib/components/TeamStats/TeamStatsByPlayer/TeamPitchStatsByPlayerModal.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { createPaginationStore } from '$lib/stores/pagination';
	import type { PaginationStore, PitchStatSplit, TeamStatFilter } from '$lib/types';

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
	let sortDir: 'asc' | 'desc' = 'desc';
	let loading: boolean = false;
	let pagination: PaginationStore = createPaginationStore(0, 0);
	let teamPitchStatsByPlayerModal: TeamPitchStatsByPlayerModal;
	const tableHeading = 'Team Pitching Stats';

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
		pagination.changeTotalRows(pitchStats.length);
		pagination.changePageSize(10);
	}

	getSelectedPitchStats(settings.season, settings.pitchStatSplit);
</script>

<TeamPitchStatsByPlayerModal
	bind:this={teamPitchStatsByPlayerModal}
	bind:settings
	tableId={'team-pitch-stats-by-player'}
	sortBy={'innings_pitched'}
/>

<div class="flex flex-col my-0 flex-nowrap">
	<div class="flex flex-col items-start justify-end flex-nowrap">
		<h3 class="mb-1 text-xl tracking-wide md:text-2xl">{tableHeading}</h3>
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
		<div class="flex flex-col w-full player-stats-wrapper flex-nowrap responsive" use:setupPagination>
			<TeamPitchingStatsTable
				tableId={`team-bat-stats`}
				sortBy={'re24_pitch'}
				bind:pagination
				bind:pitchStats
				bind:year={settings.season}
				bind:sortDir
				on:showPlayerStatsModal={(e) => teamPitchStatsByPlayerModal.showModal(e.detail)}
			/>
			<Pagination {pagination} alwaysUseCompact={false} rowTypeSingle={'team'} rowTypePlural={'teams'} />
		</div>
	{/if}
</div>
