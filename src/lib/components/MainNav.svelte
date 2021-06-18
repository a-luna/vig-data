<script lang="ts">
	import Nav from '$lib/components/Nav/Nav.svelte';
	import PlayerSearch from '$lib/components/PlayerSearch/PlayerSearch.svelte';

	const items = [
		{ label: 'Season', url: '/', current: false },
		{ label: 'Game', url: '/game?id=BOS201909170', current: false },
		{ label: 'Players', url: '/player', current: false }
	];

</script>

<Nav {items}>
	<PlayerSearch />
</Nav>
