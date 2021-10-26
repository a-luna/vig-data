<script lang="ts">
	import PlayerPitchContentSelector from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentSelector.svelte';
	import PlayerSeasonSelector from '$lib/components/Player/Selectors/PlayerSeasonSelector.svelte';
	import type { PlayerPitchContent } from '$lib/types';

	export let contentShown: PlayerPitchContent = 'career-stats';
</script>

<div class="flex flex-row justify-start w-full gap-3 mb-5 flex-nowrap whitespace-nowrap sm:w-auto sm:gap-5 sm:mx-0">
	<PlayerPitchContentSelector color={'secondary'} width={'72%'} on:changed={(event) => (contentShown = event.detail)} />
	<PlayerSeasonSelector disabled={contentShown === 'career-stats'} width={'25%'} />
</div>
