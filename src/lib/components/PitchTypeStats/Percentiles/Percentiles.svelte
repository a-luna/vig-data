<script lang="ts">
	import type { PfxPitchTypePercentiles } from '$lib/api/types';
	import { PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
	import Percentile from './Percentile.svelte';
	import MdLens from 'svelte-icons/md/MdLens.svelte';

	export let pitchTypePercentiles: PfxPitchTypePercentiles;
	export let percent: number;

</script>

{#if pitchTypePercentiles}
	<div class="flex flex-col px-3 py-2 percentile-wrapper flex-nowrap">
		<div
			class="mb-2 text-base font-bold text-center pitch-type"
			style="color: var(--pitch-type-{pitchTypePercentiles['pitch_type']})"
		>
			{PITCH_TYPE_ABBREV_TO_NAME_MAP[pitchTypePercentiles['pitch_type']]}
			{(percent * 100).toFixed(0)}%
		</div>
		<Percentile
			stat={'Avg. Speed'}
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
			stat={'Contact %'}
			statValue={pitchTypePercentiles['contact_rate'][0]}
			statPercentile={pitchTypePercentiles['contact_rate'][1]}
		/>
		<Percentile
			stat={'O-Swing %'}
			statValue={pitchTypePercentiles['o_swing_rate'][0]}
			statPercentile={pitchTypePercentiles['o_swing_rate'][1]}
		/>
	</div>
{/if}

<style lang="postcss">
	.percentile-wrapper {
		border-top: 1px solid var(--table-inner-border-hoiz-color);
	}

	.icon {
		height: 8px;
		width: 8px;
	}

</style>
