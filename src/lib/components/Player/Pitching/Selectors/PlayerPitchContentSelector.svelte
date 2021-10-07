<script lang="ts">
	import PlayerPitchContentButtonGroup from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentButtonGroup.svelte';
	import PlayerPitchContentDropDown from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentDropDown.svelte';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';
	export let width = '100%';
</script>

{#if $pageBreakPoints.isDefault || $pageBreakPoints.isSmall}
	<PlayerPitchContentDropDown {width} on:changed />
{:else}
	<PlayerPitchContentButtonGroup {color} on:changed />
{/if}
