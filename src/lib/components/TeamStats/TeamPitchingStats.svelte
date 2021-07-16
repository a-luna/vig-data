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
	import { createEventDispatcher } from 'svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	export let pageLoaded: boolean = false;
	let teamPitchStats: TeamPitchStats[];
	let getPitchStatsRequest: Promise<ApiResponse<TeamPitchStats[]>>;
	let getPitchStatsResult: ApiResponse<TeamPitchStats[]>;
	let year: number;
	let league: string;
	let splitSetting: string;
	const dispatch = createEventDispatcher();

	const pitchStatsMap = {
		all: getPitchStatsForAllTeams,
		sp: getPitchStatsForSpForAllTeams,
		rp: getPitchStatsForRpForAllTeams
	};

	$: if (pageLoaded) updateTeamPitchStats();

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
		<h3 class="m-0">Team Pitching Stats</h3>
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
				<strong class="my-auto ml-3 mr-1">Split:</strong><span class="my-auto">{splitSetting}</span>
			</div>
		</div>
	</div>
	{#if getPitchStatsRequest}
		{#await getPitchStatsRequest}
			<Spinner />
		{:then _result}
			{#if getPitchStatsResult.success}
				<TeamPitchingStatsTable bind:teamPitchStats on:showPlayerStatsModal />
			{:else}
				<div class="error">Error: {getPitchStatsResult.message}</div>
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
