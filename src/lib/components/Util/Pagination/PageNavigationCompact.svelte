<script lang="ts">
	import type { PaginationStore, ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	export let pagination: PaginationStore;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: $pagination.totalPages }, (_, i) => i + 1);
</script>

<section class="flex flex-row mx-1 btn-group btn-group-{color}">
	<button
		class="text btn-{color}"
		class:disabled={$pagination.currentPage === 1}
		disabled={$pagination.currentPage === 1}
		title="First Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => pagination.firstPage()}>❬❬</button
	>
	<button
		class="text btn-{color}"
		class:disabled={$pagination.currentPage === 1}
		disabled={$pagination.currentPage === 1}
		title="Previous Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => pagination.prevPage()}>❬</button
	>
	<button
		class="text btn-{color}"
		class:disabled={$pagination.currentPage === $pagination.totalPages}
		disabled={$pagination.currentPage === $pagination.totalPages}
		title="Next Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => pagination.nextPage()}>❭</button
	>
	<button
		class="text btn-{color}"
		class:disabled={$pagination.currentPage === $pagination.totalPages}
		disabled={$pagination.currentPage === $pagination.totalPages}
		title="Last Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => pagination.lastPage()}>❭❭</button
	>
</section>

<style lang="postcss">
	button.text {
		width: 30px;
		height: 30px;
		font-size: 14px;
		padding: 0;
	}
</style>
