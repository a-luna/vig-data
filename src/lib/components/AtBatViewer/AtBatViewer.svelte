<script lang="ts">
	import type {
		ApiResponse,
		AtBatDetails,
		AtBatPitchDescription,
		Boxscore,
		InningSummary,
		PitchFx
	} from '$lib/api/types';
	import { getPitchFxForAtBat } from '$lib/api/pitchfx';
	import AtBatContext from '$lib/components/AtBatViewer/AtBatContext.svelte';
	import AtBatPitchSequence from '$lib/components/AtBatViewer/AtBatPitchSequence.svelte';
	import PlayByPlayTable from '$lib/components/AtBatViewer/PlayByPlayTable.svelte';
	import PitchLocationChart from '$lib/components/AtBatViewer/PitchLocationChart.svelte';
	import PlayByPlayNavigation from '$lib/components/ButtonGroups/PlayByPlayNavigation.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import {
		addStrikeZoneCornersToPfxData,
		createPitchDescriptionList,
		getSpinnerColor,
		identifyPfxDataBeyondBoundary
	} from '$lib/util';
	import { createEventDispatcher, onMount } from 'svelte';

	export let shown: boolean;
	let all_pbp: AtBatDetails[];
	let boxscore: Boxscore;
	let selectedAtBatId: string;
	let selectedAtBat: AtBatDetails;
	let selectedAtBatPfx: PitchFx[];
	let selectedAtBatPfxAtBatId: number;
	let pfxCache: Record<string, PitchFx[]> = {};
	let pitchSequence: AtBatPitchDescription[];
	let filteredAtBats: AtBatDetails[];
	let atBatMap: Record<string, AtBatDetails>;
	let playerTeamMap: Record<number, string>;
	let batterAtBatMap: Record<number, string[]>;
	let pitcherAtBatMap: Record<number, string[]>;
	let inningAtBatMap: Record<string, string[]>;
	let inningSummaries: Record<string, InningSummary>;
	let pfxAtBatIds: number[];
	let atBatOrderToAtBatId: Record<number, string> = {};
	let atBatIdToAtBatOrder: Record<string, number> = {};
	let goToPrevAtBatDisabled: boolean;
	let goToNextAtBatDisabled: boolean;
	let getPfxForAtBatReqeust: Promise<ApiResponse<PitchFx[]>>;
	let getPfxForAtBatResult: ApiResponse<PitchFx[]>;
	const dispatch = createEventDispatcher();

	$: if (pfxAtBatIds) {
		selectedAtBatPfxAtBatId = atBatIdToAtBatOrder[selectedAtBatId];
		const firstPfxAtBatId = pfxAtBatIds[0];
		const lastPfxAtBatId = pfxAtBatIds[pfxAtBatIds.length - 1];
		goToPrevAtBatDisabled =
			pfxAtBatIds.length > 0 ? selectedAtBatPfxAtBatId === firstPfxAtBatId : true;
		goToNextAtBatDisabled =
			pfxAtBatIds.length > 0 ? selectedAtBatPfxAtBatId === lastPfxAtBatId : true;
	}

	onMount(() => dispatch('readyForData'));

	async function getPfxForAtBat(): Promise<ApiResponse<PitchFx[]>> {
		selectedAtBat = atBatMap[selectedAtBatId];
		getPfxForAtBatResult = await getPitchFxForAtBat(selectedAtBatId);
		if (!getPfxForAtBatResult.success) {
			return getPfxForAtBatResult;
		}
		selectedAtBatPfx = addStrikeZoneCornersToPfxData(
			identifyPfxDataBeyondBoundary(getPfxForAtBatResult.value)
		);
		pfxCache[selectedAtBatId] = selectedAtBatPfx;
		pitchSequence = createPitchDescriptionList(
			selectedAtBat.pitch_sequence_description,
			selectedAtBatPfx
		);
		return getPfxForAtBatResult;
	}

	export function init(pbp: AtBatDetails[], box: Boxscore) {
		all_pbp = pbp;
		boxscore = box;
		inningSummaries = boxscore.inning_summaries;
		filteredAtBats = [...all_pbp];
		createAtBatMap();
		createBatterAtBatMap();
		createPitcherAtBatMap();
		createInningAtBatMap();
		createPlayerTeamMap();
		createAtBatOrderMaps();
		viewFirstAtBat();
	}

	function createAtBatMap() {
		atBatMap = {};
		const atBatIds = all_pbp.map((pbp) => pbp.at_bat_id);
		[...new Set(atBatIds)].map(
			(atBatId) => (atBatMap[atBatId] = all_pbp.filter((pbp) => pbp.at_bat_id === atBatId)[0])
		);
	}

	function createBatterAtBatMap() {
		batterAtBatMap = {};
		const batterIds = all_pbp.map((pbp) => pbp.batter_id_mlb);
		[...new Set(batterIds)].map(
			(mlb_id) =>
				(batterAtBatMap[mlb_id] = all_pbp
					.filter((pbp) => pbp.batter_id_mlb === mlb_id)
					.map((pbp) => pbp.at_bat_id))
		);
	}

	function createPitcherAtBatMap() {
		pitcherAtBatMap = {};
		const pitcherIds = all_pbp.map((pbp) => pbp.pitcher_id_mlb);
		[...new Set(pitcherIds)].map(
			(mlb_id) =>
				(pitcherAtBatMap[mlb_id] = all_pbp
					.filter((pbp) => pbp.pitcher_id_mlb === mlb_id)
					.map((pbp) => pbp.at_bat_id))
		);
	}

	function createInningAtBatMap() {
		inningAtBatMap = {};
		const inningIds = all_pbp.map((pbp) => pbp.inning_id);
		[...new Set(inningIds)].map(
			(inn) =>
				(inningAtBatMap[inn] = all_pbp
					.filter((pbp) => pbp.inning_id === inn)
					.map((pbp) => pbp.at_bat_id))
		);
	}

	function createPlayerTeamMap() {
		playerTeamMap = {};
		boxscore.away_team.batting.map(
			(batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.away_team.team_id)
		);
		boxscore.away_team.pitching.map(
			(pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.away_team.team_id)
		);
		boxscore.home_team.batting.map(
			(batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.home_team.team_id)
		);
		boxscore.home_team.pitching.map(
			(pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.home_team.team_id)
		);
	}

	function createAtBatOrderMaps() {
		atBatIdToAtBatOrder = {};
		atBatOrderToAtBatId = {};
		pfxAtBatIds = [...new Set(filteredAtBats.map((atBat) => atBat.pfx_ab_id))];
		pfxAtBatIds.sort((a, b) => a - b);
		pfxAtBatIds.map((pfxId) => {
			const abId = filteredAtBats.filter((pbp) => pbp.pfx_ab_id === pfxId)[0].at_bat_id;
			atBatIdToAtBatOrder[abId] = pfxId;
			atBatOrderToAtBatId[pfxId] = abId;
		});
	}

	export function viewAtBat(viewAtBatId: string) {
		if (viewAtBatId) {
			selectedAtBatId = viewAtBatId;
			if (Object.prototype.hasOwnProperty.call(pfxCache, viewAtBatId)) {
				selectedAtBat = atBatMap[selectedAtBatId];
				selectedAtBatPfx = pfxCache[selectedAtBatId];
				pitchSequence = createPitchDescriptionList(
					selectedAtBat.pitch_sequence_description,
					selectedAtBatPfx
				);
			} else {
				getPfxForAtBatReqeust = getPfxForAtBat();
			}
		}
	}

	function viewFirstAtBat() {
		viewAtBat(atBatOrderToAtBatId[pfxAtBatIds[0]]);
	}

	function viewPrevAtBat() {
		viewAtBat(atBatOrderToAtBatId[selectedAtBatPfxAtBatId - 1]);
	}

	function viewNextAtBat() {
		viewAtBat(atBatOrderToAtBatId[selectedAtBatPfxAtBatId + 1]);
	}

	function viewLastAtBat() {
		viewAtBat(atBatOrderToAtBatId[pfxAtBatIds[pfxAtBatIds.length - 1]]);
	}

