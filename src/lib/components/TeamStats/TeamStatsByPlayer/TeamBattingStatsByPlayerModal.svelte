<script lang="ts">
	import {
		getBatStatsByPlayerForTeam,
		getBatStatsForBenchByPlayerForTeam,
		getBatStatsForDefPositionByPlayerForTeam,
		getBatStatsForLineupSpotByPlayerForTeam,
		getBatStatsForStartingLineupByPlayerForTeam
	} from '$lib/api/team';
	import type { ApiResponse, TeamBatStats } from '$lib/api/types';
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';
	import TeamBattingStatsByPlayerTable from '$lib/components/TeamStats/TeamStatsByPlayer/TeamBattingStatsByPlayerTable.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { getRandomHexString } from '$lib/util';

	export let tableId: string = `team-bat-stats-by-player`;
	export let sortBy: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let batStats: TeamBatStats[] = [];
	let team: TeamID;
	let hidden: boolean;
	let modalContainer: ModalContainer;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;
	let loading: boolean = false;
	let pageSize: number;
	let currentPage: number;
	let startRow: number;
	let endRow: number;

	$: split = $teamStatFilter.batStatSplit;
	$: defPosition = $teamStatFilter.defPosition;
	$: batOrder = $teamStatFilter.batOrder;
	$: year = $teamStatFilter.season;
	$: totalRows = batStats.length;

	function getDefaultTableId() {
		return `team-bat-stats-by-player-${getRandomHexString(4)}`;
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
		if (split === 'all' || split === 'starters' || split === 'subs') {
			getBatStatsResult = await batStatsMap[split](year, team);
		} else if (split === 'defpos') {
			getBatStatsResult = await batStatsMap[split](year, team, defPosition);
		} else if (split === 'batorder') {
			getBatStatsResult = await batStatsMap[split](year, team, batOrder);
		}
		if (!getBatStatsResult.success) {
			loading = false;
			return getBatStatsResult;
		}

		const allTeamBatStats = getBatStatsResult.value;
		if (split === 'defpos') {
			batStats = allTeamBatStats.filter((s) => s.all_player_stats_for_def_pos);
		} else if (split === 'batorder') {
			batStats = allTeamBatStats.filter((s) => s.all_player_stats_for_bat_order);
		} else {
			batStats = allTeamBatStats;
		}

		loading = false;
		return getBatStatsResult;
	}

	export function showModal(teamId: TeamID) {
		team = teamId;
		pageSize = 5;
		currentPage = 1;
		startRow = 0;
		endRow = 5;
		batStats = [];
		getSelectedBatStats();
		modalContainer.toggleModal();
	}
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<ModalContainer bind:this={modalContainer} bind:hidden let:backgroundColorRule>
		<div slot="content" class="mb-2 responsive">
			<TeamBattingStatsByPlayerTable
				tableId={tableId ? tableId : getDefaultTableId()}
				bind:batStats
				bind:team
				bind:sortBy
				bind:sortDir
				bind:currentPage
				bind:startRow
				bind:endRow
				{backgroundColorRule}
			/>
			<Pagination
				bind:totalRows
				bind:pageSize
				bind:currentPage
				bind:startRow
				bind:endRow
				{backgroundColorRule}
				rowTypeSingle={'player'}
				rowTypePlural={'players'}
			/>
		</div>
	</ModalContainer>
{/if}
