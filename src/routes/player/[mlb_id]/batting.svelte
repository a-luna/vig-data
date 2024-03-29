<script lang="ts">
	import { page } from '$app/stores';
	import { getCareerBatStatsForPlayer, getPlayerDetails } from '$lib/api/player';
	import type { ApiResponse, CareerBatStats, PlayerDetails as PlayerDetailsSchema } from '$lib/api/types';
	import PlayerBatMetricsSlider from '$lib/components/Player/Batting/PlayerBatMetricsSlider.svelte';
	import CareerBattingStats from '$lib/components/Player/CareerStats/CareerBattingStats.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import PlayerDetailsCompact from '$lib/components/Player/PlayerDetailsCompact.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';
	import { getPlayerPageSettings } from '$lib/util/ui';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import { onMount } from 'svelte';

	let playerDetails: PlayerDetailsSchema;
	let careerBatStats: CareerBatStats;
	let playerName: string;
	let loading = false;
	let error: string = null;
	let getCareerStatsComplete = false;
	// let getCareerPfxComplete = false;
	let getPlayerBioComplete = false;

	$: allRequestsComplete = getCareerStatsComplete && getPlayerBioComplete;
	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;
	$: ({ playerDetailsFlexStyles, playerNameFontSize, playerDetailsSettings, carouselSettings, chartSettings } =
		getPlayerPageSettings($pageWidth.current));

	onMount(() => {
		loading = true;
		const mlb_id = parseInt($page.params.mlb_id);
		getCareerBatStats(mlb_id);
		// getCareerPfxData(mlb_id);
		getPlayerBio(mlb_id);
	});

	function removeLoadingScreen(_el: HTMLElement) {
		loading = false;
	}

	async function getCareerBatStats(mlb_id: number) {
		const result = await getCareerBatStatsForPlayer(mlb_id);
		if (!result.success) {
			error = result.message;
			return result;
		}
		careerBatStats = result.value;
		getCareerStatsComplete = true;
		return result;
	}

	// async function getCareerPfxData(mlb_id: number): Promise<ApiResponse<CareerPfxMetricsForPitcher>> {
	// 	const result = await getCareerPfxDataForPitcher(mlb_id);
	// 	if (!result.success) {
	// 		error = result.message;
	// 		return result;
	// 	}
	// 	$careerPfxData = result.value;
	// 	getCareerPfxComplete = true;
	// 	return result;
	// }

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
	<title>{playerName ? playerName : ''} Player Data | Vigorish</title>
</svelte:head>

<LoadingScreen {loading} />

{#if error}
	<ErrorMessageModal {error} />
{/if}

{#if allRequestsComplete}
	<div
		id="player-details"
		class="flex flex-col items-start justify-start gap-5 sm:gap-10 flex-nowrap"
		use:removeLoadingScreen
	>
		<div class="flex flex-nowrap w-full {playerDetailsFlexStyles}">
			<div class="flex flex-col self-start flex-initial gap-3 flex-nowrap sm:w-auto">
				<h2 class="font-medium leading-none tracking-wide player-name" style="font-size: {playerNameFontSize}">
					{playerDetails.name_first}
					{playerDetails.name_last}
				</h2>
				{#if $pageWidth.current < 640}
					<PlayerDetailsCompact {...playerDetails} {...playerDetailsSettings} />
				{:else}
					<PlayerDetails {...playerDetails} fontSize={playerDetailsSettings.fontSize} />
				{/if}
			</div>
			<PlayerBatMetricsSlider {careerBatStats} {carouselSettings} {chartSettings} />
		</div>
		<div />
	</div>
	<CareerBattingStats {careerBatStats} sortBy={'year'} sortDir={'asc'} />
{/if}
