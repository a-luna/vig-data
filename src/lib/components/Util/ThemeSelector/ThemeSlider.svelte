<script lang="ts">
	import { onMount } from 'svelte';
	import { useDarkTheme } from '$lib/stores/singleValueStores';
	import { prefersDarkTheme } from '$lib/util';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';

	onMount(() => {
		$useDarkTheme = prefersDarkTheme();
		updateBodyClasslist();
	});

	function toggleDarkMode() {
		$useDarkTheme = !$useDarkTheme;
		updateBodyClasslist();
	}

	function updateBodyClasslist() {
		if ($useDarkTheme) {
			if (!window.document.body.classList.contains('dark-mode')) {
				window.document.body.classList.add('dark-mode');
			}
			if (window.document.body.classList.contains('light-mode')) {
				window.document.body.classList.remove('light-mode');
			}
		} else if (!$useDarkTheme) {
			if (window.document.body.classList.contains('dark-mode')) {
				window.document.body.classList.remove('dark-mode');
			}
			if (!window.document.body.classList.contains('light-mode')) {
				window.document.body.classList.add('light-mode');
			}
		}
	}

</script>

<div id="theme-toggle" class="flex items-center cursor-pointer" title="Toggle Light/Dark Theme">
	<div class="relative" on:click={() => toggleDarkMode()}>
		<input type="checkbox" class="sr-only" bind:checked={$useDarkTheme} />
		<div class="slider-bg block w-16 h-8 rounded-full" />
		<div class="dot absolute left-1 top-0.5 w-7 h-7 rounded-full">
			{#if $useDarkTheme}
				<div class="icon p-1.5">
					<FaMoon />
				</div>
			{:else}
				<div class="icon p-1.5">
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

</style>
