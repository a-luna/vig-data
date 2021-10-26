<script lang="ts">
	import { getPlayerDetails } from '$lib/api/player';
	import type { PlayerDetails } from '$lib/api/types';
	import PlayerCard from '$lib/components/Player/PlayerCard.svelte';
	import { allPlayers } from '$lib/components/PlayerSearch/player_search';
	import LoadingScreen from '$lib/components/Util/LoadingScreen.svelte';
	import type { PlayerCardLink } from '$lib/types';
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte';

	let loading = true;
	let players: PlayerDetails[] = [];

	async function getAllPlayerDetails() {
		players = [];
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

	function createPlayerCardLinks(mlb_id: number): PlayerCardLink[] {
		return [
			{ text: 'Pitch Stats', url: `/player/${mlb_id}/pitching` },
			{ text: 'Bat Stats', url: `/player/${mlb_id}/batting` }
		];
	}

	getAllPlayerDetails();
</script>

<LoadingScreen bind:loading />

{#if !loading}
	<div class="container mx-auto mt-4">
		<div class="flex flex-row items-center w-auto gap-1 refresh-list" on:click={() => getAllPlayerDetails()}>
			<div class="w-6 h-6 ml-2 cursor-pointer stroke-current stroke-2">
				<MdRefresh />
			</div>
			<span class="text-sm font-medium leading-none cursor-pointer">Refresh Player List</span>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each players as details}
				<PlayerCard {details} links={createPlayerCardLinks(details.mlb_id)} />
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	.refresh-list {
		color: var(--sec-color);
	}
	.refresh-list:hover {
		color: var(--sec-color-hov);
	}
</style>
