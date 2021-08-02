<script lang="ts">
	import Nav from '$lib/components/Nav/Nav.svelte';

	const items = [
		{ label: 'Home', url: '/', current: false },
		{ label: 'Scores', url: '/scoreboard', current: false },
		{ label: 'Team', url: '/team', current: false },
		{ label: 'Players', url: '/player', current: false }
	];
</script>

<Nav {items} />
