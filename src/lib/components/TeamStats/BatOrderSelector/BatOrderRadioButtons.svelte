<script lang="ts">
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
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

	$: batFirstSelected = $seasonStatFilter.batOrder === 1;
	$: batSecondSelected = $seasonStatFilter.batOrder === 2;
	$: batThirdSelected = $seasonStatFilter.batOrder === 3;
	$: batFourthSelected = $seasonStatFilter.batOrder === 4;
	$: batFifthSelected = $seasonStatFilter.batOrder === 5;
	$: batSixthSelected = $seasonStatFilter.batOrder === 6;
	$: batSeventhSelected = $seasonStatFilter.batOrder === 7;
	$: batEighthSelected = $seasonStatFilter.batOrder === 8;
	$: batNinthSelected = $seasonStatFilter.batOrder === 9;

</script>

<div class="btn-group my-1 overflow-x-auto">
	<button
		type="button"
		class={batFirstSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(1)}>1</button
	>
	<button
		type="button"
		class={batSecondSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(2)}>2</button
	>
	<button
		type="button"
		class={batThirdSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(3)}>3</button
	>
	<button
		type="button"
		class={batFourthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(4)}>4</button
	>
	<button
		type="button"
		class={batFifthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(5)}>5</button
	>
	<button
		type="button"
		class={batSixthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(6)}>6</button
	>
	<button
		type="button"
		class={batSeventhSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(7)}>7</button
	>
	<button
		type="button"
		class={batEighthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(8)}>8</button
	>
	<button
		type="button"
		class={batNinthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonStatFilter.changeBatOrder(9)}>9</button
	>
</div>
