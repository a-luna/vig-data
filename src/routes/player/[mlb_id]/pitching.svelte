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
	import PlayerPitchMetricsSlider from '$lib/components/Player/Pitching/PlayerPitchMetricsSlider.svelte';
	import PlayerPitchStatsSettings from '$lib/components/Player/Pitching/PlayerPitchStatsSettings.svelte';
	import PlayerDetails from '$lib/components/Player/PlayerDetails.svelte';
	import PlayerDetailsCompact from '$lib/components/Player/PlayerDetailsCompact.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { careerPfxData } from '$lib/stores/pfxPitcherMetrics';
	import type { PlayerContent } from '$lib/types';
	import { onMount } from 'svelte';

	let playerDetails: PlayerDetailsSchema;
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
	$: settings =
		$pageBreakPoints.width < 385
			? {
					playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
					playerNameFontSize: '2rem',
					playerDetailsSettings: { fontSize: `0.9rem`, majorGap: 'gap-2', minorGap: 'gap-1' },
					carouselSettings: {
						width: `calc(${$pageBreakPoints.width}px - 2.5rem)`,
						padding: 'py-3 px-2',
						props: { infinite: true, dots: true, particlesToShow: 1 }
					},
					chartSettings: {
						chartHeight: '145px',
						chartTitleFontSize: '1.25rem',
						pieWidth: '120px',
						legendFontSize: '0.9rem',
						legendFontWeight: 500
					}
			  }
			: $pageBreakPoints.width < 455
			? {
					playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
					playerNameFontSize: '2.1rem',
					playerDetailsSettings: { fontSize: `0.95rem`, majorGap: 'gap-2', minorGap: 'gap-1' },
					carouselSettings: {
						width: `calc(${$pageBreakPoints.width}px - 2.5rem)`,
						padding: 'py-3 px-2',
						props: { infinite: true, dots: true, particlesToShow: 1 }
					},
					chartSettings: {
						chartHeight: '145px',
						chartTitleFontSize: '1.25rem',
						pieWidth: '120px',
						legendFontSize: '0.9rem',
						legendFontWeight: 500
					}
			  }
			: $pageBreakPoints.width < 590
			? {
					playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
					playerNameFontSize: '2.1rem',
					playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-2', minorGap: 'gap-2' },
					carouselSettings: {
						width: `calc(${$pageBreakPoints.width}px - 2.5rem)`,
						padding: 'py-3 px-2',
						props: { infinite: false, dots: false, particlesToShow: 2 }
					},
					chartSettings: {
						chartHeight: '120px',
						chartTitleFontSize: '1.2rem',
						pieWidth: '100px',
						legendFontSize: '0.8rem',
						legendFontWeight: 500
					}
			  }
			: $pageBreakPoints.width < 640
			? {
					playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
					playerNameFontSize: '2.1rem',
					playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-2', minorGap: 'gap-2' },
					carouselSettings: {
						width: `calc(${$pageBreakPoints.width}px - 2.5rem)`,
						padding: 'py-3 px-1',
						props: { infinite: false, dots: false, particlesToShow: 3 }
					},
					chartSettings: {
						chartHeight: '100px',
						chartTitleFontSize: '1.1rem',
						pieWidth: '80px',
						legendFontSize: '0.725rem',
						legendFontWeight: 700
					}
			  }
			: $pageBreakPoints.width < 740
			? {
					playerDetailsFlexStyles: 'flex-row justify-between items-start',
					playerNameFontSize: '2.15rem',
					playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
					carouselSettings: {
						width: '325px',
						padding: 'p-3',
						props: { infinite: false, dots: false, particlesToShow: 1 }
					},
					chartSettings: {
						chartHeight: '135px',
						chartTitleFontSize: '1.1rem',
						pieWidth: '100px',
						legendFontSize: '0.8rem',
						legendFontWeight: 500
					}
			  }
			: $pageBreakPoints.width < 768
			? {
					playerDetailsFlexStyles: 'flex-row justify-between items-start',
					playerNameFontSize: '2.15rem',
					playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
					carouselSettings: {
						width: '450px',
						padding: 'p-3',
						props: { infinite: false, dots: false, particlesToShow: 2 }
					},
					chartSettings: {
						chartHeight: '135px',
						chartTitleFontSize: '1.1rem',
						pieWidth: '100px',
						legendFontSize: '0.8rem',
						legendFontWeight: 500
					}
			  }
			: $pageBreakPoints.width < 970
			? {
					playerDetailsFlexStyles: 'flex-row justify-between items-start',
					playerNameFontSize: '2.2rem',
					playerDetailsSettings: { fontSize: `1.05rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
					carouselSettings: {
						width: '470px',
						padding: 'p-3',
						props: { infinite: false, dots: false, particlesToShow: 2 }
					},
					chartSettings: {
						chartHeight: '140px',
						chartTitleFontSize: '1.1rem',
						pieWidth: '110px',
						legendFontSize: '0.8rem',
						legendFontWeight: 500
					}
			  }
			: $pageBreakPoints.width < 1024
			? {
					playerDetailsFlexStyles: 'flex-row justify-between items-start',
					playerNameFontSize: '2.2rem',
					playerDetailsSettings: { fontSize: `1.05rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
					carouselSettings: {
						width: '680px',
						padding: 'p-3',
						props: { infinite: false, dots: false, particlesToShow: 3 }
					},
					chartSettings: {
						chartHeight: '140px',
						chartTitleFontSize: '1.1rem',
						pieWidth: '100px',
						legendFontSize: '0.8rem',
						legendFontWeight: 500
					}
			  }
			: {
					playerDetailsFlexStyles: 'flex-row justify-between items-start',
					playerNameFontSize: '2rem',
					playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
					carouselSettings: {
						width: '710px',
						padding: 'p-3',
						props: { infinite: false, dots: false, particlesToShow: 3 }
					},
					chartSettings: {
						chartHeight: '152px',
						chartTitleFontSize: '1.1rem',
						pieWidth: '105px',
						legendFontSize: '0.8rem',
						legendFontWeight: 500
					}
			  };
	$: ({
		playerDetailsFlexStyles,
		playerNameFontSize,
		playerDetailsSettings,
		carouselSettings,
		chartSettings
	} = settings);

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
