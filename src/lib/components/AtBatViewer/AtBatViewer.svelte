<script lang="ts">
	import type { ApiResponse, AtBatDetails, Boxscore, InningSummary, PitchFx } from '$lib/api/types';
	import { getPitchFxForAtBat } from '$lib/api/pitchfx';
	import AtBatContext from '$lib/components/AtBatViewer/AtBatContext.svelte';
	import AtBatPitchSequence from '$lib/components/AtBatViewer/AtBatPitchSequence.svelte';
	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';
	import PlayByPlayTable from './PlayByPlayTable.svelte';

	export let shown: boolean;
	export let boxscore: Boxscore;
	let selectedAtBatId: string;
	let all_pbp: AtBatDetails[];
	let atBatMap: Record<string, AtBatDetails>;
	let playerTeamMap: Record<number, string>;
	let batterAtBatMap: Record<number, string[]>;
	let pitcherAtBatMap: Record<number, string[]>;
	let inningAtBatMap: Record<string, string[]>;
	let orderedAtBatMap: Record<number, string>;
	let inningSummaries: Record<string, InningSummary>;
	let at_bat: AtBatDetails;
	let pfx: PitchFx[];
	let success: boolean;
	let atBatViewerReqeust: Promise<ApiResponse<PitchFx[]>>;

	async function getPfxForAtBat(): Promise<ApiResponse<PitchFx[]>> {
		at_bat = atBatMap[selectedAtBatId];
		const getPfxResult = await getPitchFxForAtBat(selectedAtBatId);
		success = getPfxResult.success;
		if (!success) {
			return getPfxResult;
		}
		pfx = getPfxResult.value;
		return getPfxResult;
	}

	function createPlayerTeamMap() {
		playerTeamMap = {};
		boxscore.away_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.batting.map((batStats) => (playerTeamMap[batStats.mlb_id] = boxscore.home_team.team_id));
		boxscore.away_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.away_team.team_id));
		boxscore.home_team.pitching.map((pitchStats) => (playerTeamMap[pitchStats.mlb_id] = boxscore.home_team.team_id));
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

	function createOrderedAtBatMap() {
		orderedAtBatMap = {};
		let pfxAtBatIds = all_pbp.map((pbp) => pbp.pfx_ab_id);
		pfxAtBatIds = [...new Set(pfxAtBatIds)];
		pfxAtBatIds.sort();
		pfxAtBatIds.map(
			(pfxId) => (orderedAtBatMap[pfxId] = all_pbp.filter((pbp) => pbp.pfx_ab_id === pfxId)[0].at_bat_id)
		);
	}

	export function prepData(allPBP: AtBatDetails[]) {
		all_pbp = allPBP;
		createAtBatMap();
		createBatterAtBatMap();
		createPitcherAtBatMap();
		createInningAtBatMap();
		createOrderedAtBatMap();
		createPlayerTeamMap();
		inningSummaries = boxscore.inning_summaries;
		selectedAtBatId = orderedAtBatMap[1];
		atBatViewerReqeust = getPfxForAtBat();
	}

	export function viewAtBat(viewAtBatId: string) {
		selectedAtBatId = viewAtBatId;
		atBatViewerReqeust = getPfxForAtBat();
	}
</script>

<div id="top" class:not-shown={!shown} class="at-bat-viewer">
	<div class="at-bat-details">
		<AtBatContext bind:at_bat />
		<AtBatPitchSequence bind:at_bat />
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
	.at-bat-viewer {
		width: 100%;
	}

	.at-bat-details {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		text-align: left;
	}

	.not-shown {
		display: none;
	}
</style>
