<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	export let totalPages: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<section class="flex flex-row mx-1 btn-group btn-group-{color}">
	<button
		class="btn btn-{color} text"
		class:disabled={currentPage === 1}
		disabled={currentPage === 1}
		title="Previous Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage -= 1)}>Previous</button
	>
	{#each pageNumbers as num}
		<button
			class="btn btn-{color}"
			class:active={currentPage === num}
			on:click={() => dispatch('pageChanged')}
			on:click={() => (currentPage = num)}>{num}</button
		>
	{/each}
	<button
		class="btn btn-{color} text"
		class:disabled={currentPage === totalPages}
		disabled={currentPage === totalPages}
		title="Next Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage += 1)}>Next</button
	>
</section>

<style lang="postcss">
	button.text {
		width: 75px;
	}
</style>
