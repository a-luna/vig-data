<script lang="ts">
	import MainNav from '$lib/components/MainNav.svelte';
	import '../global.css';
</script>

<MainNav />
<main role="main" class="flex-grow px-3 py-5 m-0 text-base sm:p-5">
	<slot />
</main>
