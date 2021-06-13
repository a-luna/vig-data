<script lang="ts">
	import type {
		AllCareerAndYearlyPfxData,
		PfxPitchingMetrics,
		PfxPitchTypePercentiles,
		PitchType
	} from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import type { BatterStance } from '$lib/types';
	import { onMount } from 'svelte';
	import Percentile from './Percentile.svelte';

	export let batterStance: BatterStance;
	export let pitchType: PitchType;
	export let combinedPfxCareerData: AllCareerAndYearlyPfxData;
	let percentiles: PfxPitchTypePercentiles = null;
	let metrics: PfxPitchingMetrics = null;
	let percent: string;
	let speed: number[];
	let ops: number[];
	let whiff: number[];
	let zone: number[];
	let contact: number[];
	let oswing: number[];

	onMount(() => ({ percentiles, metrics } = combinedPfxCareerData[batterStance][$playerSeason][pitchType]));

	$: {
		({ percentiles, metrics } = combinedPfxCareerData[batterStance][$playerSeason][pitchType]);
		percent = metrics !== null ? `${(metrics?.percent * 100).toFixed(0)}%` : '0%';
		speed = percentiles !== null ? [percentiles['avg_speed'][0], percentiles['avg_speed'][1]] : [0, 0];
		ops = percentiles !== null ? [percentiles['ops'][0], percentiles['ops'][1]] : [0, 0];
		whiff = percentiles !== null ? [percentiles['whiff_rate'][0], percentiles['whiff_rate'][1]] : [0, 0];
		zone = percentiles !== null ? [percentiles['zone_rate'][0], percentiles['zone_rate'][1]] : [0, 0];
		contact = percentiles !== null ? [percentiles['contact_rate'][0], percentiles['contact_rate'][1]] : [0, 0];
		oswing = percentiles !== null ? [percentiles['o_swing_rate'][0], percentiles['o_swing_rate'][1]] : [0, 0];
	}

</script>

{#if percentiles !== null}
	<div class="responsive pt-3">
		<div class="percentile-table w-full">
			<div class="percentile-table-body">
				<div class="percentile-table-row text-center">
					<div class="pitch-type-name font-bold text-center" style="color: var(--pitch-type-{pitchType})">
						{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchType]}
						{percent}
					</div>
					<div class="pitch-type-abbrev font-bold text-center" style="color: var(--pitch-type-{pitchType})">
						{pitchType}
						{percent}
					</div>
				</div>
			</div>
		</div>
		<div class="percentile-table px-2 sm:px-4 py-1 mx-auto">
			<div class="percentile-table-body">
				<Percentile stat={'Speed'} bind:value={speed} />
				<Percentile stat={'OPS'} bind:value={ops} />
				<Percentile stat={'Whiff %'} bind:value={whiff} />
				<Percentile stat={'Zone %'} bind:value={zone} />
				<Percentile stat={'Cont %'} bind:value={contact} />
				<Percentile stat={'O-SW %'} bind:value={oswing} />
			</div>
		</div>
	</div>
{:else}
	<div class="flex-grow">&nbsp;</div>
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
