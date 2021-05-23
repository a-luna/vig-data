<script lang="ts">
	import { getAllValidSeasons, getSeasonStandings } from '$lib/api/season';
	import type { ApiResponse, MlbSeason, SeasonData, TeamBatStats } from '$lib/api/types';
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats.svelte';
	import SeasonStandings from '$lib/components/Standings/SeasonStandings.svelte';
	import LeagueSelector from '$lib/components/ButtonGroups/LeagueSelector.svelte';
	import SeasonSelector from '$lib/components/Util/SeasonSelector.svelte';
	import { SyncLoader } from '../../node_modules/svelte-loading-spinners/src';
	import {
		getBatStatsForAllTeams,
		getBatStatsForBenchForAllTeams,
		getBatStatsForDefPositionForAllTeams,
		getBatStatsForLineupSpotForAllTeams,
		getBatStatsForStartingLineupForAllTeams
	} from '$lib/api/team';
	import TeamBatStatsSelector from '$lib/components/ButtonGroups/TeamBatStatsSelector.svelte';

	let getStandingsSuccess: boolean;
	let getBatStatsSuccess: boolean;
	let selectedSeason: number;
	let selectedLeague: 'al' | 'nl' | 'both';
	let selectedBatSplit: 'all' | 'starters' | 'subs' | 'defpos' | 'batorder';
	let selectedDefPosition: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	let selectedLineupSpot: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	let seasonStandings: SeasonData;
	let teamBatStats: TeamBatStats[];
	let getStandingsRequest: Promise<ApiResponse<SeasonData>>;
	let getBatStatsRequest: Promise<ApiResponse<TeamBatStats[]>>;

	const batStatsMap = {
		all: getBatStatsForAllTeams,
		starters: getBatStatsForStartingLineupForAllTeams,
		subs: getBatStatsForBenchForAllTeams,
		defpos: getBatStatsForDefPositionForAllTeams,
		batorder: getBatStatsForLineupSpotForAllTeams
	};

	async function getStandings(year: number): Promise<ApiResponse<SeasonData>> {
		const result = await getSeasonStandings(year);
		getStandingsSuccess = result.success;
		if (!getStandingsSuccess) {
			return result;
		}
		seasonStandings = result.value;
	}

	async function getSelectedBatStats(
		year: number,
		split: 'all' | 'starters' | 'subs' | 'defpos' | 'batorder',
		defPos: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
		batOrder: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	): Promise<ApiResponse<TeamBatStats[]>> {
		let result: ApiResponse<TeamBatStats[]>;
		if (split === 'all' || split === 'starters' || split === 'subs') {
			result = await batStatsMap[split](year);
		} else if (split === 'defpos') {
			result = await batStatsMap[split](year, defPos);
		} else {
			result = await batStatsMap[split](year, batOrder);
		}
		getBatStatsSuccess = result.success;
		if (!getBatStatsSuccess) {
			return result;
		}
		teamBatStats = result.value;
	}

	$: if (selectedSeason) {
		getStandingsRequest = getStandings(selectedSeason);
	}

	$: if (selectedSeason && selectedBatSplit) {
		getBatStatsRequest = getSelectedBatStats(
			selectedSeason,
			selectedBatSplit,
			selectedDefPosition,
			selectedLineupSpot
		);
	}

</script>

<div id="season-stats" class="flex flex-col flex-nowrap mx-auto my-0">
	<div class="flex flex-row flex-wrap justify-between">
		<h3>Season Standings</h3>
		<div class="flex flex-row flex-nowrap items-center">
			<SeasonSelector bind:selectedSeason />
			<LeagueSelector bind:selectedLeague />
		</div>
	</div>
	<div class="flex flex-col flex-nowrap">
		<div class="flex flex-row flex-wrap flex-auto justify-center">
			{#if getStandingsRequest}
				{#await getStandingsRequest}
					<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
				{:then result}
					{#if getStandingsSuccess}
						<SeasonStandings bind:seasonStandings bind:selectedLeague />
					{:else}
						<div class="error">Error: {result.message}</div>
					{/if}
				{:catch error}
					<div class="error">Error: {error.message}</div>
				{/await}
			{/if}
		</div>
		<div class="team-stats flex-auto flex flex-col flex-nowrap">
			<div class="flex flex-row flex-wrap justify-between">
				<h3>Team Batting Stats</h3>
				<TeamBatStatsSelector bind:selectedBatSplit bind:selectedDefPosition />
			</div>
			{#if getBatStatsRequest}
				{#await getBatStatsRequest}
					<div class="pending"><SyncLoader size="40" color="#5000e6" /></div>
				{:then result}
					{#if getBatStatsSuccess}
						<TeamBattingStats bind:selectedLeague bind:teamBatStats />
					{:else}
						<div class="error">Error: {result.message}</div>
					{/if}
				{:catch error}
					<div class="error">Error: {error.message}</div>
				{/await}
			{/if}
		</div>
	</div>
</div>

<svelte:head>
	<title>Home | Vigorish</title>
</svelte:head>

<style lang="postcss">
	#season-stats {
		width: 100%;
	}

	@media screen and (min-width: 550px) {
		#season-stats {
			width: 95%;
		}
	}

	@media screen and (min-width: 768px) {
		#season-stats {
			width: 75%;
		}
	}

</style>
