<script lang="ts">
	import {
		getPitchStatsByPlayerForTeam,
		getPitchStatsForRpByPlayerForTeam,
		getPitchStatsForSpByPlayerForTeam
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats } from '$lib/api/types';
	import ModalContainer from '$lib/components/Modals/ModalContainer.svelte';
	import TeamPitchStatsByPlayerTable from '$lib/components/TeamStats/TeamStatsByPlayer/TeamPitchStatsByPlayerTable.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { TeamID } from '$lib/types';
	import { onMount } from 'svelte';
	import { Pulse } from '../../../../../node_modules/svelte-loading-spinners/src';

	let hidden: boolean;
	let mounted: boolean;
	let modalContainer: ModalContainer;
	let teamPitchStats: TeamPitchStats[];
	let team: TeamID;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;
	let getPitchStatsRequest: Promise<ApiResponse<TeamPitchStats[]>>;

	$: split = $seasonStatFilter.pitchStatSplit;
	$: year = $seasonStatFilter.season;
	$: if (hidden && mounted) {
		document.querySelector<HTMLElement>('#team-pitch-stats-table')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.add('hidden');
		document.querySelector<HTMLElement>('#stat-filters')?.classList.remove('flex');
	} else if (mounted) {
		document.querySelector<HTMLElement>('#team-pitch-stats-table')?.classList.remove('hidden');
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
		getPitchStatsResult = await pitchStatsMap[split](year, team);
		if (!getPitchStatsResult.success) {
			return getPitchStatsResult;
		}
		teamPitchStats = getPitchStatsResult.value;
		return getPitchStatsResult;
	}

	export function showModal(teamId: TeamID) {
		team = teamId;
		getPitchStatsRequest = getSelectedPitchStats();
		modalContainer.toggleModal();
	}
</script>

<ModalContainer bind:this={modalContainer} bind:hidden>
	<div slot="heading" class="modal-heading-flex">
		<span class="text-base font-bold">{year} {team} {split.toUpperCase()} {'Pitching Stats by Player'}</span>
		<span class="text-base font-normal ml-2">&nbsp;</span>
	</div>

	<div slot="content" id="player-stats-detail" class="responsive">
		{#if getPitchStatsRequest}
			{#await getPitchStatsRequest}
				<div class="pending"><Pulse size="40" color={`currentColor`} /></div>
			{:then _result}
				{#if getPitchStatsResult.success}
					<TeamPitchStatsByPlayerTable bind:teamPitchStats />
				{:else}
					<div class="error">Error: {getPitchStatsResult.message}</div>
				{/if}
			{:catch error}
				<div class="error">Error: {error.message}</div>
			{/await}
		{/if}
	</div>
</ModalContainer>

<style lang="postcss">
	#player-stats-detail {
		min-height: 30vh;
		max-height: 70vh;
	}
</style>
