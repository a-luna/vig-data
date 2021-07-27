<script lang="ts">
	import { getPlayerDetails } from '$lib/api/player';
	import type { PlayerDetails } from '$lib/api/types';
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import type { PlayerCardLink } from '$lib/types';

	let loading = true;
	const players = [
		{ mlb_id: 112526, name: 'Bartolo Colon', details: {} as PlayerDetails },
		{ mlb_id: 285079, name: 'R.A. Dickey', details: {} as PlayerDetails },
		{ mlb_id: 434622, name: 'Ubaldo Jimenez', details: {} as PlayerDetails },
		{ mlb_id: 434718, name: 'Huston Street', details: {} as PlayerDetails },
		{ mlb_id: 448281, name: 'Sean Doolittle', details: {} as PlayerDetails },
		{ mlb_id: 450203, name: 'Charlie Morton', details: {} as PlayerDetails },
		{ mlb_id: 450212, name: 'Pat Neshek', details: {} as PlayerDetails },
		{ mlb_id: 453192, name: 'Andrew Miller', details: {} as PlayerDetails },
		{ mlb_id: 445276, name: 'Kenley Jansen', details: {} as PlayerDetails },
		{ mlb_id: 506433, name: 'Yu Darvish', details: {} as PlayerDetails }
	];

	async function getAllPlayerDetails() {
		loading = true;
		for (const p of players) {
			const result = await getPlayerDetails(p.mlb_id);
			if (result.success) {
				p.details = result.value;
			}
		}
		loading = false;
	}

	function createPlayerCardLink(mlb_id: number): PlayerCardLink {
		return { text: 'PitchFX Career Stats', url: `/player/${mlb_id}/pitching` };
	}

	getAllPlayerDetails();
</script>

<LoadingScreen bind:loading />

<div class="container mx-auto mt-4">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#if !loading}
			{#each players as { mlb_id, details }}
				<PlayerCard {details} links={[createPlayerCardLink(mlb_id)]} />
			{/each}
		{/if}
	</div>
</div>
