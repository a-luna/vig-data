<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	export let seasons: number[];
	let seasonSelected: number = 0;
	const dispatch = createEventDispatcher();

	$: careerSelected = seasonSelected === 0;

	function changeSeason(season: number) {
		seasonSelected = season;
		dispatch('changed', season);
	}

</script>

<div class="mb-5 btn-group">
	<button
		type="button"
		class={careerSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => changeSeason(0)}>Career</button
	>
	{#each seasons as year}
		<button
			type="button"
			class={seasonSelected == year ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => changeSeason(year)}>{year}</button
		>
	{/each}
</div>
