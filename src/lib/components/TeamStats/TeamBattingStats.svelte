<script lang="ts">
	import {
		getBatStatsForAllTeams,
		getBatStatsForBenchForAllTeams,
		getBatStatsForDefPositionForAllTeams,
		getBatStatsForLineupSpotForAllTeams,
		getBatStatsForStartingLineupForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamBatStats } from '$lib/api/types';
	import TeamBatStatSelector from '$lib/components/TeamStats/TeamBatStatSelector.svelte';
	import TeamBattingStatsTable from '$lib/components/TeamStats/TeamBattingStatsTable.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { BatOrder, BatStatSplit, DefPositionNumber } from '$lib/types';

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

	$: if ($seasonStatFilter.season && $seasonStatFilter.batStatSplit) {
		getBatStatsRequest = getSelectedBatStats(
			$seasonStatFilter.season,
			$seasonStatFilter.batStatSplit,
			$seasonStatFilter.defPosition,
			$seasonStatFilter.batOrder
		);
	}
</script>

<div id="team-bat-stats" class="team-stats flex-auto flex flex-col flex-nowrap mb-4">
	<h3 class="mb-2 text-center text-3xl">Team Batting Stats</h3>
	<TeamBatStatSelector color={'secondary'} />
	{#if getBatStatsRequest}
		{#await getBatStatsRequest}
			<Spinner />
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
