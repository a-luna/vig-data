<script lang="ts">
	import type { PaginationStore, ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let color: ThemeColor = 'secondary';
	export let pagination: PaginationStore;
	const dispatch = createEventDispatcher();
	const options = { duration: 500, easing: cubicInOut };

	function changeSetting(newSetting: number) {
		pagination.changePageSize(newSetting);
		dispatch('pageSizeChanged');
	}
</script>

<div transition:slide={options} class="flex flex-row items-center justify-start mt-2 rows-per-page">
	<div class="flex flex-row btn-group btn-group-{color}">
		<button
			type="button"
			class="btn-{color}"
			class:disabled={$pagination.totalRows <= 0}
			class:active={$pagination.pageSize === 5}
			title="5 Rows/Page"
			disabled={$pagination.totalRows <= 0}
			on:click={() => changeSetting(5)}>5</button
		>
		<button
			type="button"
			class="btn-{color}"
			class:disabled={$pagination.totalRows <= 5}
			class:active={$pagination.pageSize === 10}
			title="10 Rows/Page"
			disabled={$pagination.totalRows <= 5}
			on:click={() => changeSetting(10)}>10</button
		>
		<button
			type="button"
			class="btn-{color}"
			class:disabled={$pagination.totalRows <= 10}
			class:active={$pagination.pageSize === 15}
			title="15 Rows/Page"
			disabled={$pagination.totalRows <= 10}
			on:click={() => changeSetting(15)}>15</button
		>
	</div>
	<span class="ml-2 text-base">rows/page</span>
</div>

<style lang="postcss">
	span {
		color: var(--sec-color);
		line-height: 1;
	}
	button,
	:global(#home) button {
		width: 24px;
		height: 23px;
		font-size: 11px;
		padding: 0;
	}
</style>
