<script lang="ts">
	import MainNav from '$lib/components/MainNav.svelte';
	import '../global.css';
</script>

<MainNav />
<main role="main" class="flex-grow px-2 py-5 m-0 text-base sm:px-5 sm:pt-10 sm:pb-5">
	<slot />
</main>
