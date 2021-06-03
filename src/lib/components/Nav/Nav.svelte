<script lang="ts">
	import GiDinosaurBones from 'svelte-icons/gi/GiDinosaurBones.svelte';
	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import NavItem from './NavItem.svelte';
	import ThemeSlider from '../Util/ThemeSelector/ThemeSlider.svelte';
	import type { NavMenuItem } from '$lib/types';

	export let items: NavMenuItem[];
	let open: boolean = false;

</script>

<nav>
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					id="menu-button"
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded={open}
					on:click={() => (open = !open)}
				>
					<span class="sr-only">Open main menu</span>
					<div class:hidden={open} class:block={!open} class="h-6 w-6 stroke-current stroke-2">
						<MdMenu />
					</div>
					<div class:hidden={!open} class:block={open} class="h-6 w-6 stroke-current stroke-2">
						<MdClose />
					</div>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="nav-icon flex-shrink-0 flex items-center">
					<div class="block h-8 w-8 stroke-current stroke-2">
						<GiDinosaurBones />
					</div>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						{#each items as { label, url }}
							<NavItem {label} {url} />
						{/each}
					</div>
				</div>
			</div>
			<div class="absolute inset-y-0 right-0 items-center pr-2 flex sm:hidden">
				<ThemeSlider />
			</div>
			<div class="absolute inset-y-0 right-0 items-center pr-2 hidden sm:flex">
				<ThemeSlider />
				<slot />
			</div>
		</div>
	</div>

	<div class:hidden={!open} class:sm:block={open} id="mobile-menu">
		<div class="px-2 pt-2 pb-3 space-y-1">
			{#each items as { label, url }}
				<NavItem {label} {url} />
			{/each}
			<div class="static flex flex-col items-center inset-auto w-full">
				<slot />
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		background-color: var(--header-bg-color);
	}

	.nav-icon {
		color: var(--nav-icon-color);
	}

	#menu-button {
		color: var(--nav-button-text-color);
		background-color: var(--nav-button-bg-color);
		border: 2px solid var(--nav-button-border-color);
	}

	#menu-button:hover {
		color: var(--nav-button-text-color-hov);
		background-color: var(--nav-button-bg-color-hov);
	}

</style>
