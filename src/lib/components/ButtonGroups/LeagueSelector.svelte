<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { onMount } from 'svelte';

	export let color: ThemeColor = 'indigo';
	export let selectedLeague: 'al' | 'nl' | 'both';

	$: alSelected = selectedLeague === 'al';
	$: nlSelected = selectedLeague === 'nl';

	onMount(() => (selectedLeague = 'al'));

</script>

<div class="btn-group text-sm">
	<button
		type="button"
		class={alSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLeague = 'al')}>American League</button
	>
	<button
		type="button"
		class={nlSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLeague = 'nl')}>National League</button
	>
</div>
