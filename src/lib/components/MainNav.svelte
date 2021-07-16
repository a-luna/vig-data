<script lang="ts">
	import Nav from '$lib/components/Nav/Nav.svelte';
	import PlayerSearch from '$lib/components/PlayerSearch/PlayerSearch.svelte';

	const items = [
		{ label: 'Home', url: '/', current: false },
		{ label: 'Scores', url: '/scoreboard', current: false },
		{ label: 'Team', url: '/team', current: false },
		{ label: 'Players', url: '/player', current: false }
	];
</script>

<Nav {items}>
	<PlayerSearch />
</Nav>
