<script lang="ts">
	import type { AllCareerAndYearlyPfxData, PitchType } from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { BatterStance } from '$lib/types';
	import { onMount } from 'svelte';
	import Percentile from './Percentile.svelte';

	export let seasons: number[];
	export let batterStance: BatterStance;
	export let pitchType: PitchType;
	export let combinedPfxCareerData: AllCareerAndYearlyPfxData;
	let percentMap: Record<number, string> = {};
	let speedMap: Record<number, number[]> = {};
	let opsMap: Record<number, number[]> = {};
	let whiffMap: Record<number, number[]> = {};
	let zoneMap: Record<number, number[]> = {};
	let contactMap: Record<number, number[]> = {};
	let oSwingMap: Record<number, number[]> = {};
	let initialized: boolean = false;
	let chartHeight: number;

	onMount(() => getValuesForAllPlayerSeasons());

	function getValuesForAllPlayerSeasons() {
		seasons.map((year) => {
			const { percentiles, metrics } = combinedPfxCareerData[batterStance][year][pitchType];
			speedMap[year] = [];
			opsMap[year] = [];
			whiffMap[year] = [];
			zoneMap[year] = [];
			contactMap[year] = [];
			oSwingMap[year] = [];
			percentMap[year] = metrics !== null ? `${(metrics.percent * 100).toFixed(0)}%` : '0%';
			speedMap[year] = percentiles !== null ? [percentiles['avg_speed'][0], percentiles['avg_speed'][1]] : [0, 0];
			opsMap[year] = percentiles !== null ? [percentiles['ops'][0], percentiles['ops'][1]] : [0, 0];
			whiffMap[year] = percentiles !== null ? [percentiles['whiff_rate'][0], percentiles['whiff_rate'][1]] : [0, 0];
			zoneMap[year] = percentiles !== null ? [percentiles['zone_rate'][0], percentiles['zone_rate'][1]] : [0, 0];
			contactMap[year] =
				percentiles !== null ? [percentiles['contact_rate'][0], percentiles['contact_rate'][1]] : [0, 0];
			oSwingMap[year] =
				percentiles !== null ? [percentiles['o_swing_rate'][0], percentiles['o_swing_rate'][1]] : [0, 0];
			initialized = true;
		});
	}

	function getChartHeight(): number {
		const chart: HTMLElement = document.querySelector('.batter-stance-both');
		return chart !== null ? chart.offsetHeight : 0;
	}

	$: if (initialized) chartHeight = getChartHeight();

</script>

{#if percentMap[$playerSeason] !== '0%'}
	<div class="responsive pt-3 leading-snug batter-stance-{batterStance}">
		<div class="percentile-table w-full">
			<div class="percentile-table-body">
				<div class="percentile-table-row text-center">
					<div class="pitch-type-name text-center" style="color: var(--pitch-type-{pitchType})">
						{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchType]}
						{percentMap[$playerSeason]}
					</div>
					<div class="pitch-type-abbrev text-center" style="color: var(--pitch-type-{pitchType})">
						{pitchType}
						{percentMap[$playerSeason]}
					</div>
				</div>
			</div>
		</div>
		<div class="percentile-table px-2 sm:px-4 py-1 mx-auto">
			<div class="percentile-table-body">
				<Percentile stat={'Speed'} bind:pfxStatsBySeason={speedMap} />
				<Percentile stat={'OPS'} bind:pfxStatsBySeason={opsMap} />
				<Percentile stat={'Whiff %'} bind:pfxStatsBySeason={whiffMap} />
				<Percentile stat={'Zone %'} bind:pfxStatsBySeason={zoneMap} />
				<Percentile stat={'Cont %'} bind:pfxStatsBySeason={contactMap} />
				<Percentile stat={'O-SW %'} bind:pfxStatsBySeason={oSwingMap} />
			</div>
		</div>
	</div>
{:else}
	<div class="placeholder flex-grow" style="height: {chartHeight}">&nbsp;</div>
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
