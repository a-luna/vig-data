<script lang="ts">
	import { page } from '$app/stores';

	export let label: string;
	export let url: string;

	$: current = url.split('?')[0] === $page.path;

</script>

{#if current}
	<a href={url} class="current block px-3 py-1.5 rounded-md text-base font-medium" aria-current="page" on:click>
		{label}
	</a>
{:else}
	<a href={url} class="block px-3 py-1.5 rounded-md text-base font-medium" on:click>
		{label}
	</a>
{/if}

<style lang="postcss">
	a {
		color: var(--nav-link-text-color);
		background-color: var(--nav-link-bg-color);
	}

	a:hover {
		color: var(--nav-link-text-color-hov);
		background-color: var(--nav-link-bg-color-hov);
		text-decoration: none;
	}

	a.current,
	a.current:hover {
		color: var(--nav-link-text-color-active);
		background-color: var(--nav-link-bg-color-active);
	}

</style>
