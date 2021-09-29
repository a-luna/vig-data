<script lang="ts">
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { spring } from 'svelte/motion';

	export let stat: string;
	export let value: number;
	export let percentile: number;

	$: formattedValue = formatStatValue();
	$: formattedPercentile = percentile ? percentile : 0.0;
	$: gaugeHue = formattedPercentile * 1.1;
	$: gaugeLight = $siteTheme === 'dark' ? 50 : 25;
	$: gaugeColor = `hsl(${gaugeHue}, 100%, ${gaugeLight}%)`;
	$: updateGauge(formattedPercentile);

	const gaugeSpring = spring(formattedPercentile, { stiffness: 0.3, damping: 0.9 });

	function updateGauge(newPercentile: number) {
		gaugeSpring.update((_val) => (_val = newPercentile));
	}

	function formatStatValue(): string {
		if (stat === 'Speed' || stat == 'Exit-Vel') {
			return value ? `${value.toFixed(1)}` : '0';
		} else if (stat === 'OPS') {
			let ops = value ? value.toFixed(3) : '.000';
			return value ? (value > 1.0 ? ops : ops.toString().slice(1)) : '.000';
		} else {
			return value ? `${(value * 100).toFixed(1)}%` : '0%';
		}
	}
</script>

<div class="percentile-table-row">
	<div class="w-auto pr-2 percentile-body-cell">{stat}</div>
	<div class="w-auto pr-2 transition-colors percentile-body-cell" style="color: {gaugeColor}">{formattedValue}</div>
	<div class="percentile-body-cell">
		<div class="flex flex-row flex-grow flex-nowrap">
			<div
				class="my-auto transition-colors gauge"
				style="background-color: {gaugeColor}; width: {$gaugeSpring.toFixed(0)}%"
			/>
			<div class="flex-grow-0 ml-1 text-left transition-colors" style="color: {gaugeColor}">
				{formattedPercentile.toFixed(0)}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.percentile-table-row {
		font-size: 0.65rem;
		display: table-row;
	}

	.percentile-body-cell {
		display: table-cell;
	}
	.gauge {
		display: none;
	}

	.percentile-table-row .percentile-body-cell:last-child {
		width: auto;
	}

	@media screen and (min-width: 375px) {
		.percentile-table-row {
			font-size: 0.6rem;
		}
	}

	@media screen and (min-width: 450px) {
		.percentile-table-row {
			font-size: 0.9rem;
		}
	}

	@media screen and (min-width: 550px) {
		.gauge {
			display: block;
			height: 8px;
		}

		.percentile-table-row {
			font-size: 0.8rem;
		}

		.percentile-table-row .percentile-body-cell:last-child {
			width: 100%;
		}
	}

	@media screen and (min-width: 640px) {
		.percentile-table-row {
			font-size: 0.9rem;
		}
		.gauge {
			height: 8px;
		}
	}

	@media screen and (min-width: 768px) {
		.percentile-table-row {
			font-size: 1rem;
		}
		.gauge {
			height: 10px;
		}
	}
</style>
