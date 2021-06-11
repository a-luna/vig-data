<script lang="ts">
	import type {
		CareerPfxPitchingMetricsWithPercentiles,
		CareerPfxPitchingMetricsWithPercentilesByYear,
		PfxPitchingMetrics,
		PitchType
	} from '$lib/api/types';
	import Percentiles from './Percentiles.svelte';
	import PlayerSeasonSelector from '../PlayerSeasonSelector.svelte';

	export let careerPfxData: CareerPfxPitchingMetricsWithPercentiles;
	export let careerPfxDataByYear: CareerPfxPitchingMetricsWithPercentilesByYear;
	export let seasons: number[];
	let seasonSelected: 'career' | number = 'career';
	let pitchTypeMetricsBoth: Record<PitchType, PfxPitchingMetrics>;
	let pitchTypeMetricsRhb: Record<PitchType, PfxPitchingMetrics>;
	let pitchTypeMetricsLhb: Record<PitchType, PfxPitchingMetrics>;
	let pitchTypesBoth: PitchType[];
	let pitchTypesLhb: PitchType[];
	let pitchTypesRhb: PitchType[];

	$: {
		if (seasonSelected === 'career') {
			pitchTypeMetricsBoth = careerPfxData['both']['metrics']['pitch_type_metrics'];
			pitchTypeMetricsRhb = careerPfxData['rhb']['metrics']['pitch_type_metrics'];
			pitchTypeMetricsLhb = careerPfxData['lhb']['metrics']['pitch_type_metrics'];
		} else {
			pitchTypeMetricsBoth =
				careerPfxDataByYear['both']['metrics'][seasonSelected]['pitch_type_metrics'];
			pitchTypeMetricsRhb =
				careerPfxDataByYear['rhb']['metrics'][seasonSelected]['pitch_type_metrics'];
			pitchTypeMetricsLhb =
				careerPfxDataByYear['lhb']['metrics'][seasonSelected]['pitch_type_metrics'];
		}

		let metrics = Object.values(pitchTypeMetricsBoth);
		metrics.sort((a, b) => b.percent - a.percent);
		pitchTypesBoth = metrics.map((m) => m.pitch_type);

		metrics = Object.values(pitchTypeMetricsRhb);
		metrics.sort((a, b) => b.percent - a.percent);
		pitchTypesRhb = metrics.map((m) => m.pitch_type);

		metrics = Object.values(pitchTypeMetricsLhb);
		metrics.sort((a, b) => b.percent - a.percent);
		pitchTypesLhb = metrics.map((m) => m.pitch_type);
	}

	function changePlayerDataShown(year: number) {
		seasonSelected = year === 0 ? 'career' : year;
	}

	function getPercentiles(batStance: 'both' | 'rhb' | 'lhb', pitchType: PitchType) {
		const pfxPercentiles =
			seasonSelected === 'career'
				? careerPfxData[batStance]['percentiles']
				: careerPfxDataByYear[batStance]['percentiles'][seasonSelected];
		const matches = pfxPercentiles.filter((perc) => perc.pitch_type === pitchType);
		return matches.length > 0 ? matches[0] : null;
	}

	function getPitchMetrics(batStance: 'both' | 'rhb' | 'lhb', pitchType: PitchType) {
		const pfxPitchMetrics =
			seasonSelected === 'career'
				? careerPfxData[batStance]['metrics']['pitch_type_metrics']
				: careerPfxDataByYear[batStance]['metrics'][seasonSelected]['pitch_type_metrics'];
		const matches = Object.values(pfxPitchMetrics).filter(
			(metrics) => metrics.pitch_type === pitchType
		);
		return matches.length > 0 ? matches[0] : null;
	}

</script>

<PlayerSeasonSelector {seasons} on:changed={(event) => changePlayerDataShown(event.detail)} />
<div class="responsive pt-3">
	<div class="flex flex-row justify-center flex-nowrap">
		<div class="flex flex-col justify-between pitch-type-percentiles flex-nowrap">
			<h4 class="text-base sm:text-large">Both</h4>
			{#each pitchTypesBoth as pitchType}
				<Percentiles
					pitchTypePercentiles={getPercentiles('both', pitchType)}
					percent={getPitchMetrics('both', pitchType).percent}
				/>
			{/each}
		</div>
		<div class="flex flex-col pitch-type-percentiles flex-nowrap">
			<h4 class="text-base sm:text-large">RHB</h4>
			{#each pitchTypesBoth as pitchType}
				{#if pitchTypesRhb.includes(pitchType)}
					<Percentiles
						pitchTypePercentiles={getPercentiles('rhb', pitchType)}
						percent={getPitchMetrics('rhb', pitchType).percent}
					/>
				{:else}
					<div class="flex-grow">&nbsp;</div>
				{/if}
			{/each}
		</div>
		<div class="flex flex-col pitch-type-percentiles flex-nowrap">
			<h4 class="text-base sm:text-large">LHB</h4>
			{#each pitchTypesBoth as pitchType}
				{#if pitchTypesLhb.includes(pitchType)}
					<Percentiles
						pitchTypePercentiles={getPercentiles('lhb', pitchType)}
						percent={getPitchMetrics('lhb', pitchType).percent}
					/>
				{:else}
					<div class="flex-grow">&nbsp;</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.pitch-type-percentiles {
		color: var(--pitch-type-percentiles-text-color);
		background-color: var(--pitch-type-percentiles-bg-color);
		border: none;
		flex: 1 1 33%;
		max-width: 260px;
	}

	.pitch-type-percentiles:first-child > :global(div) {
		border-left: 1px solid var(--pitch-type-percentiles-border-color);
	}

	.pitch-type-percentiles:last-child > :global(div) {
		border-right: 1px solid var(--pitch-type-percentiles-border-color);
	}

	.pitch-type-percentiles > :global(div:last-child) {
		border-bottom: 1px solid var(--pitch-type-percentiles-border-color);
	}

	.pitch-type-percentiles:first-child > :global(div:last-child) {
		border-bottom-left-radius: 4px;
	}

	.pitch-type-percentiles:first-child h4 {
		border-top-left-radius: 4px;
		border-left: 1px solid var(--pitch-type-percentiles-border-color);
	}

	.pitch-type-percentiles:last-child h4 {
		border-top-right-radius: 4px;
		border-right: 1px solid var(--pitch-type-percentiles-border-color);
	}

	.pitch-type-percentiles:last-child > :global(div:last-child) {
		border-bottom: 1px solid var(--pitch-type-percentiles-border-color);
		border-bottom-right-radius: 4px;
	}

	h4 {
		font-size: 1.2rem;
		text-align: center;
		margin: 0;
		padding: 5px 0;
		color: var(--table-col-header-color);
		background-color: var(--table-col-header-bg-color);
	}

	@media screen and (min-width: 640px) {
		h4 {
			font-size: 1.4rem;
		}
	}

	@media screen and (min-width: 768px) {
		h4 {
			font-size: 1.5rem;
			padding: 5px 0;
		}
	}

</style>
