<script lang="ts">
	import PageNavigation from '$lib/components/Util/Pagination/PageNavigation.svelte';
	import PageNavigationCompact from '$lib/components/Util/Pagination/PageNavigationCompact.svelte';
	import PageRangeDescription from '$lib/components/Util/Pagination/PageRangeDescription.svelte';
	import PageSizeSetting from '$lib/components/Util/Pagination/PageSizeSetting.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { PaginationStore, ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';
	export let backgroundColorRule: string = '';
	export let pagination: PaginationStore;
	export let alwaysUseCompact: boolean = true;
	export let rowTypeSingle: string = 'entry';
	export let rowTypePlural: string = 'entries';
	let showPageSizeSetting: boolean = false;
</script>

<section class="flex flex-col justify-start" style={backgroundColorRule}>
	<div class="flex flex-row justify-between dt-pagination flex-nowrap">
		<PageRangeDescription
			{pagination}
			{alwaysUseCompact}
			{rowTypeSingle}
			{rowTypePlural}
			on:click={() => (showPageSizeSetting = !showPageSizeSetting)}
		/>
		{#if alwaysUseCompact || $pageBreakPoints.isMobileDisplay || $pagination.totalPages > 4}
			<PageNavigationCompact {pagination} />
		{:else}
			<PageNavigation {pagination} />
		{/if}
	</div>
	{#if showPageSizeSetting}
		<PageSizeSetting {color} {pagination} on:pageSizeChanged={() => (showPageSizeSetting = false)} />
	{/if}
</section>
