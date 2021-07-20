<script lang="ts">
	import {
		getPitchStatsForAllTeams,
		getPitchStatsForRpForAllTeams,
		getPitchStatsForSpForAllTeams
	} from '$lib/api/team';
	import type { ApiResponse, TeamPitchStats } from '$lib/api/types';
	import TeamPitchingStatsTable from '$lib/components/TeamStats/TeamPitchingStatsTable.svelte';
	import Spinner from '$lib/components/Util/Spinner.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { PitchStatSplit } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	let teamPitchStats: TeamPitchStats[];
	let getPitchStatsRequest: Promise<ApiResponse<TeamPitchStats[]>>;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;
	let year: number = $teamStatFilter.season;
	let league: string = $teamStatFilter.league === 'both' ? 'AL & NL' : $teamStatFilter.league.toUpperCase();
	let splitSetting: string = getPitchStatSplitSetting();
	let teamPitchingStatsTable: TeamPitchingStatsTable;
	let updated: boolean = false;
	const dispatch = createEventDispatcher();

	const pitchStatsMap = {
		all: getPitchStatsForAllTeams,
		sp: getPitchStatsForSpForAllTeams,
		rp: getPitchStatsForRpForAllTeams
	};

	onMount(() => (getPitchStatsRequest = getSelectedPitchStats($teamStatFilter.season, $teamStatFilter.pitchStatSplit)));

	export function updateTeamPitchStats() {
		year = $teamStatFilter.season;
		league = $teamStatFilter.league === 'both' ? 'AL & NL' : $teamStatFilter.league.toUpperCase();
		splitSetting = getPitchStatSplitSetting();
		getPitchStatsRequest = getSelectedPitchStats($teamStatFilter.season, $teamStatFilter.pitchStatSplit);
	}

	async function getSelectedPitchStats(year: number, split: PitchStatSplit): Promise<ApiResponse<TeamPitchStats[]>> {
		teamPitchStats = [];
		getPitchStatsResult = await pitchStatsMap[split](year);
		if (!getPitchStatsResult.success) {
			return getPitchStatsResult;
		}
		teamPitchStats = getPitchStatsResult.value;
		updated = true;
		return getPitchStatsResult;
	}

	function getPitchStatSplitSetting(): string {
		if ($teamStatFilter.pitchStatSplit === 'all') {
			return 'All Pitchers';
		}
		if ($teamStatFilter.pitchStatSplit === 'sp') {
			return 'SP Only';
		}
		if ($teamStatFilter.pitchStatSplit === 'rp') {
			return 'RP Only';
		}
	}
</script>

<div id="team-pitch-stats" class="flex flex-col flex-auto team-stats flex-nowrap">
	<div class="flex flex-col items-start justify-end mb-2 flex-nowrap">
		<h3 class="mb-2 text-2xl sm:text-3xl">Team Pitching Stats</h3>
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
				<strong class="ml-2 mr-1 filter-label">Split</strong><span class="filter-value">{splitSetting}</span>
			</div>
		</div>
	</div>
	{#if getPitchStatsRequest}
		{#await getPitchStatsRequest}
			<Spinner />
		{:then _result}
			{#if getPitchStatsResult.success}
				<TeamPitchingStatsTable
					bind:this={teamPitchingStatsTable}
					bind:teamPitchStats
					bind:updated
					on:showPlayerStatsModal
				/>
			{:else}
				<div class="error">Error: {getPitchStatsResult.message}</div>
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
		font-weight: 500;
		color: var(--sec-color);
	}

	.filter-value {
		font-weight: 400;
		color: var(--sec-color);
	}
</style>
