<script lang="ts">
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { PaginationStore } from '$lib/types';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';

	export let showPageSizeSetting: boolean = false;
	export let pagination: PaginationStore;
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';
	export let alwaysUseCompact: boolean = false;

	$: rowType = $pagination.totalRows === 1 ? rowTypeSingle : rowTypePlural;
	$: rowsPerPageFontSize = $pageBreakPoints.isDefault ? '0.9rem' : $pageBreakPoints.width < 1024 ? '1rem' : '1.05rem';
</script>

<div
	class="flex flex-row items-center justify-start gap-1 leading-none flex-nowrap cursor-pointer pagination-rowcount"
	on:click
>
	<div class="block mb-0.5 stroke-current stroke-2 w-5 h-4" title="Click to change # of rows displayed per page">
		<MdSettings />
	</div>
	<aside title="Click to change # of rows displayed per page" style="font-size: {rowsPerPageFontSize}">
		<div class="inline-block">
			{#if alwaysUseCompact || $pageBreakPoints.isMobileDisplay}
				<b>{$pagination.startRow + 1}-{$pagination.endRow}/{$pagination.totalRows}</b>
			{:else}
				Showing <b>{$pagination.startRow + 1}</b> to <b>{$pagination.endRow}</b> of <b>{$pagination.totalRows}</b>
				{rowType}
			{/if}
		</div>
	</aside>
</div>

<style lang="postcss">
	.pagination-rowcount {
		color: var(--sec-color);
	}
</style>
