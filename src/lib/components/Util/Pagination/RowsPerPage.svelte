<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let showRowsPerPage: boolean = false;
	export let pageSize: number = 5;
	export let totalRows: number = 0;
	const dispatch = createEventDispatcher();
	const options = { duration: 500, easing: cubicInOut };

	function changeSetting(newSetting: number) {
		pageSize = newSetting;
		dispatch('changed', pageSize);
	}
</script>

{#if showRowsPerPage}
	<div transition:slide={options} class="flex flex-row items-center justify-start mt-2 rows-per-page">
		<div class="flex flex-row">
			<button
				type="button"
				class="btn-secondary"
				class:disabled={totalRows <= 0}
				class:active={pageSize === 5}
				title="5 Rows/Page"
				disabled={totalRows <= 0}
				on:click={() => changeSetting(5)}>5</button
			>
			<button
				type="button"
				class="btn-secondary"
				class:disabled={totalRows <= 5}
				class:active={pageSize === 10}
				title="10 Rows/Page"
				disabled={totalRows <= 5}
				on:click={() => changeSetting(10)}>10</button
			>
			<button
				type="button"
				class="btn-secondary"
				class:disabled={totalRows <= 10}
				class:active={pageSize === 15}
				title="15 Rows/Page"
				disabled={totalRows <= 10}
				on:click={() => changeSetting(15)}>15</button
			>
		</div>
		<span class="ml-2 text-base">rows/page</span>
	</div>
{/if}

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
