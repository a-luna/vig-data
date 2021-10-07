<script lang="ts">
	import Percentiles from '$lib/components/Player/Pitching/Percentiles/Percentiles.svelte';
	import { pitchTypePercentilesByBatterStance, pitchTypesByBatterStance } from '$lib/stores/pfxPitcherMetrics';
</script>

<div class="responsive">
	<div class="flex flex-row justify-start overflow-x-auto flex-nowrap">
		<div class="flex flex-col justify-between pitch-type-percentiles flex-nowrap">
			<h4>Both</h4>
			{#each $pitchTypesByBatterStance.all as pitchType}
				<Percentiles {...$pitchTypePercentilesByBatterStance['all'][pitchType]} />
			{/each}
		</div>
		<div class="flex flex-col justify-between pitch-type-percentiles flex-nowrap">
			<h4>vsRHB</h4>
			{#each $pitchTypesByBatterStance.all as pitchType}
				{#if $pitchTypesByBatterStance.rhb.includes(pitchType)}
					<Percentiles {...$pitchTypePercentilesByBatterStance['rhb'][pitchType]} />
				{:else}
					<div class="flex-grow">&nbsp;</div>
				{/if}
			{/each}
		</div>
		<div class="flex flex-col justify-between pitch-type-percentiles flex-nowrap">
			<h4>vsLHB</h4>
			{#each $pitchTypesByBatterStance.all as pitchType}
				{#if $pitchTypesByBatterStance.lhb.includes(pitchType)}
					<Percentiles {...$pitchTypePercentilesByBatterStance['lhb'][pitchType]} />
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
		flex: 1 1 31%;
		max-width: 260px;
	}

	.pitch-type-percentiles > :global(div) {
		padding: 0 0 1rem;
	}

	.pitch-type-percentiles > :global(div:first-of-type) {
		padding: 0.75rem 0 1rem;
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
		font-size: 1.1rem;
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
