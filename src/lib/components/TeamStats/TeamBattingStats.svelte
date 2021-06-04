<script lang="ts">
	import {
		getBatStatsForAllTeams,
		getBatStatsForBenchForAllTeams,
		getBatStatsForDefPositionForAllTeams,
		getBatStatsForLineupSpotForAllTeams,
		getBatStatsForStartingLineupForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamBatStats } from '$lib/api/types';
	import TeamBatStatsSelector from '$lib/components/Util/TeamBatStatSelector/TeamBatStatsSelector.svelte';
	import TeamBattingStatsTable from '$lib/components/TeamStats/TeamBattingStatsTable.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import type { BatOrder, BatStatSplit, DefPositionNumber } from '$lib/types';
	import { teamBatStat as teamBatStatFilter } from '$lib/stores/teamBatStatFilter';
	import { selectedSeason } from '$lib/stores/singleValueStores';
	import { getSpinnerColor } from '$lib/util';

	let teamBatStats: TeamBatStats[];
	let getBatStatsRequest: Promise<ApiResponse<TeamBatStats[]>>;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;

	const batStatsMap = {
		all: getBatStatsForAllTeams,
		starters: getBatStatsForStartingLineupForAllTeams,
		subs: getBatStatsForBenchForAllTeams,
		defpos: getBatStatsForDefPositionForAllTeams,
		batorder: getBatStatsForLineupSpotForAllTeams
	};

	async function getSelectedBatStats(
		year: number,
		split: BatStatSplit,
		defPos: DefPositionNumber,
		batOrder: BatOrder
	): Promise<ApiResponse<TeamBatStats[]>> {
		teamBatStats = [];
		if (split === 'all' || split === 'starters' || split === 'subs') {
			getBatStatsResult = await batStatsMap[split](year);
		} else if (split === 'defpos') {
			getBatStatsResult = await batStatsMap[split](year, defPos);
		} else {
			getBatStatsResult = await batStatsMap[split](year, batOrder);
		}
		if (!getBatStatsResult.success) {
			return getBatStatsResult;
		}
		teamBatStats = getBatStatsResult.value;
		return getBatStatsResult;
	}

	$: if ($selectedSeason && $teamBatStatFilter.split) {
		getBatStatsRequest = getSelectedBatStats(
			$selectedSeason,
			$teamBatStatFilter.split,
			$teamBatStatFilter.defPosition,
			$teamBatStatFilter.lineupSlot
		);
	}

</script>

<div id="team-bat-stats" class="team-stats flex-auto flex flex-col flex-nowrap mb-4">
	<div class="flex flex-col flex-nowrap justify-end items-start mb-2">
		<h3 class="m-0">Team Batting Stats</h3>
		<TeamBatStatsSelector color={'secondary'} />
	</div>
	{#if getBatStatsRequest}
		{#await getBatStatsRequest}
			<div class="pending"><SyncLoader size="40" color={`currentColor`} /></div>
		{:then _result}
			{#if getBatStatsResult.success}
				<TeamBattingStatsTable bind:teamBatStats />
			{:else}
				<div class="error">Error: {getBatStatsResult.message}</div>
			{/if}
		{:catch error}
			<div class="error">Error: {error.message}</div>
		{/await}
	{/if}
</div>
