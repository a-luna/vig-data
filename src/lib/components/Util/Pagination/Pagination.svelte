<script lang="ts">
	import RowsPerPage from '$lib/components/Util/Pagination/RowsPerPage.svelte';
	import { createEventDispatcher } from 'svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let backgroundColorRule: string = '';
	export let totalRows: number;
	export let pageSize: number = 5;
	export let currentPage: number = 1;
	export let startRow: number;
	export let endRow: number;
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';
	let showRowsPerPage: boolean = false;
	const dispatch = createEventDispatcher();
	const options = { duration: 500, easing: cubicInOut };

	$: totalPages = Math.ceil(totalRows / pageSize);
	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
	$: startRow = (currentPage - 1) * pageSize;
	$: endRow = Math.min(currentPage * pageSize, totalRows);
	$: rowType = totalRows === 1 ? rowTypeSingle : rowTypePlural;
	$: rowCountLast = getlastRowNumber(currentPage, pageSize, totalRows);

	function getlastRowNumber(current, size, total) {
		return current < totalPages ? current * size : total;
	}

	function handlePageSizeChanged() {
		currentPage = 1;
		showRowsPerPage = false;
	}
</script>

<section id="modal-pagination" class="flex flex-col justify-start mt-3" style={backgroundColorRule}>
	<div class="flex flex-row justify-between dt-pagination flex-nowrap">
		<div class="flex flex-col justify-center items-start sm:items-center">
			<div class="flex flex-row items-center justify-start flex-nowrap leading-none">
				<div
					class="dt-pagination-rowcount block mx-1 my-auto sm:w-5 sm:h-4 w-4 h-3 cursor-pointer stroke-current stroke-2"
					title="Click to change # of rows displayed per page"
					on:click={() => (showRowsPerPage = true)}
				>
					<MdSettings />
				</div>
				<aside
					class="dt-pagination-rowcount cursor-pointer text-base"
					title="Click to change # of rows displayed per page"
					on:click={() => (showRowsPerPage = true)}
				>
					<div class="hidden sm:inline-block">
						Showing <b>{startRow + 1}</b> to <b>{rowCountLast}</b> of <b>{totalRows}</b>
						{rowType}
					</div>
					<div class="inline-block sm:hidden">
						<b>{startRow + 1}-{rowCountLast}/{totalRows}</b>
					</div>
				</aside>
			</div>
			{#if showRowsPerPage}
				<div
					transition:slide={options}
					id="rows-per-page"
					class="flex flex-row items-center justify-start mt-2 rows-per-page"
				>
					<RowsPerPage bind:totalRows bind:pageSize on:changed={() => handlePageSizeChanged()} />
				</div>
			{/if}
		</div>
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
			{#if totalPages <= 4}
				{#each pageNumbers as num}
					<button
						class="btn-secondary hidden sm:block"
						class:active={currentPage === num}
						on:click={() => dispatch('pageChanged')}
						on:click={() => (currentPage = num)}>{num}</button
					>
				{/each}
			{/if}
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
	</div>
</section>

<style lang="postcss">
	.dt-pagination-rowcount {
		color: var(--sec-color);
		line-height: inherit;
	}

	#modal-pagination button {
		width: 25px;
		height: 30px;
		font-size: 13px;
		padding: 0;
	}

	#modal-pagination button.text {
		width: 30px;
		height: 30px;
		font-size: 13px;
		padding: 0;
	}
</style>
