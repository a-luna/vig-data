<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { teamBatStat } from '$lib/stores/teamBatStatFilter';

	export let color: ThemeColor = 'primary';

	$: allSelected = $teamBatStat.split === 'all';
	$: startersSelected = $teamBatStat.split === 'starters';
	$: subsSelected = $teamBatStat.split === 'subs';
	$: defposSelected = $teamBatStat.split === 'defpos';
	$: batorderSelected = $teamBatStat.split === 'batorder';

</script>

<div class="btn-group my-1 overflow-x-auto">
	<button
		type="button"
		class={allSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeSplit('all')}>All</button
	>
	<button
		type="button"
		class={startersSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeSplit('starters')}>Starting Lineup</button
	>
	<button
		type="button"
		class={subsSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeSplit('subs')}>Bench</button
	>
	<button
		type="button"
		class={defposSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeSplit('defpos')}>Def. Position</button
	>
	<button
		type="button"
		class={batorderSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeSplit('batorder')}>Bat Order</button
	>
</div>
