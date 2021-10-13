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
	import PlayerPitchContentDropDown from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentDropDown.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import PlayerSeasonSelector from '$lib/components/Player/Selectors/PlayerSeasonSelector.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import type { PlayerContent } from '$lib/types';
	import { onMount } from 'svelte';

	export let playerDetails: PlayerDetailsSchema;
	let careerPitchStats: CareerPitchStats;
	let playerName: string;
	let contentShown: PlayerContent = 'career-stats';
	let loading = false;
	let error: string = null;
	let getCareerStatsComplete = false;
	let getCareerPfxComplete = false;
	let getPlayerBioComplete = false;

	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;
	$: allRequestsComplete = getCareerStatsComplete && getCareerPfxComplete && getPlayerBioComplete;

	onMount(() => {
		loading = true;
		const mlb_id = parseInt($page.params.mlb_id);
		getCareerPitchStats(mlb_id);
		getCareerPfxData(mlb_id);
		getPlayerBio(mlb_id);
	});

	function removeLoadingScreen(_el: HTMLElement) {
		loading = false;
	}

	async function getCareerPitchStats(mlb_id: number): Promise<ApiResponse<CareerPitchStats>> {
		const result = await getCareerPitchStatsForPlayer(mlb_id);
		if (!result.success) {
			error = result.message;
			return result;
		}
		careerPitchStats = result.value;
		getCareerStatsComplete = true;
		return result;
	}

	async function getCareerPfxData(mlb_id: number): Promise<ApiResponse<CareerPfxMetricsForPitcher>> {
		const result = await getCareerPfxDataForPitcher(mlb_id);
		if (!result.success) {
			error = result.message;
			return result;
		}
		$careerPfxData = result.value;
		getCareerPfxComplete = true;
		return result;
	}

	async function getPlayerBio(mlb_id: number): Promise<ApiResponse<PlayerDetailsSchema>> {
		const result = await getPlayerDetails(mlb_id);
		if (!result.success) {
			error = result.message;
			return result;
		}
		playerDetails = result.value;
		getPlayerBioComplete = true;
		return result;
	}
</script>

<svelte:head>
	<title>{playerName ? playerName : ''} PitchFx Data | Vigorish</title>
</svelte:head>

<LoadingScreen {loading} />

{#if error}
	<ErrorMessageModal {error} />
{/if}

{#if allRequestsComplete}
	<div id="player-details" class="flex flex-col items-start justify-start gap-3 flex-nowrap" use:removeLoadingScreen>
		<div class="flex flex-row justify-between w-full flex-nowrap">
			<PlayerDetails {...playerDetails} />
		</div>
		<div
			class="flex flex-row justify-center w-full gap-3 mb-5 flex-nowrap whitespace-nowrap sm:justify-start sm:w-auto sm:gap-5 sm:mx-0"
		>
			{#if $pageBreakPoints.isDefault}
				<PlayerPitchContentDropDown on:changed={(event) => (contentShown = event.detail)} width={'72%'} />
			{:else}
				<PlayerPitchContentButtonGroup on:changed={(event) => (contentShown = event.detail)} />
			{/if}
			<PlayerSeasonSelector disabled={contentShown === 'career-stats'} width={'25%'} />
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

<style lang="postcss">
	#pfx-pitcher-stats {
		border-radius: 4px;
		border: none;
	}
</style>
