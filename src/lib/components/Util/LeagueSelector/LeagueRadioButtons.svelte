<script lang="ts">
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'primary';

	$: bothSelected = $seasonStatFilter.league === 'both';
	$: alSelected = $seasonStatFilter.league === 'al';
	$: nlSelected = $seasonStatFilter.league === 'nl';

</script>

<div class="btn-group text-sm my-1">
	<button
		type="button"
		class={bothSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeLeague('both')}>Both</button
	>
	<button
		type="button"
		class={alSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeLeague('al')}>American League</button
	>
	<button
		type="button"
		class={nlSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeLeague('nl')}>National League</button
	>
</div>
