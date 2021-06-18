<script lang="ts">
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { ThemeColor } from '$lib/types';

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

	$: pitcherSelected = $seasonStatFilter.defPosition === 1;
	$: catcherSelected = $seasonStatFilter.defPosition === 2;
	$: firstBaseSelected = $seasonStatFilter.defPosition === 3;
	$: secondBaseSelected = $seasonStatFilter.defPosition === 4;
	$: thirdBaseSelected = $seasonStatFilter.defPosition === 5;
	$: shortStopSelected = $seasonStatFilter.defPosition === 6;
	$: leftFieldSelected = $seasonStatFilter.defPosition === 7;
	$: centerFieldSelected = $seasonStatFilter.defPosition === 8;
	$: rightFieldSelected = $seasonStatFilter.defPosition === 9;
	$: dhSelected = $seasonStatFilter.defPosition === 10;

</script>

<div class="btn-group my-1 overflow-x-auto">
	<button
		type="button"
		class={pitcherSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(1)}>P</button
	>
	<button
		type="button"
		class={catcherSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(2)}>C</button
	>
	<button
		type="button"
		class={firstBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(3)}>1B</button
	>
	<button
		type="button"
		class={secondBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(4)}>2B</button
	>
	<button
		type="button"
		class={thirdBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(5)}>3B</button
	>
	<button
		type="button"
		class={shortStopSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(6)}>SS</button
	>
	<button
		type="button"
		class={leftFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(7)}>LF</button
	>
	<button
		type="button"
		class={centerFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(8)}>CF</button
	>
	<button
		type="button"
		class={rightFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(9)}>RF</button
	>
	<button
		type="button"
		class={dhSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeDefPosition(10)}>DH</button
	>
</div>
