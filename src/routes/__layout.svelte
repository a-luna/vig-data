<script lang="ts">
	import MainNav from '$lib/components/MainNav.svelte';
	import '../global.css';

</script>

<MainNav />
<main role="main" class="text-base m-0 p-5">
	<slot />
</main>
