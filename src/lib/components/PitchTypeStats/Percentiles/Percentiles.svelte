<script lang="ts">
	import type { PfxPitchTypePercentiles } from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import Percentile from './Percentile.svelte';
	import MdLens from 'svelte-icons/md/MdLens.svelte';

	export let pitchTypePercentiles: PfxPitchTypePercentiles;
	export let percent: number;

</script>

{#if pitchTypePercentiles}
	<div class="responsive pt-3">
		<div class="percentile-table w-full">
			<div class="percentile-table-body">
				<div class="percentile-table-row text-center">
					<div
						class="pitch-type-name font-bold text-center"
						style="color: var(--pitch-type-{pitchTypePercentiles['pitch_type']})"
					>
						{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchTypePercentiles['pitch_type']]}
						{(percent * 100).toFixed(0)}%
					</div>
					<div
						class="pitch-type-abbrev font-bold text-center"
						style="color: var(--pitch-type-{pitchTypePercentiles['pitch_type']})"
					>
						{pitchTypePercentiles['pitch_type']}
						{(percent * 100).toFixed(0)}%
					</div>
				</div>
			</div>
		</div>
		<div class="percentile-table px-2 sm:px-4 py-1 mx-auto">
			<div class="percentile-table-body">
				<Percentile
					stat={'Speed'}
					statValue={pitchTypePercentiles['avg_speed'][0]}
					statPercentile={pitchTypePercentiles['avg_speed'][1]}
				/>
				<Percentile
					stat={'OPS'}
					statValue={pitchTypePercentiles['ops'][0]}
					statPercentile={pitchTypePercentiles['ops'][1]}
				/>
				<Percentile
					stat={'Whiff %'}
					statValue={pitchTypePercentiles['whiff_rate'][0]}
					statPercentile={pitchTypePercentiles['whiff_rate'][1]}
				/>
				<Percentile
					stat={'Zone %'}
					statValue={pitchTypePercentiles['zone_rate'][0]}
					statPercentile={pitchTypePercentiles['zone_rate'][1]}
				/>
				<Percentile
					stat={'Cont %'}
					statValue={pitchTypePercentiles['contact_rate'][0]}
					statPercentile={pitchTypePercentiles['contact_rate'][1]}
				/>
				<Percentile
					stat={'O-SW %'}
					statValue={pitchTypePercentiles['o_swing_rate'][0]}
					statPercentile={pitchTypePercentiles['o_swing_rate'][1]}
				/>
			</div>
		</div>
	</div>
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
