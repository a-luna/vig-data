<script lang="ts">
	import type { BatStats } from '$lib/api/types';
	import OpenPlayerResultsModalButton from '$lib/components/Util/Buttons/OpenPlayerResultsModalButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let batStats: BatStats;
	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-row flex-nowrap justify-end items-baseline">
	<span class="flex-grow-0 flex-shrink-0 mr-1">{batStats.stat_line}</span>
	<OpenPlayerResultsModalButton on:click={() => dispatch('viewAtBatResultsClicked', batStats.mlb_id)} />
</div>
