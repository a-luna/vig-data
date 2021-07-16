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

<div id="rows-per-page" class="rows-per-page flex flex-row justify-end items-center my-1">
	<span class="text-xs italic mr-2">Rows/Page</span>
	<div class="flex flex-row">
		<button
			type="button"
			class:disabled={totalRows <= 0}
			class:active={pageSize === 5}
			title="5 Rows/Page"
			disabled={totalRows <= 0}
			on:click={() => changeSetting(5)}>5</button
		>
		<button
			type="button"
			class:disabled={totalRows <= 5}
			class:active={pageSize === 10}
			title="10 Rows/Page"
			disabled={totalRows <= 5}
			on:click={() => changeSetting(10)}>10</button
		>
		<button
			type="button"
			class:disabled={totalRows <= 10}
			class:active={pageSize === 15}
			title="15 Rows/Page"
			disabled={totalRows <= 10}
			on:click={() => changeSetting(15)}>15</button
		>
	</div>
</div>

<style lang="postcss">
	span {
		color: var(--sec-color);
		line-height: 1;
	}
	#rows-per-page button {
		width: 30px;
		height: 30px;
		font-size: 13px;
		padding: 0;
	}
</style>
