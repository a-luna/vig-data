<script lang="ts">
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<Nav />
<div class="wrapper">
	<Sidebar />
	<main role="main">
		<slot />
	</main>
</div>
