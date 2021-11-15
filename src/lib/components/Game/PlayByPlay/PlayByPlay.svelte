<script lang="ts">
	import { getPitchFxForAtBat } from '$lib/api/pitchfx';
	import type {
		ApiResponse,
		AtBatDetails as AtBatDetailsSchema,
		AtBatPitchDescription,
		Boxscore,
		InningSummary,
		PitchFx
	} from '$lib/api/types';
	import AtBatViewer from '$lib/components/AtBatViewer/AtBatViewer.svelte';
	import PlayByPlayTable from '$lib/components/Game/PlayByPlay/PlayByPlayTable.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';
	import {
		addStrikeZoneCornersToPfxData,
		createPitchDescriptionList,
		identifyPfxDataBeyondBoundary
	} from '$lib/util/gameData';

	export let all_pbp: AtBatDetailsSchema[];
	export let boxscore: Boxscore;
	let selectedAtBatId: string;
	let selectedAtBat: AtBatDetailsSchema;
	let selectedAtBatPfx: PitchFx[];
	let selectedAtBatPfxAtBatId: number;
	let pfxCache: Record<string, PitchFx[]> = {};
	let pitchSequence: AtBatPitchDescription[];
	let filteredAtBats: AtBatDetailsSchema[];
	let atBatMap: Record<string, AtBatDetailsSchema>;
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
	let loading: boolean = false;
	let error: string = null;

	$: if (boxscore && all_pbp) {
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
	$: if (pfxAtBatIds) {
		selectedAtBatPfxAtBatId = atBatIdToAtBatOrder[selectedAtBatId];
		const firstPfxAtBatId = pfxAtBatIds[0];
		const lastPfxAtBatId = pfxAtBatIds[pfxAtBatIds.length - 1];
		goToPrevAtBatDisabled = pfxAtBatIds.length > 0 ? selectedAtBatPfxAtBatId === firstPfxAtBatId : true;
		goToNextAtBatDisabled = pfxAtBatIds.length > 0 ? selectedAtBatPfxAtBatId === lastPfxAtBatId : true;
	}

	async function getPfxForAtBat(): Promise<ApiResponse<PitchFx[]>> {
		selectedAtBat = atBatMap[selectedAtBatId];
		loading = true;
		const result = await getPitchFxForAtBat(selectedAtBatId);
		if (!result.success) {
			error = result.message;
			return result;
		}
		selectedAtBatPfx = addStrikeZoneCornersToPfxData(identifyPfxDataBeyondBoundary(result.value));
		pfxCache[selectedAtBatId] = selectedAtBatPfx;
		pitchSequence = createPitchDescriptionList(selectedAtBat.pitch_sequence_description, selectedAtBatPfx);
		loading = false;
		return result;
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
				(batterAtBatMap[mlb_id] = all_pbp.filter((pbp) => pbp.batter_id_mlb === mlb_id).map((pbp) => pbp.at_bat_id))
		);
	}

	function createPitcherAtBatMap() {
		pitcherAtBatMap = {};
		const pitcherIds = all_pbp.map((pbp) => pbp.pitcher_id_mlb);
		[...new Set(pitcherIds)].map(
			(mlb_id) =>
				(pitcherAtBatMap[mlb_id] = all_pbp.filter((pbp) => pbp.pitcher_id_mlb === mlb_id).map((pbp) => pbp.at_bat_id))
		);
	}

	function createInningAtBatMap() {
		inningAtBatMap = {};
		const inningIds = all_pbp.map((pbp) => pbp.inning_id);
		[...new Set(inningIds)].map(
			(inn) => (inningAtBatMap[inn] = all_pbp.filter((pbp) => pbp.inning_id === inn).map((pbp) => pbp.at_bat_id))
		);
	}

	function createPlayerTeamMap() {
		playerTeamMap = {};
		boxscore.away_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.away_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.home_team.team_id));
		boxscore.home_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.home_team.team_id));
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
			if (viewAtBatId in pfxCache) {
				selectedAtBat = atBatMap[selectedAtBatId];
				selectedAtBatPfx = pfxCache[selectedAtBatId];
				pitchSequence = createPitchDescriptionList(selectedAtBat.pitch_sequence_description, selectedAtBatPfx);
			} else {
				getPfxForAtBat();
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

{#if error}
	<ErrorMessageModal {error} />
{/if}

<AtBatViewer
	{loading}
	{selectedAtBat}
	{selectedAtBatPfx}
	{pitchSequence}
	{goToNextAtBatDisabled}
	{goToPrevAtBatDisabled}
	on:goToFirstAtBat={viewFirstAtBat}
	on:goToNextAtBat={viewNextAtBat}
	on:goToPrevAtBat={viewPrevAtBat}
	on:goToLastAtBat={viewLastAtBat}
/>
<PlayByPlayTable
	{atBatMap}
	{inningAtBatMap}
	{playerTeamMap}
	{inningSummaries}
	{selectedAtBatId}
	on:showAtBat={(e) => viewAtBat(e.detail)}
/>
