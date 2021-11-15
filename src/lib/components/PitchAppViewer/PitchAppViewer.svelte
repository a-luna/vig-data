<script lang="ts">
	import { getPitchFxForPitchApp } from '$lib/api/pitchfx';
	import type { ApiResponse, Boxscore, PitchFx } from '$lib/api/types';
	import PitchLocationChart from '$lib/components/Charts/PitchLocationChart.svelte';
	import PitchAppIdDropDown from '$lib/components/PitchAppViewer/PitchAppIdDropDown.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import { addStrikeZoneCornersToPfxData, identifyPfxDataBeyondBoundary } from '$lib/util/gameData';

	export let boxscore: Boxscore;
	let loading: boolean = false;
	let pfx: PitchFx[] = [];
	let getPfxForPitchAppRequest: Promise<ApiResponse<PitchFx[]>>;
	let chartContainer: HTMLElement;

	async function getPfxForPitchApp(pitchAppId: string) {
		loading = true;
		const result = await getPitchFxForPitchApp(pitchAppId);
		if (!result.success) {
			loading = false;
			return result;
		}
		pfx = addStrikeZoneCornersToPfxData(identifyPfxDataBeyondBoundary(result.value));
		loading = false;
		return result;
	}
</script>

<div class="flex flex-col charts flex-nowrap">
	<PitchAppIdDropDown
		bind:boxscore
		on:pitchAppSelected={(e) => (getPfxForPitchAppRequest = getPfxForPitchApp(e.detail))}
	/>
	<div id="pitch-app-viewer" class="flex-grow-0 pitch-location" bind:this={chartContainer}>
		{#if getPfxForPitchAppRequest}
			{#await getPfxForPitchAppRequest}
				<LoadingScreen bind:loading />
			{:then result}
				{#if result.success}
					<PitchLocationChart bind:pfx cssId={'pitch-app-viewer'} showPitchNumber={false} showToolTip={true} />
				{:else}
					<div class="error">Error: {result.message}</div>
				{/if}
			{:catch error}
				<div class="error">Error: {error.message}</div>
			{/await}
		{/if}
	</div>
</div>
