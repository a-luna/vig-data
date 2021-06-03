<script lang="ts">
	import { scale } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import MdArrowDropDown from 'svelte-icons/md/MdArrowDropDown.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import Option from './Option.svelte';

	export let menuLabel: string = 'Options';
	export let options: SelectMenuOption[];
	export let width: string = 'auto';
	export let menuId: string = '';
	let selectedOption: SelectMenuOption;
	let dropdownShown: boolean = false;
	const dispatch = createEventDispatcher();

	function clickOutside(node, { enabled: initialEnabled, cb }) {
		const handleOutsideClick = ({ target }) => {
			if (!node.contains(target)) {
				cb();
			}
		};

		function update({ enabled }) {
			if (enabled) {
				window.addEventListener('click', handleOutsideClick);
			} else {
				window.removeEventListener('click', handleOutsideClick);
			}
		}

		update(initialEnabled);
		return {
			update,
			destroy() {
				window.removeEventListener('click', handleOutsideClick);
			}
		};
	}

	function handleOptionClicked(selectedOptionNumber) {
		options.map((menuOption) => (menuOption.active = false));
		selectedOption = options.filter(
			(menuOption) => menuOption.optionNumber == selectedOptionNumber
		)[0];
		selectedOption.active = true;
		dispatch('changed', selectedOption.value);
		dropdownShown = false;
	}

</script>

<div
	class="relative inline-block text-left w-full"
	use:clickOutside={{ enabled: dropdownShown, cb: () => (dropdownShown = !dropdownShown) }}
>
	<div>
		<button
			type="button"
			class="inline-flex justify-center items-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-800"
			id="menu-button"
			aria-expanded={dropdownShown}
			aria-haspopup="true"
			on:click={() => (dropdownShown = !dropdownShown)}
		>
			<span class="leading-none mx-auto">{menuLabel}</span>
			<div class="-mr-2 ml-1 h-5 w-5">
				<MdArrowDropDown />
			</div>
		</button>
	</div>

	{#if dropdownShown}
		<div
			class="dropdown origin-top-right absolute right-0 mt-2 z-10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
