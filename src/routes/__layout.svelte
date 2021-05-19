<script lang="ts">
	import { dev } from '$app/env';
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';

</script>

<svelte:head>
	{@html dev
		? ''
		: '<script async defer data-website-id="add553f7-4504-4257-ae69-94e01630302c" src="https://umami.aaronluna.dev/umami.js"></script>'}
</svelte:head>

<Nav />
<main role="main">
	<slot />
</main>
