<script lang="ts">
	import {
		getPitchStatsForAllTeams,
		getPitchStatsForRpForAllTeams,
		getPitchStatsForSpForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats } from '$lib/api/types';
	import TeamPitchStatsSelector from '$lib/components/ButtonGroups/TeamPitchStatsSelector.svelte';
	import TeamPitchingStatsTable from '$lib/components/TeamStats/TeamPitchingStatsTable.svelte';
	import type { PitchStatSplit } from '$lib/types';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import { teamPitchStat as teamPitchStatFilter } from '$lib/stores/teamPitchStatFilter';
	import { selectedSeason } from '$lib/stores/singleValueStores';
	import { getSpinnerColor } from '$lib/util';

	let teamPitchStats: TeamPitchStats[];
	let getPitchStatsRequest: Promise<ApiResponse<TeamPitchStats[]>>;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;

	const pitchStatsMap = {
		all: getPitchStatsForAllTeams,
		sp: getPitchStatsForSpForAllTeams,
		rp: getPitchStatsForRpForAllTeams
	};

	async function getSelectedPitchStats(
		year: number,
		split: PitchStatSplit
	): Promise<ApiResponse<TeamPitchStats[]>> {
		teamPitchStats = [];
		getPitchStatsResult = await pitchStatsMap[split](year);
		if (!getPitchStatsResult.success) {
			return getPitchStatsResult;
		}
		teamPitchStats = getPitchStatsResult.value;
		return getPitchStatsResult;
	}

	$: if ($selectedSeason && $teamPitchStatFilter.split) {
		getPitchStatsRequest = getSelectedPitchStats($selectedSeason, $teamPitchStatFilter.split);
	}

</script>

<div id="team-pitch-stats" class="team-stats flex-auto flex flex-col flex-nowrap">
	<div class="flex flex-col flex-nowrap justify-end items-start mb-2">
		<h3 class="m-0">Team Pitching Stats</h3>
		<TeamPitchStatsSelector />
	</div>
	{#if getPitchStatsRequest}
		{#await getPitchStatsRequest}
			<div class="pending"><SyncLoader size="40" color={`currentColor`} /></div>
		{:then _result}
			{#if getPitchStatsResult.success}
				<TeamPitchingStatsTable bind:teamPitchStats />
			{:else}
				<div class="error">Error: {getPitchStatsResult.message}</div>
			{/if}
		{:catch error}
			<div class="error">Error: {error.message}</div>
		{/await}
	{/if}
</div>
