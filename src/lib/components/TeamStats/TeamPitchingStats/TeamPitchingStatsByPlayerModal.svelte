<script lang="ts">
	import {
		getPitchStatsByPlayerForTeam,
		getPitchStatsForRpByPlayerForTeam,
		getPitchStatsForSpByPlayerForTeam
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats } from '$lib/api/types';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import ModalContainer from '$lib/components/Util/ModalContainer.svelte';
	import { TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import type { TeamID, TeamStatFilter } from '$lib/types';
	import { prefersDarkTheme } from '$lib/util/ui';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import type { TableSettings, TableState } from '@a-luna/svelte-simple-tables/types';
	import { playerColumnSettings } from './columnSettings';

	export let settings: TeamStatFilter = {
		season: $mostRecentSeason.year,
		league: 'both',
		statType: 'pitch',
		batStatSplit: 'all',
		pitchStatSplit: 'all',
		defPosition: [],
		batOrder: []
	};
	export let tableId: string = `team-pitch-stats-by-player`;
	export let sortBy: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let pitchStats: TeamPitchStats[] = [];
	let team: TeamID;
	let hidden: boolean;
	let modalContainer: ModalContainer;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;
	let loading: boolean = false;
	let tableState: TableState;
	const tableIdSuffix = $pageWidth.isDefault ? '-mobile' : '';

	$: themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';
	$: split = settings.pitchStatSplit;
	$: year = settings.season;
	$: heading = getTableHeading(team);
	$: $tableState.header = heading;

	const tableSettings: TableSettings = {
		tableId: `${tableId}${tableIdSuffix}`,
		showHeader: true,
		header: heading,
		showSortDescription: true,
		sortBy,
		sortDir,
		themeName,
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15],
		pageNavFormat: 'compact',
		rowType: 'players'
	};

	function getTableHeading(teamId) {
		heading = `${year} ${TEAM_ID_TO_NAME_MAP[teamId]} Pitching Stats by Player `;
		if (split !== 'all') {
			heading += `(${split.toUpperCase()} Only)`;
		}
		return heading;
	}

	async function getSelectedPitchStats(): Promise<ApiResponse<TeamPitchStats[]>> {
		const pitchStatsMap = {
			all: getPitchStatsByPlayerForTeam,
			sp: getPitchStatsForSpByPlayerForTeam,
			rp: getPitchStatsForRpByPlayerForTeam
		};
		loading = true;
		getPitchStatsResult = await pitchStatsMap[settings.pitchStatSplit](settings.season, team);
		if (!getPitchStatsResult.success) {
			loading = false;
			return getPitchStatsResult;
		}
		pitchStats = getPitchStatsResult.value;
		loading = false;
		tableState.reset(pitchStats.length, 5);
		return getPitchStatsResult;
	}

	export function showModal(teamId: TeamID) {
		team = teamId;
		pitchStats = [];
		getSelectedPitchStats();
		modalContainer.toggleModal();
	}
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<ModalContainer bind:this={modalContainer} bind:hidden let:backgroundColorRule>
		<div slot="content" class="mb-2 responsive">
			<SimpleTable data={pitchStats} columnSettings={playerColumnSettings} {tableSettings} bind:tableState />
		</div>
	</ModalContainer>
{/if}
