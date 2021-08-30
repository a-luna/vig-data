<script lang="ts">
	import {
		getPitchStatsByPlayerForTeam,
		getPitchStatsForRpByPlayerForTeam,
		getPitchStatsForSpByPlayerForTeam
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats } from '$lib/api/types';
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';
	import TeamPitchStatsByPlayerTable from '$lib/components/TeamStats/TeamStatsByPlayer/TeamPitchStatsByPlayerTable.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { getDummyTeamPitchStatsData } from '$lib/util';

	export let tableId: string = `team-pitch-stats-by-player`;
	export let sortBy: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let teamPitchStats: TeamPitchStats[] = [];
	let team: TeamID;
	let hidden: boolean;
	let modalContainer: ModalContainer;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;
	let getPitchStatsRequest: Promise<ApiResponse<TeamPitchStats[]>>;
	let loading: boolean = false;

	$: sortedPitchStats = teamPitchStats.sort(getSortFunction(sortBy, sortDir));
	$: totalRows = sortedPitchStats.length;
	$: pageSize = 5;
	$: currentPage = 1;
	$: startRow = 0;
	$: endRow = 5;

	$: split = $teamStatFilter.pitchStatSplit;
	$: year = $teamStatFilter.season;

	function getSortFunction(propName: string, dir: 'asc' | 'desc') {
		const sortFunctionMap = {
			number: {
				desc: (a: TeamPitchStats, b: TeamPitchStats) => b[propName] - a[propName],
				asc: (a: TeamPitchStats, b: TeamPitchStats) => a[propName] - b[propName]
			},
			string: {
				desc: (a: TeamPitchStats, b: TeamPitchStats) => b[propName].localeCompare(a[propName]),
				asc: (a: TeamPitchStats, b: TeamPitchStats) => a[propName].localeCompare(b[propName])
			}
		};
		const stats = getDummyTeamPitchStatsData();
		return sortFunctionMap[typeof stats[propName]][dir];
	}

	const pitchStatsMap = {
		all: getPitchStatsByPlayerForTeam,
		sp: getPitchStatsForSpByPlayerForTeam,
		rp: getPitchStatsForRpByPlayerForTeam
	};

	async function getSelectedPitchStats(): Promise<ApiResponse<TeamPitchStats[]>> {
		teamPitchStats = [];
		loading = true;
		getPitchStatsResult = await pitchStatsMap[split](year, team);
		if (!getPitchStatsResult.success) {
			return getPitchStatsResult;
		}
		loading = false;
		teamPitchStats = getPitchStatsResult.value;
		return getPitchStatsResult;
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
		getPitchStatsRequest = getSelectedPitchStats();
		modalContainer.toggleModal();
	}
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<ModalContainer bind:this={modalContainer} bind:hidden let:backgroundColorRule>
		<div slot="content" id="player-stats-detail" class="responsive mb-2">
			{#if getPitchStatsRequest}
				{#await getPitchStatsRequest}
					<Spinner />
				{:then _result}
					{#if getPitchStatsResult.success}
						<TeamPitchStatsByPlayerTable
							bind:teamPitchStats={sortedPitchStats}
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
						<div class="error">Error: {getPitchStatsResult.message}</div>
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
