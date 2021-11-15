<script lang="ts">
	import type { AtBatDetails, AtBatPitchDescription } from '$lib/api/types';
	import AtBatContext from '$lib/components/AtBatViewer/AtBatContext.svelte';
	import AtBatDetailsPlaceholder from '$lib/components/AtBatViewer/AtBatDetailsPlaceholder.svelte';
	import AtBatPitchSequence from '$lib/components/AtBatViewer/AtBatPitchSequence.svelte';

	export let loading: boolean = false;
	export let selectedAtBat: AtBatDetails;
	export let pitchSequence: AtBatPitchDescription[];
</script>

{#if loading}
	<AtBatDetailsPlaceholder />
{:else}
	<div class="flex flex-col">
		<AtBatContext {selectedAtBat} />
		<div class="flex-grow-0 at-bat-details">
			<AtBatPitchSequence {pitchSequence} {selectedAtBat} />
		</div>
	</div>
{/if}

<style lang="postcss">
	.at-bat-details {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		flex: 1 0 auto;
		max-height: max-content;
		text-align: left;
		border-radius: 4px;
	}

	@media screen and (min-width: 550px) {
		.at-bat-details {
			flex: 1 0 calc(var(--ploc-chart-size) - 105px);
			max-height: calc(var(--ploc-chart-size) - 105px);
		}
	}

	@media screen and (min-width: 1024px) {
		.at-bat-details {
			flex: 1 0 calc(var(--ploc-chart-size) - 115px);
			max-height: calc(var(--ploc-chart-size) - 115px);
		}
	}
</style>
