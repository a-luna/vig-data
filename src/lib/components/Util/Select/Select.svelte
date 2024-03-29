<script lang="ts">
	import type { SelectMenuOption } from '$lib/types';
	import { clickOutside } from '$lib/util/ui';
	import { createEventDispatcher } from 'svelte';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Option from './Option.svelte';

	export let menuLabel: string = 'Options';
	export let options: SelectMenuOption[];
	export let width: string = 'auto';
	export let fontSize: string = '0.95rem';
	export let disabled: boolean = false;
	export let displaySelectedOptionText = true;
	export let menuId: string = '';
	export let buttonLayout = 'inline-flex items-center justify-between gap-2.5 w-full py-2.5 px-2';
	export let buttonBorder =
		'border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-800';
	export let menuLayout = 'absolute right-0 z-10 w-full mt-2';
	export let menuBorder = 'rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none';
	let selectedOption: SelectMenuOption;
	let dropdownShown: boolean = false;
	const dispatch = createEventDispatcher();

	$: label = disabled ? 'N/A' : displaySelectedOptionText ? selectedOption?.text ?? menuLabel : menuLabel;
	$: buttonStyles = `font-medium ${buttonLayout} ${buttonBorder}`;
	$: menuStyles = `dropdown origin-top-right ${menuLayout} ${menuBorder}`;

	export function handleOptionClicked(selectedOptionNumber: number) {
		if (options.length > 0) {
			options.map((menuOption) => (menuOption.active = false));
			selectedOption = options.find((menuOption) => menuOption.optionNumber == selectedOptionNumber);
			if (selectedOption) {
				selectedOption.active = true;
				dispatch('changed', selectedOption.value);
			}
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
			class={buttonStyles}
			class:disabled
			id="open-list-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			style="font-size: {fontSize}"
			on:click={() => handleButtonClicked()}
		>
			<span class="leading-none whitespace-nowrap mx-auto">{label}</span>
			<div style="width: {fontSize}; height: {fontSize}">
				<FaCaretDown />
			</div>
		</button>
	</div>

	{#if dropdownShown}
		<div
			class={menuStyles}
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
