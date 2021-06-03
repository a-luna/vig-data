<script lang="ts">
	import { teamBatStat } from '$lib/stores/teamBatStatFilter';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';
	let batFirstSelected: boolean;
	let batSecondSelected: boolean;
	let batThirdSelected: boolean;
	let batFourthSelected: boolean;
	let batFifthSelected: boolean;
	let batSixthSelected: boolean;
	let batSeventhSelected: boolean;
	let batEighthSelected: boolean;
	let batNinthSelected: boolean;

	$: batFirstSelected = $teamBatStat.lineupSlot === 1;
	$: batSecondSelected = $teamBatStat.lineupSlot === 2;
	$: batThirdSelected = $teamBatStat.lineupSlot === 3;
	$: batFourthSelected = $teamBatStat.lineupSlot === 4;
	$: batFifthSelected = $teamBatStat.lineupSlot === 5;
	$: batSixthSelected = $teamBatStat.lineupSlot === 6;
	$: batSeventhSelected = $teamBatStat.lineupSlot === 7;
	$: batEighthSelected = $teamBatStat.lineupSlot === 8;
	$: batNinthSelected = $teamBatStat.lineupSlot === 9;

</script>

<div class="btn-group my-1 overflow-x-auto">
	<button
		type="button"
		class={batFirstSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(1)}>1</button
	>
	<button
		type="button"
		class={batSecondSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(2)}>2</button
	>
	<button
		type="button"
		class={batThirdSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(3)}>3</button
	>
	<button
		type="button"
		class={batFourthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(4)}>4</button
	>
	<button
		type="button"
		class={batFifthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(5)}>5</button
	>
	<button
		type="button"
		class={batSixthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(6)}>6</button
	>
	<button
		type="button"
		class={batSeventhSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(7)}>7</button
	>
	<button
		type="button"
		class={batEighthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(8)}>8</button
	>
	<button
		type="button"
		class={batNinthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeLineupSlot(9)}>9</button
	>
</div>
