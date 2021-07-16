<script lang="ts">
	export let backgroundColorRule: string;
	export let totalRows: number;
	export let pageSize: number = 5;
	export let currentPage: number = 1;
	export let startRow: number;
	export let endRow: number;
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';

	$: totalPages = Math.ceil(totalRows / pageSize);
	$: pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
	$: startRow = (currentPage - 1) * pageSize;
	$: endRow = Math.min(currentPage * pageSize, totalRows);
	$: rowType = totalRows === 1 ? rowTypeSingle : rowTypePlural;
	$: rowCountLast = getlastRowNumber(currentPage, pageSize, totalRows);

	function getlastRowNumber(current, size, total) {
		return current < totalPages ? current * size : total;
	}
</script>

<section
	id="modal-pagination"
	class="dt-pagination flex flex-row flex-nowrap justify-between"
	style={backgroundColorRule}
>
	<div class="flex flex-row flex-nowrap justify-start items-center">
		<aside class="dt-pagination-rowcount mr-2">
			Showing <b>{startRow + 1}</b> to <b>{rowCountLast}</b> of
			<b>{totalRows}</b>
			{rowType}
		</aside>
	</div>
	<section class="dt-pagination-buttons flex flex-row mx-1">
		<button
			class="text"
			class:disabled={currentPage === 1}
			disabled={currentPage === 1}
			title="First Page"
			on:click={() => (currentPage = 1)}>❬❬</button
		>
		<button
			class="text"
			class:disabled={currentPage === 1}
			disabled={currentPage === 1}
			title="Previous Page"
			on:click={() => (currentPage -= 1)}>❬</button
		>
		{#if totalPages <= 4}
			{#each pageNumbers as num}
				<button class:active={currentPage === num} on:click={() => (currentPage = num)}>{num}</button>
			{/each}
		{/if}
		<button
			class="text"
			class:disabled={currentPage === totalPages}
			disabled={currentPage === totalPages}
			title="Next Page"
			on:click={() => (currentPage += 1)}>❭</button
		>
		<button
			class="text"
			class:disabled={currentPage === totalPages}
			disabled={currentPage === totalPages}
			title="Last Page"
			on:click={() => (currentPage = totalPages)}>❭❭</button
		>
	</section>
</section>

<style lang="postcss">
	.dt-pagination-rowcount {
		color: var(--sec-color);
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
