<script lang="ts">
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import type { PlayerCardLink } from '$lib/types';

	const players = [
		{ mlb_id: 112526, name: 'Bartolo Colon' },
		{ mlb_id: 285079, name: 'R.A. Dickey' },
		{ mlb_id: 429722, name: 'Ervin Santana' },
		{ mlb_id: 407845, name: 'Fernando Rodney' },
		{ mlb_id: 433587, name: 'Felix Hernandez' },
		{ mlb_id: 434622, name: 'Ubaldo Jimenez' },
		{ mlb_id: 430912, name: 'Matt Cain' },
		{ mlb_id: 425794, name: 'Adam Wainwright' },
		{ mlb_id: 434378, name: 'Justin Verlander' },
		{ mlb_id: 430935, name: 'Cole Hamels' },
		{ mlb_id: 282332, name: 'CC Sabathia' },
		{ mlb_id: 425844, name: 'Zack Greinke' },
		{ mlb_id: 408061, name: 'Francisco Rodriguez' },
		{ mlb_id: 434718, name: 'Huston Street' },
		{ mlb_id: 448281, name: 'Sean Doolittle' },
		{ mlb_id: 450203, name: 'Charlie Morton' },
		{ mlb_id: 446372, name: 'Corey Kluber' },
		{ mlb_id: 450212, name: 'Pat Neshek' },
		{ mlb_id: 448179, name: 'Rich Hill' },
		{ mlb_id: 453192, name: 'Andrew Miller' },
		{ mlb_id: 445276, name: 'Kenley Jansen' },
		{ mlb_id: 502748, name: 'Brad Peacock' },
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
