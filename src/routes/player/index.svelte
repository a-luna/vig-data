<script lang="ts">
	import { getPlayerDetails } from '$lib/api/player';
	import type { PlayerDetails } from '$lib/api/types';
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import { allPlayers } from '$lib/components/PlayerSearch/player_search';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import type { PlayerCardLink } from '$lib/types';

	let loading = true;
	let players: PlayerDetails[] = [];

	async function getAllPlayerDetails() {
		const allPlayerIds = Object.values(allPlayers);
		const playerIdsShuffled = Array.from({ length: allPlayerIds.length }, () =>
			Math.floor(Math.random() * allPlayerIds.length)
		).map((i) => allPlayerIds[i]);
		loading = true;
		for (const player of playerIdsShuffled.slice(0, 9)) {
			const result = await getPlayerDetails(player.mlb_id);
			if (result.success) {
				players.push(result.value);
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
			{#each players as details}
				<PlayerCard {details} links={[createPlayerCardLink(details.mlb_id)]} />
			{/each}
		{/if}
	</div>
</div>
