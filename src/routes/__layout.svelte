<script lang="ts">
	import MainNav from '$lib/components/MainNav.svelte';
	import '../global.css';
</script>

<MainNav />
<main role="main" class="p-2 m-0 text-base sm:p-5">
	<slot />
</main>
