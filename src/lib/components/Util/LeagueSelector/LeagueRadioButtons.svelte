<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { seasonSettings } from '$lib/stores/seasonSettings';

	export let color: ThemeColor = 'primary';

	$: bothSelected = $seasonSettings.league === 'both';
	$: alSelected = $seasonSettings.league === 'al';
	$: nlSelected = $seasonSettings.league === 'nl';

</script>

<div class="btn-group text-sm my-1">
	<button
		type="button"
		class={bothSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeLeague('both')}>Both</button
	>
	<button
		type="button"
		class={alSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeLeague('al')}>American League</button
	>
	<button
		type="button"
		class={nlSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeLeague('nl')}>National League</button
	>
</div>
