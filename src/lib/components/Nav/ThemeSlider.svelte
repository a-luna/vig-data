<script lang="ts">
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { prefersDarkTheme } from '$lib/util/ui';
	import { onMount } from 'svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';

	$: checked = $siteTheme === 'dark';
	$: title = $siteTheme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode';

	onMount(() => {
		if ($siteTheme === 'notset') {
			$siteTheme = prefersDarkTheme() ? 'dark' : 'light';
		}
		updateBodyClasslist();
	});

	function toggleDarkMode() {
		$siteTheme = $siteTheme === 'light' ? 'dark' : 'light';
		updateBodyClasslist();
	}

	function updateBodyClasslist() {
		if ($siteTheme === 'dark') {
			if (!window.document.body.classList.contains('dark-mode')) {
				window.document.body.classList.add('dark-mode');
			}
			if (window.document.body.classList.contains('light-mode')) {
				window.document.body.classList.remove('light-mode');
			}
		} else if ($siteTheme === 'light') {
			if (window.document.body.classList.contains('dark-mode')) {
				window.document.body.classList.remove('dark-mode');
			}
			if (!window.document.body.classList.contains('light-mode')) {
				window.document.body.classList.add('light-mode');
			}
		}
	}
</script>

<div id="theme-toggle" class="flex items-center cursor-pointer" {title}>
	<div class="relative" on:click={() => toggleDarkMode()}>
		<input type="checkbox" class="sr-only" bind:checked />
		<div class="block w-16 h-8 rounded-full slider-bg" />
		<div class="dot absolute left-1 top-0.5 w-7 h-7 rounded-full">
			{#if checked}
				<div class="icon icon-dark p-1.5">
					<FaMoon />
				</div>
			{:else}
				<div class="icon icon-light p-1.5">
					<FaSun />
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.slider-bg {
		background-color: var(--theme-slider-bg-color);
	}

	.dot {
		color: var(--theme-icon-color);
		background-color: var(--theme-icon-bg-color);

		transition-property: transform;
		transition-timing-function: ease-in-out;
		transition-duration: 500ms;
	}

	input:checked ~ .dot {
		transform: translateX(100%);
	}

	.icon-dark {
		color: var(--blue-green2);
	}

	.icon-light {
		color: var(--yellow2);
	}
</style>
