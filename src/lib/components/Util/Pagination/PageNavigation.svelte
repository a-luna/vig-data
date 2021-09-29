<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let totalPages: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<section class="flex flex-row mx-1 dt-pagination-buttons">
	<button
		class="btn-secondary text"
		class:disabled={currentPage === 1}
		disabled={currentPage === 1}
		title="Previous Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage -= 1)}>Previous</button
	>
	{#each pageNumbers as num}
		<button
			class="btn-secondary"
			class:active={currentPage === num}
			on:click={() => dispatch('pageChanged')}
			on:click={() => (currentPage = num)}>{num}</button
		>
	{/each}
	<button
		class="btn-secondary text"
		class:disabled={currentPage === totalPages}
		disabled={currentPage === totalPages}
		title="Next Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage += 1)}>Next</button
	>
</section>

<style lang="postcss">
	button.text {
		width: 70px;
	}
</style>
