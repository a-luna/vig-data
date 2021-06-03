<script lang="ts">
	import { dev } from '$app/env';
	import '../global.css';
	import MainNav from '$lib/components/MainNav.svelte';

</script>

<svelte:head>
	{@html dev
		? ''
		: '<script async defer data-website-id="add553f7-4504-4257-ae69-94e01630302c" src="https://umami.aaronluna.dev/umami.js"></script>'}
</svelte:head>

<MainNav />
<main role="main">
	<slot />
</main>
