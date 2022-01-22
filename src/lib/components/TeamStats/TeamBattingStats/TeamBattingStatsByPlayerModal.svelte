<script lang="ts">
	import {
		getBatStatsByPlayerForTeam,
		getBatStatsForBenchByPlayerForTeam,
		getBatStatsForDefPositionByPlayerForTeam,
		getBatStatsForLineupSpotByPlayerForTeam,
		getBatStatsForStartingLineupByPlayerForTeam
	} from '$lib/api/team';
	import type { ApiResponse, TeamBatStats } from '$lib/api/types';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import ModalContainer from '$lib/components/Util/ModalContainer.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP, TEAM_ID_TO_NAME_MAP } from '$lib/constants';
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
		statType: 'bat',
		batStatSplit: 'all',
		pitchStatSplit: 'all',
		defPosition: [],
		batOrder: []
	};
	export let tableId: string = `team-bat-stats-by-player`;
	export let sortBy: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let batStats: TeamBatStats[] = [];
	let team: TeamID;
	let hidden: boolean;
	let modalContainer: ModalContainer;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;
	let loading: boolean = false;
	let tableState: TableState;
	const tableIdSuffix = $pageWidth.isDefault ? '-mobile' : '';

	$: themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';
	$: split = settings.batStatSplit;
	$: defPosition = settings.defPosition;
	$: batOrder = settings.batOrder;
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
		let heading = `${year} ${TEAM_ID_TO_NAME_MAP[teamId]} Batting Stats by Player `;
		if (split === 'all') {
			heading += '(Split: All Players)';
		} else if (split === 'starters') {
			heading += '(Split: Starting Lineup)';
		} else if (split === 'subs') {
			heading += '(Split: Bench Players)';
		} else if (split === 'defpos') {
			heading += `(Def. Position: ${getDefPosAbbreviations()})`;
		} else {
			heading += `(Bat Order: ${getBatOrderNumbers()})`;
		}
		return heading;
	}

	function getDefPosAbbreviations() {
		const defPosAbbrevs = defPosition.sort((a, b) => a - b).map((def) => DEF_POS_NUM_TO_ABBREV_MAP[def]);
		return defPosAbbrevs.join(', ');
	}

	function getBatOrderNumbers() {
		return batOrder.sort((a, b) => a - b).join(', ');
	}

	async function getSelectedBatStats(): Promise<ApiResponse<TeamBatStats[]>> {
		const batStatsMap = {
			all: getBatStatsByPlayerForTeam,
			starters: getBatStatsForStartingLineupByPlayerForTeam,
			subs: getBatStatsForBenchByPlayerForTeam,
			defpos: getBatStatsForDefPositionByPlayerForTeam,
			batorder: getBatStatsForLineupSpotByPlayerForTeam
		};
		loading = true;
		if (settings.batStatSplit === 'all' || settings.batStatSplit === 'starters' || settings.batStatSplit === 'subs') {
			getBatStatsResult = await batStatsMap[settings.batStatSplit](settings.season, team);
		} else if (settings.batStatSplit === 'defpos') {
			getBatStatsResult = await batStatsMap[settings.batStatSplit](settings.season, team, settings.defPosition);
		} else if (settings.batStatSplit === 'batorder') {
			getBatStatsResult = await batStatsMap[settings.batStatSplit](settings.season, team, settings.batOrder);
		}
		if (!getBatStatsResult.success) {
			loading = false;
			return getBatStatsResult;
		}

		const allTeamBatStats = getBatStatsResult.value;
		if (settings.batStatSplit === 'defpos') {
			batStats = allTeamBatStats.filter((s) => s.all_player_stats_for_def_pos);
		} else if (settings.batStatSplit === 'batorder') {
			batStats = allTeamBatStats.filter((s) => s.all_player_stats_for_bat_order);
		} else {
			batStats = allTeamBatStats;
		}

		loading = false;
		tableState.reset(batStats.length, 5);
		return getBatStatsResult;
	}

	export function showModal(teamId: TeamID) {
		team = teamId;
		batStats = [];
		getSelectedBatStats();
		modalContainer.toggleModal();
	}
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<ModalContainer bind:this={modalContainer} bind:hidden let:backgroundColorRule>
		<div slot="content" class="mb-2 responsive">
			<SimpleTable data={batStats} columnSettings={playerColumnSettings} {tableSettings} bind:tableState />
		</div>
	</ModalContainer>
{/if}
