<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | string;
	export let text: string;
	export let optionNumber: number;
	export let active: boolean = false;
	export let menuId: string;
	const dispatch = createEventDispatcher();
</script>

<div
	class="block px-4 py-2 text-sm cursor-pointer"
	class:active
	data-value={value ? value : optionNumber}
	role="menuitem"
	tabindex="-1"
	id={menuId ? `${menuId}-option-${optionNumber}` : `option-${optionNumber}`}
	on:click={() => dispatch('click', optionNumber)}
>
	{text}
</div>

<style lang="postcss">
	div {
		color: var(--select-text-color);
	}

	.active {
		background-color: var(--selected-item-bg-color);
	}
</style>
