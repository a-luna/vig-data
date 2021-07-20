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
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { onMount } from 'svelte';
	import Pagination from './Pagination.svelte';

	let hidden: boolean;
	let mounted: boolean;
	let modalContainer: ModalContainer;
	let teamPitchStats: TeamPitchStats[] = [];
	let team: TeamID;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;
	let getPitchStatsRequest: Promise<ApiResponse<TeamPitchStats[]>>;
	let loading: boolean = false;

	$: totalRows = teamPitchStats.length;
	$: pageSize = 5;
	$: currentPage = 1;
	$: startRow = 0;
	$: endRow = 5;

	$: split = $teamStatFilter.pitchStatSplit;
	$: year = $teamStatFilter.season;
	$: heading = getTableHeading(team);
	$: if (hidden && mounted) {
		document.querySelector<HTMLElement>('#team-pitch-stats-table')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#season-content')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.remove('flex');
	} else if (mounted) {
		document.querySelector<HTMLElement>('#team-pitch-stats-table')?.classList.remove('hidden');
		document.querySelector<HTMLElement>('#season-content')?.classList.remove('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.remove('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.add('flex');
	}

	onMount(() => (mounted = true));

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

	function getTableHeading(teamId) {
		let heading = `${year} ${TEAM_ID_TO_NAME_MAP[teamId]} Pitching Stats by Player `;
		if (split !== 'all') {
			heading += `(${split.toUpperCase()} Only)`;
		}
		return heading;
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
		<div slot="heading" class="flex flex-row items-center justify-between w-full flex-nowrap">
			<span class="text-base font-bold overflow-x-hidden overflow-ellipsis">{heading}</span>
		</div>

		<div slot="content" id="player-stats-detail" class="responsive mb-2">
			{#if getPitchStatsRequest}
				{#await getPitchStatsRequest}
					<Spinner />
				{:then _result}
					{#if getPitchStatsResult.success}
						<TeamPitchStatsByPlayerTable bind:teamPitchStats bind:startRow bind:endRow {backgroundColorRule} />
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

<style lang="postcss">
	#player-stats-detail {
		max-height: 90%;
	}
</style>
