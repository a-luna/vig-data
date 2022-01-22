<script lang="ts">
	import PlayerPitchContentButtonGroup from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentButtonGroup.svelte';
	import PlayerPitchContentDropDown from '$lib/components/Player/Pitching/Selectors/PlayerPitchContentDropDown.svelte';
	import type { ThemeColor } from '$lib/types';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';

	export let color: ThemeColor = 'secondary';
	export let width = '100%';
</script>

{#if $pageWidth.isDefault}
	<PlayerPitchContentDropDown on:changed {width} />
{:else}
	<PlayerPitchContentButtonGroup on:changed {color} />
{/if}
