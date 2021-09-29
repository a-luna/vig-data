<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let totalPages: number;
	export let currentPage: number;
	const dispatch = createEventDispatcher();

	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<section class="flex flex-row mx-1 dt-pagination-buttons">
	<button
		class="text btn-secondary"
		class:disabled={currentPage === 1}
		disabled={currentPage === 1}
		title="First Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage = 1)}>❬❬</button
	>
	<button
		class="text btn-secondary"
		class:disabled={currentPage === 1}
		disabled={currentPage === 1}
		title="Previous Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage -= 1)}>❬</button
	>
	<button
		class="text btn-secondary"
		class:disabled={currentPage === totalPages}
		disabled={currentPage === totalPages}
		title="Next Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage += 1)}>❭</button
	>
	<button
		class="text btn-secondary"
		class:disabled={currentPage === totalPages}
		disabled={currentPage === totalPages}
		title="Last Page"
		on:click={() => dispatch('pageChanged')}
		on:click={() => (currentPage = totalPages)}>❭❭</button
	>
</section>

<style lang="postcss">
	button.text {
		width: 23px;
		height: 23px;
		font-size: 12px;
		padding: 0;
	}

	@media screen and (min-width: 640px) {
		button.text {
			width: 30px;
			height: 30px;
			font-size: 13px;
			padding: 0;
		}
	}
</style>
