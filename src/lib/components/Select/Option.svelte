<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | string;
	export let text: string;
	export let optionNumber: number;
	export let active: boolean = false;
	export let menuId: string;
	const dispatch = createEventDispatcher();

</script>

<a
	href="#"
	class="block px-4 py-2 text-sm"
	class:active
	data-value={value ? value : optionNumber}
	role="menuitem"
	tabindex="-1"
	id={menuId ? `${menuId}-option-${optionNumber}` : `option-${optionNumber}`}
	on:click={() => dispatch('click', optionNumber)}
>
	{text}
</a>

<style lang="postcss">
	a,
	a:hover {
		color: var(--select-text-color);
		text-decoration: none;
	}

	.active {
		background-color: var(--selected-item-bg-color);
	}

</style>
