<script lang="ts">
	import { page } from '$app/stores';
	import { getCareerPfxDataForPitcher } from '$lib/api/pitchfx';
	import { getPlayerDetails } from '$lib/api/player';
	import type { ApiResponse, CareerPfxMetricsForPitcher, PlayerDetails as PlayerDetailsSchema } from '$lib/api/types';
	import PitchTypePercentiles from '$lib/components/PitchTypeStats/Percentiles/PitchTypePercentiles.svelte';
	import PitchTypeContentSelector from '$lib/components/PitchTypeStats/PitchTypeContentSelector.svelte';
	import PlayerSeasonSelector from '$lib/components/PitchTypeStats/PlayerSeasonSelector.svelte';
	import VeloLocation from '$lib/components/PitchTypeStats/VeloLocation/VeloLocation.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { careerPfxData } from '$lib/stores/singleValueStores';
	import { onMount } from 'svelte';

	export let playerDetails: PlayerDetailsSchema;
	let playerName: string;
	let contentShown: 'percentiles' | 'velo-loc' = 'percentiles';
	let twMobile: string = 'flex flex-col items-center justify-center mb-2 flex-nowrap text-base w-full';
	let twSmall: string = 'sm:items-end sm:mt-2 sm:mb-5 sm:text-sm sm:w-auto';
	let twMedium: string = 'md:text-base';
	let twStyles = `${twMobile} ${twSmall} ${twMedium}`;
	let getCareerPfxDataRequest: Promise<ApiResponse<CareerPfxMetricsForPitcher> | ApiResponse<PlayerDetailsSchema>>;
	let getCareerPfxDataResult: ApiResponse<CareerPfxMetricsForPitcher>;
	let getPlayerDetailsResult: ApiResponse<PlayerDetailsSchema>;
	let loading = false;

	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;

	onMount(() => {
		getCareerPfxDataRequest = getCareerPfxDataForPlayer();
	});

	async function getCareerPfxDataForPlayer() {
		const mlb_id = $page.params.mlb_id;
		loading = true;
		getCareerPfxDataResult = await getCareerPfxDataForPitcher(parseInt(mlb_id));
		if (!getCareerPfxDataResult.success) {
			loading = false;
			return getCareerPfxDataResult;
		}
		$careerPfxData = getCareerPfxDataResult.value;

		getPlayerDetailsResult = await getPlayerDetails(parseInt(mlb_id));
		if (!getPlayerDetailsResult.success) {
			loading = false;
			return getPlayerDetailsResult;
		}
		playerDetails = getPlayerDetailsResult.value;
		loading = false;
		return getPlayerDetailsResult;
	}
</script>

<svelte:head>
	<title>{playerName ? playerName : ''} PitchFx Data | Vigorish</title>
</svelte:head>
{#if getCareerPfxDataRequest}
	{#await getCareerPfxDataRequest}
		<LoadingScreen bind:loading />
	{:then result}
		{#if result.success}
			<div class="flex flex-col items-start justify-start sm:flex-row sm:justify-around sm:mb-5 flex-nowrap">
				<PlayerDetails {...playerDetails} />
				<div class={twStyles}>
					<PitchTypeContentSelector on:changed={(event) => (contentShown = event.detail)} />
					<PlayerSeasonSelector />
				</div>
			</div>
			<div id="pfx-pitcher-stats">
				{#if contentShown === 'percentiles'}
					<PitchTypePercentiles />
				{:else if contentShown === 'velo-loc'}
					<VeloLocation />
				{/if}
			</div>
		{:else}
			<div class="error">Error: {result.message}</div>
		{/if}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
{/if}
