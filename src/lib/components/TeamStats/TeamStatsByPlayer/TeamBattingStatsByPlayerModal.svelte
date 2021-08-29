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
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { getDummyTeamBatStatsData } from '$lib/util';

	export let tableId: string = `team-bat-stats-by-player`;
	export let sortBy: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let teamBatStats: TeamBatStats[] = [];
	let team: TeamID;
	let hidden: boolean;
	let modalContainer: ModalContainer;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;
	let getBatStatsRequest: Promise<ApiResponse<TeamBatStats[]>>;
	let loading: boolean = false;

	$: sortedBatStats = teamBatStats.sort(getSortFunction(sortBy, sortDir));
	$: totalRows = sortedBatStats.length;
	$: pageSize = 5;
	$: currentPage = 1;
	$: startRow = 0;
	$: endRow = 5;

	$: split = $teamStatFilter.batStatSplit;
	$: defPosition = $teamStatFilter.defPosition;
	$: batOrder = $teamStatFilter.batOrder;
	$: year = $teamStatFilter.season;

	function getSortFunction(propName: string, dir: 'asc' | 'desc') {
		const sortFunctionMap = {
			number: {
				desc: (a: TeamBatStats, b: TeamBatStats) => b[propName] - a[propName],
				asc: (a: TeamBatStats, b: TeamBatStats) => a[propName] - b[propName]
			},
			string: {
				desc: (a: TeamBatStats, b: TeamBatStats) => b[propName].localeCompare(a[propName]),
				asc: (a: TeamBatStats, b: TeamBatStats) => a[propName].localeCompare(b[propName])
			}
		};
		const stats = getDummyTeamBatStatsData();
		return sortFunctionMap[typeof stats[propName]][dir];
	}

	const batStatsMap = {
		all: getBatStatsByPlayerForTeam,
		starters: getBatStatsForStartingLineupByPlayerForTeam,
		subs: getBatStatsForBenchByPlayerForTeam,
		defpos: getBatStatsForDefPositionByPlayerForTeam,
		batorder: getBatStatsForLineupSpotByPlayerForTeam
	};

	async function getSelectedBatStats(): Promise<ApiResponse<TeamBatStats[]>> {
		teamBatStats = [];
		loading = true;
		if (split === 'all' || split === 'starters' || split === 'subs') {
			getBatStatsResult = await batStatsMap[split](year, team);
		} else if (split === 'defpos') {
			getBatStatsResult = await batStatsMap[split](year, team, defPosition);
		} else {
			getBatStatsResult = await batStatsMap[split](year, team, batOrder);
		}
		loading = false;
		if (!getBatStatsResult.success) {
			return getBatStatsResult;
		}
		teamBatStats = getBatStatsResult.value;
		return getBatStatsResult;
	}

	async function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		currentPage = 1;
	}

	export function showModal(teamId: TeamID) {
		team = teamId;
		pageSize = 5;
		currentPage = 1;
		startRow = 0;
		endRow = 5;
		getBatStatsRequest = getSelectedBatStats();
		modalContainer.toggleModal();
	}
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<ModalContainer bind:this={modalContainer} bind:hidden let:backgroundColorRule>
		<div slot="content" id="player-stats-detail" class="mb-2 responsive">
			{#if getBatStatsRequest}
				{#await getBatStatsRequest}
					<Spinner />>
				{:then _result}
					{#if getBatStatsResult.success}
						<TeamBattingStatsByPlayerTable
							bind:teamBatStats={sortedBatStats}
							bind:team
							bind:sortBy
							bind:sortDir
							bind:startRow
							bind:endRow
							on:sortTable={(e) => sortTableByStat(e.detail)}
							{tableId}
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
					{:else}
						<div class="error">Error: {getBatStatsResult.message}</div>
					{/if}
				{:catch error}
					<div class="error">Error: {error.message}</div>
				{/await}
			{/if}
		</div>
	</ModalContainer>
{/if}

<!-- <style lang="postcss">
	#player-stats-detail {
		max-height: 90%;
	}
</style> -->
