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
	import { mostRecentSeason } from '$lib/stores/allMlbSeasons';
	import type { TeamID, TeamStatFilter } from '$lib/types';
	import { getRandomHexString } from '$lib/util/ui';

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
	let pageSize: number;
	let currentPage: number;
	let startRow: number;
	let endRow: number;

	$: totalRows = pitchStats.length;

	function getDefaultTableId() {
		return `team-pitch-stats-by-player-${getRandomHexString(4)}`;
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
		return getPitchStatsResult;
	}

	export function showModal(teamId: TeamID) {
		team = teamId;
		pageSize = 5;
		currentPage = 1;
		startRow = 0;
		endRow = 5;
		pitchStats = [];
		getSelectedPitchStats();
		modalContainer.toggleModal();
	}
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<ModalContainer bind:this={modalContainer} bind:hidden let:backgroundColorRule>
		<div slot="content" class="mb-2 responsive">
			<TeamPitchStatsByPlayerTable
				tableId={tableId ? tableId : getDefaultTableId()}
				bind:settings
				bind:pitchStats
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
