<script lang="ts">
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'primary';

	$: allSelected = $seasonStatFilter.batStatSplit === 'all';
	$: startersSelected = $seasonStatFilter.batStatSplit === 'starters';
	$: subsSelected = $seasonStatFilter.batStatSplit === 'subs';
	$: defposSelected = $seasonStatFilter.batStatSplit === 'defpos';
	$: batorderSelected = $seasonStatFilter.batStatSplit === 'batorder';

</script>

<div class="btn-group mb-2 overflow-x-auto">
	<button
		type="button"
		class={allSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatStatSplit('all')}>All</button
	>
	<button
		type="button"
		class={startersSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatStatSplit('starters')}>Starting Lineup</button
	>
	<button
		type="button"
		class={subsSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatStatSplit('subs')}>Bench</button
	>
	<button
		type="button"
		class={defposSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatStatSplit('defpos')}>Def. Position</button
	>
	<button
		type="button"
		class={batorderSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatStatSplit('batorder')}>Bat Order</button
	>
</div>
