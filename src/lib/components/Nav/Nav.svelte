<script lang="ts">
	import NavItem from '$lib/components/Nav/NavItem.svelte';
	import ThemeSlider from '$lib/components/Nav/ThemeSlider.svelte';
	import PlayerSearch from '$lib/components/PlayerSearch/PlayerSearch.svelte';
	import { syncHeight } from '$lib/stores/elementHeight';
	import type { NavMenuItem } from '$lib/types';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import GiMoebiusTriangle from 'svelte-icons/gi/GiMoebiusTriangle.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
	import { spring } from 'svelte/motion';

	export let items: NavMenuItem[];
	let open: boolean = false;
	let menuElement: HTMLElement;
	const heightSpring = spring(0, { stiffness: 0.2, damping: 0.5 });

	$: heightStore = syncHeight(menuElement);
	$: heightSpring.set(open ? $heightStore || 0 : 0);
	$: if ($pageWidth.isMedium || $pageWidth.isLarge) open = false;
</script>

<nav>
	<div class="px-2 mx-auto max-w-7xl md:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-14">
			<div class="absolute inset-y-0 left-0 flex items-center md:hidden">
				<!-- Mobile menu button-->
				<button
					id="menu-button"
					type="button"
					class="inline-flex items-center justify-center p-2 ml-2 rounded-md"
					aria-controls="mobile-menu"
					aria-expanded={open}
					on:click={() => (open = !open)}
				>
					<span class="sr-only">Open main menu</span>
					<div class:hidden={open} class:block={!open} class="w-6 h-6 stroke-current stroke-2">
						<MdMenu />
					</div>
					<div class:hidden={!open} class:block={open} class="w-6 h-6 stroke-current stroke-2">
						<MdClose />
					</div>
				</button>
			</div>
			<div class="flex items-center justify-center flex-1 md:items-stretch md:justify-start">
				<div class="flex items-center flex-shrink-0 nav-icon">
					<div class="block w-8 h-8 stroke-current stroke-2 ">
						<a sveltekit:prefetch href="/"><GiMoebiusTriangle /></a>
					</div>
				</div>
				<div class="hidden md:block md:ml-6">
					<div class="flex space-x-4">
						{#each items as { label, url }}
							<NavItem {label} {url} />
						{/each}
					</div>
				</div>
			</div>
			<div class="absolute inset-y-0 right-0 flex items-center pr-2 md:hidden">
				<ThemeSlider />
			</div>
			<div class="absolute inset-y-0 right-0 items-center hidden pr-2 md:flex">
				<ThemeSlider />
				<PlayerSearch />
			</div>
		</div>
	</div>

	<div class:hidden={!open} class:md:block={open} id="mobile-menu" style="height: {$heightSpring}px">
		<div class="flex flex-col gap-2 py-4 pl-2 pr-4 flex-nowrap" bind:this={menuElement}>
			{#each items as { label, url }}
				<NavItem {label} {url} on:click={() => (open = !open)} />
			{/each}
			<div class="static inset-auto flex flex-col items-center w-full">
				<PlayerSearch on:select={() => (open = false)} />
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		background-color: var(--header-bg-color);
	}

	.nav-icon a,
	.nav-icon a:hover {
		color: var(--nav-icon-color);
	}

	#menu-button {
		color: var(--nav-button-text-color);
		background-color: var(--nav-button-bg-color-hov);
	}

	#menu-button:hover {
		background-color: var(--nav-button-bg-color-hov);
	}

	#menu-button:focus {
		color: var(--nav-button-text-color-hov);
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
		--tw-ring-inset: inset;
		--tw-ring-opacity: 1;
		--tw-ring-color: var(--nav-button-text-color-hov);
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
	}

	#mobile-menu {
		border-bottom: 2px solid var(--pri-color-hov);
	}
</style>
