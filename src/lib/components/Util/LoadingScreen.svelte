<script lang="ts">
	import { getSpinnerColor } from '$lib/util';

	import { SyncLoader } from '../../../../node_modules/svelte-loading-spinners/src';

	export let loading: boolean = false;

	export function toggleLoading() {
		loading = !loading;
		document.querySelector('body').classList.toggle('loading-active');
	}

</script>

<div class="loading-wrapper" class:opacity-0={!loading} class:pointer-events-none={!loading}>
	<div class="loading-overlay" on:click={() => toggleLoading()} />
	<div class="pending"><SyncLoader size="40" color={`currentColor`} /></div>
</div>

<style lang="postcss">
	:global(body.loading-active) {
		overflow-x: hidden;
		overflow-y: visible !important;
	}

	.loading-wrapper {
		@apply fixed w-full h-full top-0 left-0 flex items-center justify-center;
		transition: opacity 0.25s ease;
	}

	.loading-overlay {
		@apply absolute w-full h-full bg-gray-900 opacity-50;
	}

</style>
