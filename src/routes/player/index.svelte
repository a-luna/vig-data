<script lang="ts">
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import type { PlayerCardLink } from '$lib/types';

	const players = [
		{ mlb_id: 276542, name: 'Joaquin Benoit' },
		{ mlb_id: 282332, name: 'CC Sabathia' },
		{ mlb_id: 285079, name: 'R.A. Dickey' },
		{ mlb_id: 408314, name: 'Jose Reyes' },
		{ mlb_id: 425794, name: 'Adam Wainwright' },
		{ mlb_id: 425844, name: 'Zack Greinke' },
		{ mlb_id: 429719, name: 'Edwin Jackson' },
		{ mlb_id: 430912, name: 'Matt Cain' },
		{ mlb_id: 430935, name: 'Cole Hamels' },
		{ mlb_id: 448179, name: 'Rich Hill' },
		{ mlb_id: 448281, name: 'Sean Doolittle' },
		{ mlb_id: 453192, name: 'Andrew Miller' },
		{ mlb_id: 453286, name: 'Max Scherzer' },
		{ mlb_id: 471911, name: 'Carlos Carrasco' },
		{ mlb_id: 476454, name: 'Dellin Betances' },
		{ mlb_id: 477132, name: 'Clayton Kershaw' },
		{ mlb_id: 491703, name: 'Neftali Feliz' },
		{ mlb_id: 502624, name: 'Chase Anderson' },
		{ mlb_id: 502706, name: 'Derek Holland' },
		{ mlb_id: 502748, name: 'Brad Peacock' },
		{ mlb_id: 504379, name: 'Juan Nicasio' },
		{ mlb_id: 506433, name: 'Yu Darvish' }
	];

	function createPlayerCardLink(mlb_id: number): PlayerCardLink {
		return { text: 'PitchFX Career Stats', url: `/player/${mlb_id}/pitching` };
	}

</script>

<div class="container mx-auto mt-4">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each players as { mlb_id, name }}
			<PlayerCard {name} links={[createPlayerCardLink(mlb_id)]} />
		{/each}
	</div>
</div>