</script>

<div class:not-shown={!shown} class="flex flex-col flex-nowrap justify-start items-center w-full">
	<div class="at-bat-viewer">
		<div class="at-bat-details-wrapper flex flex-col flex-nowrap justify-end">
			<div class="at-bat-details flex-grow-0">
				<AtBatContext {selectedAtBat} />
				{#if getPfxForAtBatReqeust}
					{#await getPfxForAtBatReqeust}
						<div class="pending"><SyncLoader size="40" color={`currentColor`} /></div>
					{:then result}
						{#if result.success}
							<AtBatPitchSequence {pitchSequence} {selectedAtBat} />
						{:else}
							<div class="error">Error: {result.message}</div>
						{/if}
					{:catch error}
						<div class="error">Error: {error.message}</div>
					{/await}
				{/if}
			</div>
			<div class="pbp-nav flex-grow-0">
				<PlayByPlayNavigation
					color={'secondary'}
					bind:goToPrevAtBatDisabled
					bind:goToNextAtBatDisabled
					on:goToFirstAtBat={viewFirstAtBat}
					on:goToNextAtBat={viewNextAtBat}
					on:goToPrevAtBat={viewPrevAtBat}
					on:goToLastAtBat={viewLastAtBat}
				/>
			</div>
		</div>
		<div class="pitch-location flex-grow-0">
			{#if getPfxForAtBatReqeust}
				{#await getPfxForAtBatReqeust}
					<div class="pending" />
				{:then result}
					{#if result.success}
						<PitchLocationChart bind:pfx={selectedAtBatPfx} />
					{:else}
						<div class="error">Error: {result.message}</div>
					{/if}
				{:catch error}
					<div class="error">Error: {error.message}</div>
				{/await}
			{/if}
		</div>
	</div>
	<PlayByPlayTable
		{atBatMap}
		{inningAtBatMap}
		{playerTeamMap}
		{inningSummaries}
		{selectedAtBatId}
		on:showAtBat={(event) => viewAtBat(event.detail)}
	/>
</div>

<style lang="postcss">
	.at-bat-details {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		flex: 1 0 auto;
		max-height: max-content;
		text-align: left;
		border-radius: 4px;
		border: 1px solid var(--pseq-outer-border-color);
	}

	.pbp-nav {
		width: auto;
		margin-top: 10px;
	}

	.at-bat-details-wrapper {
		margin: 10px 5px;
	}

	.pitch-location {
		background-color: var(--ploc-chart-bg-color);
		border-radius: 4px;
		border: 1px solid var(--ploc-outer-border-color);
		width: var(--ploc-chart-size);
		height: var(--ploc-chart-size);
		margin: 10px 5px;
	}

	.not-shown {
		display: none;
	}

	.at-bat-viewer {
		@apply flex-grow-0 w-full;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		font-size: 0.75rem;
	}

	@media screen and (min-width: 550px) {
		.at-bat-details {
			flex: 1 0 calc(var(--ploc-chart-size) - 43px);
			max-height: calc(var(--ploc-chart-size) - 43px);
		}

		.at-bat-viewer {
			flex-flow: row nowrap;
			justify-content: space-around;
			align-items: flex-end;
			max-width: 670px;
		}
	}

	@media screen and (min-width: 1024px) {
		.at-bat-viewer {
			font-size: 0.875rem;
			max-width: 775px;
		}
	}

</style>
