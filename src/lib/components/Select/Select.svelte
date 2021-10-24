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
	export let disabled: boolean = false;
	export let displaySelectedOptionText = true;
	export let menuId: string = '';
	let selectedOption: SelectMenuOption;
	let dropdownShown: boolean = false;
	const dispatch = createEventDispatcher();

	$: label = disabled ? 'N/A' : displaySelectedOptionText ? selectedOption?.text || menuLabel : menuLabel;

	export function handleOptionClicked(selectedOptionNumber: number) {
		if (options.length > 0) {
			options.map((menuOption) => (menuOption.active = false));
			selectedOption = options.filter((menuOption) => menuOption.optionNumber == selectedOptionNumber)[0];
			selectedOption.active = true;
			dispatch('changed', selectedOption.value);
			dropdownShown = false;
		}
	}

	const handleButtonClicked = () => {
		if (!disabled) {
			dropdownShown = !dropdownShown;
		}
	};
</script>

<div
	class="relative flex-initial inline-block text-left"
	style="width: {width ? width : 'auto'}"
	use:clickOutside={{ enabled: dropdownShown, cb: () => (dropdownShown = !dropdownShown) }}
>
	<div>
		<button
			type="button"
			class="inline-flex items-center justify-center w-full p-2 text-sm font-medium border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-800"
			class:disabled
			id="open-list-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			on:click={() => handleButtonClicked()}
		>
			<span class="mx-auto leading-none whitespace-nowrap">{label}</span>
			<div class="w-5 h-5 ml-1 -mr-2">
				<MdArrowDropDown />
			</div>
		</button>
	</div>

	{#if dropdownShown}
		<div
			class="absolute right-0 z-10 w-full mt-2 origin-top-right rounded-md shadow-lg dropdown ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="open-list-button"
			tabindex="-1"
			in:scale={{ duration: 100, start: 0.95, easing: cubicOut }}
			out:scale={{ duration: 75, start: 0.95, easing: cubicIn }}
		>
			<div class="py-1" role="none">
				{#each options as option}
					<Option {...option} {menuId} on:click={(e) => handleOptionClicked(e.detail)} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	#open-list-button,
	.dropdown {
		background-color: var(--select-bg-color);
		color: var(--select-text-color);
	}

	#open-list-button:hover {
		background-color: var(--select-bg-color-hov);
	}

	#open-list-button.disabled {
		cursor: default;
		color: var(--dark-gray2);
		background-color: var(--light-gray1);
	}
</style>
