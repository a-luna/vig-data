<script lang="ts">
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { PaginationStore, ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ThemeColor = 'secondary';
	export let pagination: PaginationStore;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: $pagination.totalPages }, (_, i) => i + 1);
	$: fontSize = $pageBreakPoints.width < 1024 ? '0.9rem' : '0.95rem';

	function handleClick(page: number) {
		if ($pagination.currentPage !== page) {
			pagination.changeCurrentPage(page);
			dispatch('pageChanged');
		}
	}
</script>

<section class="flex flex-row mx-1 btn-group btn-group-{color}">
	<button
		class="btn btn-{color} text"
		class:disabled={$pagination.currentPage === 1}
		disabled={$pagination.currentPage === 1}
		title="Previous Page"
		style="font-size: {fontSize};"
		on:click={() => dispatch('pageChanged')}
		on:click={() => pagination.prevPage()}
		>Previous
	</button>
	{#each pageNumbers as page}
		<button
			class="btn btn-{color} number"
			style="font-size: {fontSize};"
			class:active={$pagination.currentPage === page}
			on:click={() => handleClick(page)}
			>{page}
		</button>
	{/each}
	<button
		class="btn btn-{color} text"
		class:disabled={$pagination.currentPage === $pagination.totalPages}
		disabled={$pagination.currentPage === $pagination.totalPages}
		title="Next Page"
		style="font-size: {fontSize};"
		on:click={() => dispatch('pageChanged')}
		on:click={() => pagination.nextPage()}>Next</button
	>
</section>

<style lang="postcss">
	button.text {
		width: 75px;
		height: 30px;
	}
	button.number {
		width: 30px;
		height: 30px;
	}
	@media screen and (min-width: 1024px) {
		button.text {
			width: 85px;
			height: 35px;
		}
		button.number {
			width: 35px;
			height: 35px;
		}
	}
</style>
