<script lang="ts">
	import { page } from '$app/stores';
	import { getCareerBatStatsForPlayer, getPlayerDetails } from '$lib/api/player';
	import type { ApiResponse, CareerBatStats, PlayerDetails as PlayerDetailsSchema } from '$lib/api/types';
	import ErrorMessageModal from '$lib/components/Modals/ErrorMessageModal.svelte';
	import CareerBatStatsTable from '$lib/components/Player/Batting/CareerBatStatsTable.svelte';
	import PlayerBatMetricsSlider from '$lib/components/Player/Batting/PlayerBatMetricsSlider.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import PlayerDetailsCompact from '$lib/components/Player/PlayerDetailsCompact.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { getPlayerPageSettings } from '$lib/util';
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
	$: ({
		playerDetailsFlexStyles,
		playerNameFontSize,
		playerDetailsSettings,
		carouselSettings,
		chartSettings
	} = getPlayerPageSettings($pageBreakPoints.width));

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
				{#if $pageBreakPoints.width < 640}
					<PlayerDetailsCompact {...playerDetails} {...playerDetailsSettings} />
				{:else}
					<PlayerDetails {...playerDetails} fontSize={playerDetailsSettings.fontSize} />
				{/if}
			</div>
			<PlayerBatMetricsSlider {careerBatStats} {carouselSettings} {chartSettings} />
		</div>
		<div />
	</div>
	<CareerBatStatsTable {careerBatStats} sortBy={'year'} sortDir={'asc'} />
{/if}
