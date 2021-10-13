<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';

	export let loading: boolean = false;
	let mounted: boolean = false;

	$: zIndex = loading ? 10 : 0;

	onMount(() => (mounted = true));

	$: if (mounted && loading) {
		document.querySelector('body').classList.add('loading-active');
	} else if (mounted) {
		document.querySelector('body').classList.remove('loading-active');
	}
</script>

<div class="loading-wrapper" class:opacity-0={!loading} class:pointer-events-none={!loading} style="z-index: {zIndex}">
	<div class="loading-overlay" on:click={() => (loading = !loading)} />
	<Spinner />
</div>

<style lang="postcss">
	:global(body.loading-active) {
		overflow-x: hidden;
		overflow-y: visible !important;
	}

	.loading-overlay {
		@apply absolute w-full h-full opacity-50;
		background-color: var(--page-bg-color);
	}

	.loading-wrapper {
		@apply fixed w-full h-full top-0 left-0 flex items-center justify-center;
		transition: opacity 0.25s ease;
	}
</style>
