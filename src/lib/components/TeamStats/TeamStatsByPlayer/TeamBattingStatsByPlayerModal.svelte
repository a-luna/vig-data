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
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP, TEAM_ID_TO_NAME_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { TeamID } from '$lib/types';
	import { onMount } from 'svelte';
	import Pagination from './Pagination.svelte';

	let hidden: boolean;
	let mounted: boolean;
	let modalContainer: ModalContainer;
	let teamBatStats: TeamBatStats[] = [];
	let team: TeamID;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;
	let getBatStatsRequest: Promise<ApiResponse<TeamBatStats[]>>;
	let loading: boolean = false;

	$: totalRows = teamBatStats.length;
	$: pageSize = 5;
	$: currentPage = 1;
	$: startRow = 0;
	$: endRow = 5;

	$: split = $teamStatFilter.batStatSplit;
	$: defPosition = $teamStatFilter.defPosition;
	$: batOrder = $teamStatFilter.batOrder;
	$: year = $teamStatFilter.season;
	$: heading = getTableHeading(team);
	$: if (hidden && mounted) {
		document.querySelector<HTMLElement>('#team-bat-stats-table')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#season-content')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.remove('flex');
	} else if (mounted) {
		document.querySelector<HTMLElement>('#team-bat-stats-table')?.classList.remove('hidden');
		document.querySelector<HTMLElement>('#season-content')?.classList.remove('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.remove('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.add('flex');
	}

	onMount(() => (mounted = true));

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
		<div slot="heading" class="flex flex-row flex-nowrap justify-between items-center w-full">
			<span class="text-xl sm:text-lg overflow-x-hidden overflow-ellipsis">{heading}</span>
		</div>

		<div slot="content" id="player-stats-detail" class="responsive mb-2">
			{#if getBatStatsRequest}
				{#await getBatStatsRequest}
					<Spinner />>
				{:then _result}
					{#if getBatStatsResult.success}
						<TeamBattingStatsByPlayerTable bind:teamBatStats bind:startRow bind:endRow {backgroundColorRule} />
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

<style lang="postcss">
	#player-stats-detail {
		max-height: 90%;
	}
</style>
