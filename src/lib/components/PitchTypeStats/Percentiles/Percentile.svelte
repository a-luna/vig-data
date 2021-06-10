<script lang="ts">
	import type { PitchType } from '$lib/api/types';
	import { useDarkTheme } from '$lib/stores/singleValueStores';

	export let stat: string;
	export let statValue: number;
	export let statPercentile: number;

	$: gaugeHue = 220 - statPercentile * 2.2;
	$: gaugeLight = $useDarkTheme ? 50 : 30;
	$: gaugeColor = `hsl(${gaugeHue}, 100%, ${gaugeLight}%)`;

	function formatStatValue() {
		if (stat === 'Avg. Speed') {
			return `${statValue.toFixed(1)}`;
		} else if (stat === 'OPS') {
			let ops = statValue.toFixed(3);
			return statValue > 1.0 ? ops : ops.toString().slice(1);
		} else {
			return `${(statValue * 100).toFixed(1)}%`;
		}
	}

</script>

<div class="flex flex-row flex-grow flex-nowrap">
	<div class="flex-grow-0 mr-1 stat-name">{stat}</div>
	<div class="flex flex-row flex-grow flex-nowrap">
		<div
			class="my-auto gauge"
			style="background-color: {gaugeColor}; width: {statPercentile.toFixed(0)}%"
		/>
		<div class="flex-grow-0 ml-1 text-left" style="color: {gaugeColor}">{statPercentile}</div>
	</div>
	<div class="flex-grow-0 ml-2 stat-value">{formatStatValue()}</div>
</div>

<style lang="postcss">
	.stat-name {
		width: 63px;
	}

	.stat-value {
		width: 37px;
	}

	.gauge {
		height: 10px;
	}

</style>
