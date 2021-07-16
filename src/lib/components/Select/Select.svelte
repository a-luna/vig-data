<script lang="ts">
	import Option from '$lib/components/Select/Option.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { clickOutside } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import MdArrowDropDown from 'svelte-icons/md/MdArrowDropDown.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let menuLabel: string = 'Options';
	export let options: SelectMenuOption[];
	export let width: string = 'auto';
	export let menuId: string = '';
	let selectedOption: SelectMenuOption;
	let dropdownShown: boolean = false;
	const dispatch = createEventDispatcher();

	function handleOptionClicked(selectedOptionNumber: number) {
		options.map((menuOption) => (menuOption.active = false));
		selectedOption = options.filter((menuOption) => menuOption.optionNumber == selectedOptionNumber)[0];
		selectedOption.active = true;
		dispatch('changed', selectedOption.value);
		dropdownShown = false;
	}
</script>

<div
	class="relative inline-block w-full text-left"
	use:clickOutside={{ enabled: dropdownShown, cb: () => (dropdownShown = !dropdownShown) }}
>
	<div>
		<button
			type="button"
			class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-800"
			id="menu-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			on:click={() => (dropdownShown = !dropdownShown)}
		>
			<span class="mx-auto leading-none whitespace-nowrap">{menuLabel}</span>
			<div class="w-5 h-5 ml-1 -mr-2">
				<MdArrowDropDown />
			</div>
		</button>
	</div>

	{#if dropdownShown}
		<div
			class="absolute right-0 z-10 mt-2 origin-top-right rounded-md shadow-lg dropdown ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
			in:scale={{ duration: 100, start: 0.95, easing: cubicOut }}
			out:scale={{ duration: 75, start: 0.95, easing: cubicIn }}
			style="width: {width ? width : 'auto'}"
		>
			<div class="py-1" role="none">
				{#each options as { value, text, optionNumber, active }}
					<Option
						{value}
						{text}
						{optionNumber}
						{menuId}
						bind:active
						on:click={(event) => handleOptionClicked(event.detail)}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	#menu-button,
	.dropdown {
		background-color: var(--select-bg-color);
		color: var(--select-text-color);
	}

	#menu-button:hover {
		background-color: var(--select-bg-color-hov);
	}
</style>
