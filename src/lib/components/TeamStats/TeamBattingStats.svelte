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
	import { teamStatFilterSettingsAreInvalid } from '$lib/util';
	import { createEventDispatcher, onMount } from 'svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	let teamBatStats: TeamBatStats[];
	let getBatStatsRequest: Promise<ApiResponse<TeamBatStats[]>>;
	let getBatStatsResult: ApiResponse<TeamBatStats[]>;
	let year: number = $teamStatFilter.season;
	let league: string = $teamStatFilter.league === 'both' ? 'AL & NL' : $teamStatFilter.league.toUpperCase();
	let splitTitle: string = getBatStatSplitTitle();
	let splitSetting: string = getBatStatSplitSetting();
	let teamBattingStatsTable: TeamBattingStatsTable;
	let updated: boolean = false;
	const dispatch = createEventDispatcher();

	const batStatsMap = {
		all: getBatStatsForAllTeams,
		starters: getBatStatsForStartingLineupForAllTeams,
		subs: getBatStatsForBenchForAllTeams,
		defpos: getBatStatsForDefPositionForAllTeams,
		batorder: getBatStatsForLineupSpotForAllTeams
	};

	onMount(() => {
		getBatStatsRequest = getSelectedBatStats(
			$teamStatFilter.season,
			$teamStatFilter.batStatSplit,
			$teamStatFilter.defPosition,
			$teamStatFilter.batOrder
		);
	});

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
		defPos: DefPositionNumber[],
		batOrder: BatOrder[]
	): Promise<ApiResponse<TeamBatStats[]>> {
		teamBatStats = [];
		const { invalid } = teamStatFilterSettingsAreInvalid(
			$teamStatFilter.statType,
			$teamStatFilter.batStatSplit,
			$teamStatFilter.defPosition,
			$teamStatFilter.batOrder
		);
		if (invalid) {
			return { success: false, status: 400 };
		}
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
		updated = true;
		return getBatStatsResult;
	}

	function getBatStatSplitTitle(): string {
		if ($teamStatFilter.batStatSplit === 'all') {
			return 'Split';
		}
		if ($teamStatFilter.batStatSplit === 'starters') {
			return 'Split';
		}
		if ($teamStatFilter.batStatSplit === 'subs') {
			return 'Split';
		}
		if ($teamStatFilter.batStatSplit === 'batorder') {
			return `Bat Order`;
		}
		if ($teamStatFilter.batStatSplit === 'defpos') {
			return `Def. Position`;
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
			return $teamStatFilter.batOrder.sort((a, b) => a - b).join(', ');
		}
		if ($teamStatFilter.batStatSplit === 'defpos') {
			const defPosAbbrevs = $teamStatFilter.defPosition
				.sort((a, b) => a - b)
				.map((def) => DEF_POS_NUM_TO_ABBREV_MAP[def]);
			return defPosAbbrevs.join(', ');
		}
	}
</script>

<div id="team-bat-stats" class="flex flex-col flex-auto mb-4 team-stats flex-nowrap">
	<div class="flex flex-col items-start justify-end mb-2 flex-nowrap">
		<h3 class="mb-2 text-2xl sm:text-3xl">Team Batting Stats</h3>
		<div class="flex flex-row items-center justify-start w-full text-sm leading-none flex-nowrap sm:text-base">
			<div
				class="block w-4 h-4 my-auto ml-1 cursor-pointer stroke-current stroke-2 change-settings sm:w-5 sm:h-5"
				title="Change Settings"
				on:click={() => dispatch('showFilterControls')}
			>
				<MdSettings />
			</div>
			<div
				class="flex flex-row flex-wrap items-end justify-start italic cursor-pointer current-settings"
				on:click={() => dispatch('showFilterControls')}
			>
				<strong class="filter-label ml-1.5 mr-1">Year</strong><span class="filter-value">{year},</span>
				<strong class="ml-2 mr-1 filter-label">League</strong><span class="filter-value">{league},</span>
				<strong class="ml-2 mr-1 filter-label">{splitTitle}</strong><span class="filter-value">{splitSetting}</span>
			</div>
		</div>
	</div>
	{#if getBatStatsRequest}
		{#await getBatStatsRequest}
			<Spinner />
		{:then _result}
			{#if getBatStatsResult.success}
				<TeamBattingStatsTable
					bind:this={teamBattingStatsTable}
					bind:teamBatStats
					bind:updated
					on:showPlayerStatsModal
				/>
			{:else}
				<div class="error">Error: {getBatStatsResult.message}</div>
			{/if}
		{:catch error}
			<div class="error">Error: {error.message}</div>
		{/await}
	{/if}
</div>

<style lang="postcss">
	.current-settings {
		color: var(--sec-color);
	}

	.change-settings {
		color: var(--sec-color);
	}

	.filter-label {
		font-weight: 700;
		color: var(--sec-color);
	}

	.filter-value {
		font-weight: 400;
		color: var(--sec-color);
	}
</style>
