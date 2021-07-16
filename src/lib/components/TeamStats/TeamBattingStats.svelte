<script lang="ts">
	import {
		getBatStatsForAllTeams,
		getBatStatsForBenchForAllTeams,
		getBatStatsForDefPositionForAllTeams,
		getBatStatsForLineupSpotForAllTeams,
		getBatStatsForStartingLineupForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamBatStats } from '$lib/api/types';
	import TeamBattingStatsTable from '$lib/components/TeamStats/TeamBattingStatsTable.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { BatOrder, BatStatSplit, DefPositionNumber } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	export let pageLoaded: boolean = false;
	let teamBatStats: TeamBatStats[];
	let getBatStatsRequest: Promise<ApiResponse<TeamBatStats[]>>;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;
	let year: number;
	let league: string;
	let splitTitle: string;
	let splitSetting: string;
	const dispatch = createEventDispatcher();

	const batStatsMap = {
		all: getBatStatsForAllTeams,
		starters: getBatStatsForStartingLineupForAllTeams,
		subs: getBatStatsForBenchForAllTeams,
		defpos: getBatStatsForDefPositionForAllTeams,
		batorder: getBatStatsForLineupSpotForAllTeams
	};

	$: if (pageLoaded) updateTeamBatStats();

	export function updateTeamBatStats() {
		year = $teamStatFilter.season;
		league = $teamStatFilter.league === 'both' ? 'AL & NL' : $teamStatFilter.league.toUpperCase();
		splitTitle = getBatStatSplitTitle();
		splitSetting = getBatStatSplitSetting();

		getBatStatsRequest = getSelectedBatStats(
			$teamStatFilter.season,
			$teamStatFilter.batStatSplit,
			$teamStatFilter.defPosition,
			$teamStatFilter.batOrder
		);
	}

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

	function getBatStatSplitTitle(): string {
		if ($teamStatFilter.batStatSplit === 'all') {
			return 'Split:';
		}
		if ($teamStatFilter.batStatSplit === 'starters') {
			return 'Split:';
		}
		if ($teamStatFilter.batStatSplit === 'subs') {
			return 'Split:';
		}
		if ($teamStatFilter.batStatSplit === 'batorder') {
			return `Bat Order:`;
		}
		if ($teamStatFilter.batStatSplit === 'defpos') {
			return `Def. Position:`;
		}
	}

	function getBatStatSplitSetting(): string {
		if ($teamStatFilter.batStatSplit === 'all') {
			return 'All At Bats';
		}
		if ($teamStatFilter.batStatSplit === 'starters') {
			return 'Starting Lineup';
		}
		if ($teamStatFilter.batStatSplit === 'subs') {
			return 'Bench/Subs';
		}
		if ($teamStatFilter.batStatSplit === 'batorder') {
			return `${$teamStatFilter.batOrder}`;
		}
		if ($teamStatFilter.batStatSplit === 'defpos') {
			return `${DEF_POS_NUM_TO_ABBREV_MAP[$teamStatFilter.defPosition]}`;
		}
	}
</script>

<div id="team-bat-stats" class="flex flex-col flex-auto mb-4 team-stats flex-nowrap">
	<div class="flex flex-col items-start justify-end mb-2 flex-nowrap">
		<h3 class="m-0">Team Batting Stats</h3>
		<div class="flex flex-row justify-between w-full flex-nowrap">
			<div
				class="flex flex-row flex-wrap items-center justify-start mt-1 italic leading-none cursor-pointer change-settings"
				on:click={() => dispatch('showFilterControls')}
			>
				<div
					class="block w-5 h-5 my-auto cursor-pointer stroke-current stroke-2"
					title="Change Settings"
					on:click={() => dispatch('showFilterControls')}
				>
					<MdSettings />
				</div>
				<strong class="my-auto ml-1 mr-1">Year:</strong><span class="my-auto">{year}</span>
				<strong class="my-auto ml-3 mr-1">League:</strong><span class="my-auto">{league}</span>
				<strong class="my-auto ml-3 mr-1">{splitTitle}</strong><span class="my-auto">{splitSetting}</span>
			</div>
		</div>
	</div>
	{#if getBatStatsRequest}
		{#await getBatStatsRequest}
			<Spinner />
		{:then _result}
			{#if getBatStatsResult.success}
				<TeamBattingStatsTable bind:teamBatStats on:showPlayerStatsModal />
			{:else}
				<div class="error">Error: {getBatStatsResult.message}</div>
			{/if}
		{:catch error}
			<div class="error">Error: {error.message}</div>
		{/await}
	{/if}
</div>

<style lang="postcss">
	.change-settings {
		color: var(--sec-color);
	}
</style>
