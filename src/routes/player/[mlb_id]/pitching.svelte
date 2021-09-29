<script lang="ts">
	import { page } from '$app/stores';
	import { getCareerPfxDataForPitcher } from '$lib/api/pitchfx';
	import { getCareerPitchStatsForPlayer, getPlayerDetails } from '$lib/api/player';
	import type {
		ApiResponse,
		CareerPfxMetricsForPitcher,
		CareerPitchStats,
		PlayerDetails as PlayerDetailsSchema
	} from '$lib/api/types';
	import ErrorMessageModal from '$lib/components/Modals/ErrorMessageModal.svelte';
	import PitchTypePercentiles from '$lib/components/PitchTypeStats/Percentiles/PitchTypePercentiles.svelte';
	import PitchTypeContentSelector from '$lib/components/PitchTypeStats/PitchTypeContentSelector.svelte';
	import PlayerSeasonSelector from '$lib/components/PitchTypeStats/PlayerSeasonSelector.svelte';
	import VeloLocation from '$lib/components/PitchTypeStats/VeloLocation/VeloLocation.svelte';
	import PitchMixPieChart from '$lib/components/Player/Pitching/PieCharts/PitchMixPieChart.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import { onMount } from 'svelte';

	export let playerDetails: PlayerDetailsSchema;
	let mlb_id: number;
	let error: string = null;
	let careerPitchStats: CareerPitchStats;
	let playerName: string;
	let allSeasonsPlayed: number[];
	let firstYearPlayed: number;
	let mostRecentYearPlayed: number;
	let contentShown: 'percentiles' | 'velo-loc' = 'percentiles';
	let twMobile: string = 'flex flex-col items-center justify-center ml-auto mb-2 flex-nowrap text-base w-full';
	let twSmall: string = 'sm:items-end sm:mt-2 sm:mb-5 sm:text-sm sm:w-auto';
	let twMedium: string = 'md:text-base';
	let twStyles = `${twMobile} ${twSmall} ${twMedium}`;
	let loading = false;
	let errorMessageModal: ErrorMessageModal;
	let allApiRequests: Promise<
		[ApiResponse<CareerPitchStats>, ApiResponse<CareerPfxMetricsForPitcher>, ApiResponse<PlayerDetailsSchema>]
	>;

	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;
	$: if (careerPitchStats)
		allSeasonsPlayed = careerPitchStats.by_team_by_year
			.filter((s) => s.all_stats_for_season)
			.sort((a, b) => b.year - a.year)
			.map((s) => s.year);
	$: if (allSeasonsPlayed) firstYearPlayed = allSeasonsPlayed[allSeasonsPlayed.length - 1];
	$: if (allSeasonsPlayed) mostRecentYearPlayed = allSeasonsPlayed[0];

	onMount(() => {
		loading = true;
		mlb_id = parseInt($page.params.mlb_id);
		allApiRequests = Promise.all([getCareerPitchStats(mlb_id), getCareerPfxData(mlb_id), getPlayerBio(mlb_id)]);
	});

	async function getCareerPitchStats(mlb_id: number): Promise<ApiResponse<CareerPitchStats>> {
		const result = await getCareerPitchStatsForPlayer(mlb_id);
		if (!result.success) {
			error = result.message;
			errorMessageModal.toggleModal(error);
			return result;
		}
		careerPitchStats = result.value;
		return result;
	}

	async function getCareerPfxData(mlb_id: number): Promise<ApiResponse<CareerPfxMetricsForPitcher>> {
		const result = await getCareerPfxDataForPitcher(mlb_id);
		if (!result.success) {
			error = result.message;
			errorMessageModal.toggleModal(error);
			return result;
		}
		$careerPfxData = result.value;
		return result;
	}

	async function getPlayerBio(mlb_id: number): Promise<ApiResponse<PlayerDetailsSchema>> {
		const result = await getPlayerDetails(mlb_id);
		if (!result.success) {
			error = result.message;
			errorMessageModal.toggleModal(error);
			return result;
		}
		playerDetails = result.value;
		return result;
	}

	function removeLoadingScreen(_el: HTMLElement) {
		loading = false;
	}
</script>

<ErrorMessageModal bind:this={errorMessageModal} />

<svelte:head>
	<title>{playerName ? playerName : ''} PitchFx Data | Vigorish</title>
</svelte:head>

{#if allApiRequests}
	{#await allApiRequests}
		<LoadingScreen {loading} />
	{:then result}
		{#if result.every((r) => r.success)}
			<div
				id="player-details"
				class="flex flex-col items-start justify-start sm:flex-row sm:justify-around sm:mb-5 flex-nowrap"
				use:removeLoadingScreen
			>
				<PlayerDetails {...playerDetails} />
				<div class={twStyles}>
					<PitchTypeContentSelector on:changed={(event) => (contentShown = event.detail)} />
					<PlayerSeasonSelector />
				</div>
			</div>
			<!-- <CareerPitchStatsTable {careerPitchStats} sortBy={'year'} sortDir={'asc'} /> -->
			<div class="flex flex-row flex-wrap justify-around gap-5 mb-5">
				<div class="flex flex-row justify-between gap-10 p-3 flex-nowrap section">
					<PitchMixPieChart
						year={0}
						stance={'all'}
						chartTitle={`${firstYearPlayed}-${mostRecentYearPlayed} (vsBoth)`}
					/>
					<PitchMixPieChart year={0} stance={'rhb'} chartTitle={`${firstYearPlayed}-${mostRecentYearPlayed} (vsRHB)`} />
					<PitchMixPieChart year={0} stance={'lhb'} chartTitle={`${firstYearPlayed}-${mostRecentYearPlayed} (vsLHB)`} />
				</div>

				<div class="flex flex-row justify-between gap-10 p-3 flex-nowrap section">
					<PitchMixPieChart
						year={mostRecentYearPlayed}
						stance={'all'}
						chartTitle={`${mostRecentYearPlayed} (vsBoth)`}
					/>
					<PitchMixPieChart year={mostRecentYearPlayed} stance={'rhb'} chartTitle={`${mostRecentYearPlayed} (vsRHB)`} />
					<PitchMixPieChart year={mostRecentYearPlayed} stance={'lhb'} chartTitle={`${mostRecentYearPlayed} (vsLHB)`} />
				</div>
			</div>
			<div id="pfx-pitcher-stats">
				{#if contentShown === 'percentiles'}
					<PitchTypePercentiles />
				{:else if contentShown === 'velo-loc'}
					<VeloLocation />
				{/if}
			</div>
		{/if}
	{/await}
{/if}
