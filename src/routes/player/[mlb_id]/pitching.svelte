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
	import CareerPitchStatsTable from '$lib/components/Player/Pitching/CareerPitchStatsTable.svelte';
	import PitchTypePercentiles from '$lib/components/Player/Pitching/Percentiles/PitchTypePercentiles.svelte';
	import PitchMixForSeason from '$lib/components/Player/Pitching/PitchMix/PitchMixForSeason.svelte';
	import PlayerPitchContentButtonGroup from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentButtonGroup.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import PlayerSeasonSelector from '$lib/components/Player/Selectors/PlayerSeasonSelector.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import type { PlayerContent } from '$lib/types';
	import { onMount } from 'svelte';

	export let playerDetails: PlayerDetailsSchema;
	let mlb_id: number;
	let error: string = null;
	let careerPitchStats: CareerPitchStats;
	let playerName: string;
	let contentShown: PlayerContent = 'career-stats';
	let loading = false;
	let errorMessageModal: ErrorMessageModal;
	let allApiRequests: Promise<
		[ApiResponse<CareerPitchStats>, ApiResponse<CareerPfxMetricsForPitcher>, ApiResponse<PlayerDetailsSchema>]
	>;

	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;

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
				class="flex flex-col items-start justify-start gap-3 flex-nowrap"
				use:removeLoadingScreen
			>
				<div class="flex flex-row flex-nowrap w-full justify-between">
					<PlayerDetails {...playerDetails} />
				</div>
				<div
					class="flex flex-col flex-nowrap justify-center gap-3 mx-auto w-auto sm:flex-row sm:justify-start sm:gap-5 sm:mb-3 sm:mx-0"
				>
					<PlayerSeasonSelector disabled={contentShown === 'career-stats'} />
					<PlayerPitchContentButtonGroup on:changed={(event) => (contentShown = event.detail)} />
				</div>
			</div>
			<div id="pfx-pitcher-stats">
				{#if contentShown === 'career-stats'}
					<CareerPitchStatsTable {careerPitchStats} sortBy={'year'} sortDir={'asc'} />
				{:else if contentShown === 'pitch-mix'}
					<PitchMixForSeason />
				{:else if contentShown === 'pitch-type-percentiles'}
					<PitchTypePercentiles />
				{/if}
			</div>
		{/if}
	{/await}
{/if}

<style lang="postcss">
	#pfx-pitcher-stats {
		border-radius: 4px;
		border: none;
	}
</style>
