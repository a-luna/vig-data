<script lang="ts">
	import type { PitchType } from '$lib/api/types';
	import Percentile from '$lib/components/PitchTypeStats/Percentiles/Percentile.svelte';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';

	export let percent: number;
	export let avg_exit_velocity: [number, number];
	export let avg_speed: [number, number];
	export let bad_whiff_rate: [number, number];
	export let barrel_rate: [number, number];
	export let contact_rate: [number, number];
	export let ground_ball_rate: [number, number];
	export let o_swing_rate: [number, number];
	export let ops: [number, number];
	export let pitch_type: PitchType;
	export let whiff_rate: [number, number];
	export let zone_rate: [number, number];

	$: formattedPercent = `${(percent * 100).toFixed(0)}%`;
</script>

<div class="responsive leading-snug">
	<div class="w-full percentile-table">
		<div class="percentile-table-body">
			<div class="text-center percentile-table-row h-8">
				<div class="text-center pitch-type-name" style="color: var(--pitch-type-{pitch_type})">
					{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitch_type]}
					{formattedPercent}
				</div>
				<div class="text-center pitch-type-abbrev" style="color: var(--pitch-type-{pitch_type})">
					{pitch_type}
					{formattedPercent}
				</div>
			</div>
		</div>
	</div>
	<div class="px-1 mx-auto percentile-table sm:py-1 sm:px-4">
		<div class="percentile-table-body">
			<Percentile stat={'Speed'} value={avg_speed[0]} percentile={avg_speed[1]} />
			<Percentile stat={'OPS'} value={ops[0]} percentile={ops[1]} />
			<Percentile stat={'Zone %'} value={zone_rate[0]} percentile={zone_rate[1]} />
			<Percentile stat={'O-SW %'} value={o_swing_rate[0]} percentile={o_swing_rate[1]} />
			<Percentile stat={'Whiff %'} value={whiff_rate[0]} percentile={whiff_rate[1]} />
			<Percentile stat={'Bad-Wf %'} value={bad_whiff_rate[0]} percentile={bad_whiff_rate[1]} />
			<Percentile stat={'Cont %'} value={contact_rate[0]} percentile={contact_rate[1]} />
			<Percentile stat={'GB %'} value={ground_ball_rate[0]} percentile={ground_ball_rate[1]} />
			<Percentile stat={'Barrel %'} value={barrel_rate[0]} percentile={barrel_rate[1]} />
			<Percentile stat={'Exit-Vel'} value={avg_exit_velocity[0]} percentile={avg_exit_velocity[1]} />
		</div>
	</div>
</div>

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
