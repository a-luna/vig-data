<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let pageSize: number = 5;
	export let totalRows: number = 0;
	const dispatch = createEventDispatcher();

	function changeSetting(newSetting: number) {
		pageSize = newSetting;
		dispatch('changed', pageSize);
	}
</script>

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

<style lang="postcss">
	span {
		color: var(--sec-color);
		line-height: 1;
	}
	button {
		width: 24px;
		height: 23px;
		font-size: 11px;
		padding: 0;
	}
</style>
