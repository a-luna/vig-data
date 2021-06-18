<script lang="ts">
	import { playerSeason, useDarkTheme } from '$lib/stores/singleValueStores';
	import { spring } from 'svelte/motion';

	export let stat: string;
	export let pfxStatsBySeason: Record<number, number[]>;

	$: statValue = formatStatValue(pfxStatsBySeason[$playerSeason]);
	$: statPercentile = getStatPercentile(pfxStatsBySeason[$playerSeason]);
	$: gaugeHue = 220 - statPercentile * 2.2;
	$: gaugeLight = $useDarkTheme ? 50 : 30;
	$: gaugeColor = `hsl(${gaugeHue}, 100%, ${gaugeLight}%)`;
	$: updateGauge(statPercentile);

	const gaugeSpring = spring(statPercentile, { stiffness: 0.3, damping: 0.9 });

	function updateGauge(newPercentile: number) {
		gaugeSpring.update((_val) => (_val = newPercentile));
	}

	function formatStatValue(valueMap: number[]): string {
		if (valueMap !== undefined) {
			const value = valueMap[0];
			if (value !== undefined) {
				if (stat === 'Speed') {
					return `${value.toFixed(1)}`;
				} else if (stat === 'OPS') {
					let ops = value.toFixed(3);
					return value > 1.0 ? ops : ops.toString().slice(1);
				} else {
					return `${(value * 100).toFixed(1)}%`;
				}
			}
		} else {
			return '';
		}
	}

	function getStatPercentile(valueMap: number[]): number {
		return valueMap !== undefined ? valueMap[1] : 0.0;
	}

</script>

<div class="percentile-table-row">
	<div class="w-auto pr-2 percentile-body-cell">{stat}</div>
	<div class="w-auto pr-2 transition-colors percentile-body-cell" style="color: {gaugeColor}">{statValue}</div>
	<div class="percentile-body-cell">
		<div class="flex flex-row flex-grow flex-nowrap">
			<div
				class="my-auto transition-colors gauge"
				style="background-color: {gaugeColor}; width: {$gaugeSpring.toFixed(0)}%"
			/>
			<div class="flex-grow-0 ml-1 text-left transition-colors" style="color: {gaugeColor}">{statPercentile}</div>
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
			font-size: 0.8rem;
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
