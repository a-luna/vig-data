<script lang="ts">
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />
<div class="wrapper">
	<main role="main">
		<slot />
	</main>
</div>
