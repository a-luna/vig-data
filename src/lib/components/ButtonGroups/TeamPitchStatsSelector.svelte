<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { teamPitchStat } from '$lib/stores/teamPitchStatFilter';

	export let color: ThemeColor = 'secondary';

	$: allSelected = $teamPitchStat.split === 'all';
	$: spSelected = $teamPitchStat.split === 'sp';
	$: rpSelected = $teamPitchStat.split === 'rp';

</script>

<div class="btn-group my-1 text-sm">
	<button
		type="button"
		class={allSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamPitchStat.changeSplit('all')}>All</button
	>
	<button
		type="button"
		class={spSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamPitchStat.changeSplit('sp')}>SP</button
	>
	<button
		type="button"
		class={rpSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamPitchStat.changeSplit('rp')}>RP</button
	>
</div>
