<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { onMount } from 'svelte';
	import DefPositionSelector from './DefPositionSelector.svelte';

	export let color: ThemeColor = 'indigo';
	export let selectedBatSplit: 'all' | 'starters' | 'subs' | 'defpos' | 'batorder';
	export let selectedDefPosition: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	export let selectedLineupSpot: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	$: allSelected = selectedBatSplit === 'all';
	$: startersSelected = selectedBatSplit === 'starters';
	$: subsSelected = selectedBatSplit === 'subs';
	$: defposSelected = selectedBatSplit === 'defpos';
	$: batorderSelected = selectedBatSplit === 'batorder';

	onMount(() => (selectedBatSplit = 'all'));

</script>

<div class="flex flex-col flex-nowrap text-sm">
	<div class="btn-group mb-2">
		<button
			type="button"
			class={allSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedBatSplit = 'all')}>All</button
		>
		<button
			type="button"
			class={startersSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedBatSplit = 'starters')}>Starting Lineup</button
		>
		<button
			type="button"
			class={subsSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedBatSplit = 'subs')}>Bench</button
		>
		<button
			type="button"
			class={defposSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedBatSplit = 'defpos')}>Def. Position</button
		>
		<button
			type="button"
			class={batorderSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedBatSplit = 'batorder')}>Bat Order</button
		>
	</div>
	{#if defposSelected}
		<DefPositionSelector bind:selectedDefPosition />
	{/if}
</div>
