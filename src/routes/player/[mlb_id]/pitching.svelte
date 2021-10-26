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
	import CareerPitchStatsTable from '$lib/components/Player/Pitching/CareerPitchStatsTable.svelte';
	import PitchTypePercentiles from '$lib/components/Player/Pitching/Percentiles/PitchTypePercentiles.svelte';
	import PitchMixForSeason from '$lib/components/Player/Pitching/PitchMix/PitchMixForSeason.svelte';
	import PlayerPitchMetricsSlider from '$lib/components/Player/Pitching/PlayerPitchMetricsSlider.svelte';
	import PlayerPitchStatsSettings from '$lib/components/Player/Pitching/PlayerPitchStatsSettings.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import PlayerDetailsCompact from '$lib/components/Player/PlayerDetailsCompact.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import type { PlayerPitchContent } from '$lib/types';
	import { getPlayerPageSettings } from '$lib/util/ui';
	import { onMount } from 'svelte';

	let playerDetails: PlayerDetailsSchema;
	let careerPitchStats: CareerPitchStats;
	let playerName: string;
	let contentShown: PlayerPitchContent = 'career-stats';
	let loading = false;
	let error: string = null;
	let getCareerStatsComplete = false;
	let getCareerPfxComplete = false;
	let getPlayerBioComplete = false;

	$: if (playerDetails) playerName = `${playerDetails.name_first} ${playerDetails.name_last}`;
	$: allRequestsComplete = getCareerStatsComplete && getCareerPfxComplete && getPlayerBioComplete;
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
			<PlayerPitchMetricsSlider {careerPitchStats} {carouselSettings} {chartSettings} />
		</div>
		<PlayerPitchStatsSettings bind:contentShown />
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
