<script lang="ts">
	import type { CareerPfxMetricsForPitcher, PitchType } from '$lib/api/types';
	import Percentile from '$lib/components/PitchTypeStats/Percentiles/Percentile.svelte';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { BatterStance } from '$lib/types';

	export let seasons: number[];
	export let batterStance: BatterStance;
	export let pitchType: PitchType;
	export let careerPfxData: CareerPfxMetricsForPitcher;
	let percentMap: Record<number, string> = {};
	let speedMap: Record<number, number[]> = {};
	let opsMap: Record<number, number[]> = {};
	let zoneMap: Record<number, number[]> = {};
	let oSwingMap: Record<number, number[]> = {};
	let whiffMap: Record<number, number[]> = {};
	let badWhiffMap: Record<number, number[]> = {};
	let contactMap: Record<number, number[]> = {};
	let gbRateMap: Record<number, number[]> = {};
	let barrelRateMap: Record<number, number[]> = {};
	let exitVeloMap: Record<number, number[]> = {};
	let initialized: boolean = false;
	let chartHeight: number;

	$: if (careerPfxData !== undefined) getValuesForAllPlayerSeasons();
	$: if (initialized) chartHeight = getChartHeight();

	function getValuesForAllPlayerSeasons() {
		seasons.map((year) => {
			if (careerPfxData[batterStance][year][pitchType] !== undefined) {
				speedMap[year] = [];
				opsMap[year] = [];
				zoneMap[year] = [];
				oSwingMap[year] = [];
				whiffMap[year] = [];
				badWhiffMap[year] = [];
				contactMap[year] = [];
				gbRateMap[year] = [];
				barrelRateMap[year] = [];
				exitVeloMap[year] = [];
				const { percentiles, metrics } = careerPfxData[batterStance][year][pitchType];
				percentMap[year] = metrics !== null ? `${(metrics.percent * 100).toFixed(0)}%` : '0%';
				speedMap[year] = percentiles !== null ? [percentiles['avg_speed'][0], percentiles['avg_speed'][1]] : [0, 0];
				opsMap[year] = percentiles !== null ? [percentiles['ops'][0], percentiles['ops'][1]] : [0, 0];
				zoneMap[year] = percentiles !== null ? [percentiles['zone_rate'][0], percentiles['zone_rate'][1]] : [0, 0];
				oSwingMap[year] =
					percentiles !== null ? [percentiles['o_swing_rate'][0], percentiles['o_swing_rate'][1]] : [0, 0];
				whiffMap[year] = percentiles !== null ? [percentiles['whiff_rate'][0], percentiles['whiff_rate'][1]] : [0, 0];
				badWhiffMap[year] =
					percentiles !== null ? [percentiles['bad_whiff_rate'][0], percentiles['bad_whiff_rate'][1]] : [0, 0];
				contactMap[year] =
					percentiles !== null ? [percentiles['contact_rate'][0], percentiles['contact_rate'][1]] : [0, 0];
				gbRateMap[year] =
					percentiles !== null ? [percentiles['ground_ball_rate'][0], percentiles['ground_ball_rate'][1]] : [0, 0];
				barrelRateMap[year] =
					percentiles !== null ? [percentiles['barrel_rate'][0], percentiles['barrel_rate'][1]] : [0, 0];
				exitVeloMap[year] =
					percentiles !== null ? [percentiles['avg_exit_velocity'][0], percentiles['avg_exit_velocity'][1]] : [0, 0];
				initialized = true;
			}
		});
	}

	function getChartHeight(): number {
		const chart: HTMLElement = document.querySelector('.batter-stance-all');
		return chart !== null ? chart.offsetHeight : 0;
	}
</script>

{#if percentMap[$playerSeason] !== undefined}
	<div class="responsive pt-3 leading-snug batter-stance-{batterStance}">
		<div class="w-full percentile-table">
			<div class="percentile-table-body">
				<div class="text-center percentile-table-row">
					<div class="text-center pitch-type-name" style="color: var(--pitch-type-{pitchType})">
						{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchType]}
						{percentMap[$playerSeason]}
					</div>
					<div class="text-center pitch-type-abbrev" style="color: var(--pitch-type-{pitchType})">
						{pitchType}
						{percentMap[$playerSeason]}
					</div>
				</div>
			</div>
		</div>
		<div class="px-1 mx-auto percentile-table sm:py-1 sm:px-4">
			<div class="percentile-table-body">
				<Percentile stat={'Speed'} bind:pfxStatsBySeason={speedMap} />
				<Percentile stat={'OPS'} bind:pfxStatsBySeason={opsMap} />
				<Percentile stat={'Zone %'} bind:pfxStatsBySeason={zoneMap} />
				<Percentile stat={'O-SW %'} bind:pfxStatsBySeason={oSwingMap} />
				<Percentile stat={'Whiff %'} bind:pfxStatsBySeason={whiffMap} />
				<Percentile stat={'Bad-Wf %'} bind:pfxStatsBySeason={badWhiffMap} />
				<Percentile stat={'Cont %'} bind:pfxStatsBySeason={contactMap} />
				<Percentile stat={'GB %'} bind:pfxStatsBySeason={gbRateMap} />
				<Percentile stat={'Barrel %'} bind:pfxStatsBySeason={barrelRateMap} />
				<Percentile stat={'Ex.Velo.'} bind:pfxStatsBySeason={exitVeloMap} />
			</div>
		</div>
	</div>
{:else}
	<div class="flex-grow placeholder" style="height: {chartHeight}">&nbsp;</div>
{/if}

<style lang="postcss">
	.percentile-table {
		display: table;
	}

	.percentile-table-body {
		display: table-row-group;
	}

	.percentile-table-row {
		display: table-row;
	}

	.pitch-type-abbrev {
		display: table-cell;
		font-size: 0.9rem;
	}

	.pitch-type-name {
		display: none;
	}

	@media screen and (min-width: 450px) {
		.pitch-type-abbrev {
			font-size: 1rem;
		}
	}

	@media screen and (min-width: 550px) {
		.pitch-type-abbrev {
			display: none;
		}

		.pitch-type-name {
			display: table-cell;
			font-size: 0.9rem;
		}
	}

	@media screen and (min-width: 640px) {
		.pitch-type-name {
			font-size: 1rem;
		}
	}

	@media screen and (min-width: 768px) {
		.pitch-type-name {
			font-size: 1.15rem;
		}
	}
</style>
