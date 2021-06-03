<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { teamBatStat } from '$lib/stores/teamBatStatFilter';

	export let color: ThemeColor = 'secondary';
	let pitcherSelected: boolean;
	let catcherSelected: boolean;
	let firstBaseSelected: boolean;
	let secondBaseSelected: boolean;
	let thirdBaseSelected: boolean;
	let shortStopSelected: boolean;
	let leftFieldSelected: boolean;
	let centerFieldSelected: boolean;
	let rightFieldSelected: boolean;
	let dhSelected: boolean;

	$: pitcherSelected = $teamBatStat.defPosition === 1;
	$: catcherSelected = $teamBatStat.defPosition === 2;
	$: firstBaseSelected = $teamBatStat.defPosition === 3;
	$: secondBaseSelected = $teamBatStat.defPosition === 4;
	$: thirdBaseSelected = $teamBatStat.defPosition === 5;
	$: shortStopSelected = $teamBatStat.defPosition === 6;
	$: leftFieldSelected = $teamBatStat.defPosition === 7;
	$: centerFieldSelected = $teamBatStat.defPosition === 8;
	$: rightFieldSelected = $teamBatStat.defPosition === 9;
	$: dhSelected = $teamBatStat.defPosition === 10;

</script>

<div class="btn-group my-1 overflow-x-auto">
	<button
		type="button"
		class={pitcherSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(1)}>P</button
	>
	<button
		type="button"
		class={catcherSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(2)}>C</button
	>
	<button
		type="button"
		class={firstBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(3)}>1B</button
	>
	<button
		type="button"
		class={secondBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(4)}>2B</button
	>
	<button
		type="button"
		class={thirdBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(5)}>3B</button
	>
	<button
		type="button"
		class={shortStopSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(6)}>SS</button
	>
	<button
		type="button"
		class={leftFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(7)}>LF</button
	>
	<button
		type="button"
		class={centerFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(8)}>CF</button
	>
	<button
		type="button"
		class={rightFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(9)}>RF</button
	>
	<button
		type="button"
		class={dhSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => teamBatStat.changeDefPosition(10)}>DH</button
	>
</div>
