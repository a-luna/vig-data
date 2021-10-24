<script lang="ts">
	import PlayerPitchContentButtonGroup from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentButtonGroup.svelte';
	import PlayerPitchContentDropDown from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentDropDown.svelte';
	import PlayerSeasonSelector from '$lib/components/Player/Selectors/PlayerSeasonSelector.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { PlayerContent } from '$lib/types';

	export let contentShown: PlayerContent = 'career-stats';
</script>

<div
	class="flex flex-row justify-start w-full gap-3 mb-5 flex-nowrap whitespace-nowrap sm:justify-start sm:w-auto sm:gap-5 sm:mx-0"
>
	{#if $pageBreakPoints.isDefault}
		<PlayerPitchContentDropDown on:changed={(event) => (contentShown = event.detail)} width={'72%'} />
	{:else}
		<PlayerPitchContentButtonGroup on:changed={(event) => (contentShown = event.detail)} />
	{/if}
	<PlayerSeasonSelector disabled={contentShown === 'career-stats'} width={'25%'} />
</div>
