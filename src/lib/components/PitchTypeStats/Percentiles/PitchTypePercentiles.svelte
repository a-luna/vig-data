<script lang="ts">
	import type { AllCareerAndYearlyPfxData, PitchType } from '$lib/api/types';
	import { playerSeason } from '$lib/stores/singleValueStores';
	import Percentiles from './Percentiles.svelte';

	export let seasons: number[];
	export let allPitchTypes: PitchType[];
	export let allCombinedPfxData: AllCareerAndYearlyPfxData;

	function getPitchTypes(stance: 'both' | 'rhb' | 'lhb'): PitchType[] {
		return Object.keys(allCombinedPfxData[stance][$playerSeason]) as PitchType[];
	}

</script>

<div class="responsive pt-3">
	<div class="flex flex-row justify-center flex-nowrap">
		<div class="flex flex-col justify-between pitch-type-percentiles flex-nowrap">
			<h4 class="text-base sm:text-large">Both</h4>
			{#each allPitchTypes as pitchType}
				<Percentiles {pitchType} combinedPfxCareerData={allCombinedPfxData} batterStance={'both'} />
			{/each}
		</div>
		<div class="flex flex-col pitch-type-percentiles flex-nowrap">
			<h4 class="text-base sm:text-large">RHB</h4>
			{#each allPitchTypes as pitchType}
				{#if getPitchTypes('rhb').includes(pitchType)}
					<Percentiles {pitchType} combinedPfxCareerData={allCombinedPfxData} batterStance={'rhb'} />
				{:else}
					<div class="flex-grow">&nbsp;</div>
				{/if}
			{/each}
		</div>
		<div class="flex flex-col pitch-type-percentiles flex-nowrap">
			<h4 class="text-base sm:text-large">LHB</h4>
			{#each allPitchTypes as pitchType}
				{#if getPitchTypes('lhb').includes(pitchType)}
					<Percentiles {pitchType} combinedPfxCareerData={allCombinedPfxData} batterStance={'lhb'} />
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
