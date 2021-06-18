<script lang="ts">
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

	$: allSelected = $seasonStatFilter.pitchStatSplit === 'all';
	$: spSelected = $seasonStatFilter.pitchStatSplit === 'sp';
	$: rpSelected = $seasonStatFilter.pitchStatSplit === 'rp';

</script>

<div class="my-1 text-sm btn-group">
	<button
		type="button"
		class={allSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changePitchStatSplit('all')}>All</button
	>
	<button
		type="button"
		class={spSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changePitchStatSplit('sp')}>SP</button
	>
	<button
		type="button"
		class={rpSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changePitchStatSplit('rp')}>RP</button
	>
</div>
