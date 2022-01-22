<script lang="ts">
	import { dev } from '$app/env';
	import MainNav from '$lib/components/MainNav.svelte';
	import { apiSource } from '$lib/stores/singleValueStores';
	import Toy from '../../node_modules/@leveluptuts/svelte-toy/Toy.svelte';
	import '../global.css';

	if (!dev) {
		$apiSource = 'prod';
	}
</script>

<MainNav />
<main role="main" class="flex-grow px-2 py-5 m-0 text-base sm:px-5 sm:pt-10 sm:pb-5">
	{#if dev}
		<Toy register={[{ apiSource }]} />
	{/if}
	<slot />
</main>
