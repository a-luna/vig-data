<script lang="ts">
	import type { AtBatDetails as AtBatDetailsSchema, AtBatPitchDescription, PitchFx } from '$lib/api/types';
	import AtBatDetails from '$lib/components/AtBatViewer/AtBatDetails.svelte';
	import AtBatNavigation from '$lib/components/AtBatViewer/AtBatNavigation.svelte';
	import PitchLocationChart from '$lib/components/Charts/PitchLocationChart.svelte';
	import ErrorMessageModal from '$lib/components/Util/Modals/ErrorMessageModal.svelte';

	export let selectedAtBat: AtBatDetailsSchema;
	export let selectedAtBatPfx: PitchFx[];
	export let pitchSequence: AtBatPitchDescription[];
	export let goToPrevAtBatDisabled: boolean;
	export let goToNextAtBatDisabled: boolean;
	export let loading: boolean = false;
	let error: string = null;
</script>

{#if error}
	<ErrorMessageModal {error} />
{/if}

<div class="at-bat-viewer">
	<div class="flex flex-col justify-end at-bat-details-wrapper flex-nowrap">
		<AtBatDetails {loading} {selectedAtBat} {pitchSequence} />
		<AtBatNavigation
			color={'secondary'}
			bind:goToPrevAtBatDisabled
			bind:goToNextAtBatDisabled
			on:goToFirstAtBat
			on:goToNextAtBat
			on:goToPrevAtBat
			on:goToLastAtBat
		/>
	</div>
	<PitchLocationChart
		{loading}
		bind:pfx={selectedAtBatPfx}
		cssId={'at-bat-pitch-loc-chart'}
		showPitchNumber={true}
		showToolTip={true}
	/>
</div>

<style lang="postcss">
	.at-bat-details-wrapper {
		margin: 10px 5px;
		min-width: var(--ploc-chart-size);
	}

	.at-bat-viewer {
		@apply flex-grow-0 mx-auto text-sm w-full;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}

	@media screen and (min-width: 550px) {
		.at-bat-viewer {
			flex-flow: row nowrap;
			justify-content: space-around;
			align-items: flex-start;
			max-width: 670px;
		}
	}

	@media screen and (min-width: 1024px) {
		.at-bat-viewer {
			max-width: 775px;
		}
	}
</style>
