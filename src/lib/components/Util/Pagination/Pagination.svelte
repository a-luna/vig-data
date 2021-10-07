<script lang="ts">
	import PageNavigation from '$lib/components/Util/Pagination/PageNavigation.svelte';
	import PageNavigationCompact from '$lib/components/Util/Pagination/PageNavigationCompact.svelte';
	import RowsPerPage from '$lib/components/Util/Pagination/RowsPerPage.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	export let backgroundColorRule: string = '';
	export let totalRows: number;
	export let pageSize: number = 5;
	export let currentPage: number = 1;
	export let startRow: number;
	export let endRow: number;
	export let compactPageNav: boolean = true;
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';
	let showRowsPerPage: boolean = false;

	$: totalPages = Math.ceil(totalRows / pageSize);
	$: startRow = (currentPage - 1) * pageSize;
	$: endRow = Math.min(currentPage * pageSize, totalRows);
	$: rowType = totalRows === 1 ? rowTypeSingle : rowTypePlural;
	$: rowCountLast = getlastRowNumber(currentPage, pageSize, totalRows);
	$: mobileDisplay = $pageBreakPoints.isDefault || $pageBreakPoints.isSmall;

	function getlastRowNumber(current, size, total) {
		return current < totalPages ? current * size : total;
	}

	function handlePageSizeChanged() {
		currentPage = 1;
		showRowsPerPage = false;
	}
</script>

<section class="flex flex-col justify-start" style={backgroundColorRule}>
	<div class="flex flex-row justify-between dt-pagination flex-nowrap">
		<div class="flex flex-col items-start justify-start sm:items-center">
			<div class="flex flex-row gap-1 items-center justify-start flex-nowrap pagination-rowcount leading-none">
				<div
					class="block mb-0.5 cursor-pointer stroke-current stroke-2 w-5 h-4"
					title="Click to change # of rows displayed per page"
					on:click={() => (showRowsPerPage = !showRowsPerPage)}
				>
					<MdSettings />
				</div>
				<aside
					class="cursor-pointer"
					title="Click to change # of rows displayed per page"
					on:click={() => (showRowsPerPage = !showRowsPerPage)}
				>
					<div class="hidden md:inline-block md:text-base lg:text-lg">
						Showing <b>{startRow + 1}</b> to <b>{rowCountLast}</b> of <b>{totalRows}</b>
						{rowType}
					</div>
					<div class="inline-block md:hidden text-sm sm:text-base ">
						<b>{startRow + 1}-{rowCountLast}/{totalRows}</b>
					</div>
				</aside>
			</div>
			<RowsPerPage bind:showRowsPerPage bind:totalRows bind:pageSize on:changed={() => handlePageSizeChanged()} />
		</div>
		{#if compactPageNav || mobileDisplay || totalPages > 4}
			<PageNavigationCompact bind:totalPages bind:currentPage on:pageChanged />
		{:else}
			<PageNavigation bind:totalPages bind:currentPage on:pageChanged />
		{/if}
	</div>
</section>

<style lang="postcss">
	.pagination-rowcount {
		color: var(--sec-color);
	}
</style>
