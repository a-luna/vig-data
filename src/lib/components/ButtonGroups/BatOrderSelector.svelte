<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { onMount } from 'svelte';

	export let color: ThemeColor = 'indigo';
	export let selectedLineupSlot: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	let batFirstSelected: boolean;
	let batSecondSelected: boolean;
	let batThirdSelected: boolean;
	let batFourthSelected: boolean;
	let batFifthSelected: boolean;
	let batSixthSelected: boolean;
	let batSeventhSelected: boolean;
	let batEighthSelected: boolean;
	let batNinthSelected: boolean;

	$: batFirstSelected = selectedLineupSlot === 1;
	$: batSecondSelected = selectedLineupSlot === 2;
	$: batThirdSelected = selectedLineupSlot === 3;
	$: batFourthSelected = selectedLineupSlot === 4;
	$: batFifthSelected = selectedLineupSlot === 5;
	$: batSixthSelected = selectedLineupSlot === 6;
	$: batSeventhSelected = selectedLineupSlot === 7;
	$: batEighthSelected = selectedLineupSlot === 8;
	$: batNinthSelected = selectedLineupSlot === 9;

	onMount(() => (selectedLineupSlot = 1));

</script>

<div class="btn-group my-1">
	<button
		type="button"
		class={batFirstSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 1)}>1</button
	>
	<button
		type="button"
		class={batSecondSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 2)}>2</button
	>
	<button
		type="button"
		class={batThirdSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 3)}>3</button
	>
	<button
		type="button"
		class={batFourthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 4)}>4</button
	>
	<button
		type="button"
		class={batFifthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 5)}>5</button
	>
	<button
		type="button"
		class={batSixthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 6)}>6</button
	>
	<button
		type="button"
		class={batSeventhSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 7)}>7</button
	>
	<button
		type="button"
		class={batEighthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 8)}>8</button
	>
	<button
		type="button"
		class={batNinthSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => (selectedLineupSlot = 9)}>9</button
	>
</div>
