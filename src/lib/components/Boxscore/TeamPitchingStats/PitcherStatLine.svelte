<script lang="ts">
	import type { PitchStats } from '$lib/api/types';
	import OpenPlayerResultsModalButton from '$lib/components/Util/Buttons/OpenPlayerResultsModalButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let pitchStats: PitchStats;
	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-row flex-nowrap justify-end items-baseline">
	<span class="flex-grow-0 flex-shrink-0 mr-1">{pitchStats.stat_line}</span>
	<OpenPlayerResultsModalButton on:click={() => dispatch('viewPitcherInningTotalsClicked', pitchStats.mlb_id)} />
</div>
