<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { DEF_POSITION_MAP } from '$lib/util';
	import { onMount } from 'svelte';

	export let color: ThemeColor = 'indigo';
	export let selectedDefPosition: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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

	$: pitcherSelected = selectedDefPosition === 1;
	$: catcherSelected = selectedDefPosition === 2;
	$: firstBaseSelected = selectedDefPosition === 3;
	$: secondBaseSelected = selectedDefPosition === 4;
	$: thirdBaseSelected = selectedDefPosition === 5;
	$: shortStopSelected = selectedDefPosition === 6;
	$: leftFieldSelected = selectedDefPosition === 7;
	$: centerFieldSelected = selectedDefPosition === 8;
	$: rightFieldSelected = selectedDefPosition === 9;
	$: dhSelected = selectedDefPosition === 10;

	onMount(() => (selectedDefPosition = 3));

</script>

<div class="flex flex-col flex-nowrap">
	<div class="btn-group mb-2">
		<button
			type="button"
			class={pitcherSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 1)}>P</button
		>
		<button
			type="button"
			class={catcherSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 2)}>C</button
		>
		<button
			type="button"
			class={firstBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 3)}>1B</button
		>
		<button
			type="button"
			class={secondBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 4)}>2B</button
		>
		<button
			type="button"
			class={thirdBaseSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 5)}>3B</button
		>
		<button
			type="button"
			class={shortStopSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 6)}>SS</button
		>
		<button
			type="button"
			class={leftFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 7)}>LF</button
		>
		<button
			type="button"
			class={centerFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 8)}>CF</button
		>
		<button
			type="button"
			class={rightFieldSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 9)}>RF</button
		>
		<button
			type="button"
			class={dhSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
			on:click={() => (selectedDefPosition = 10)}>DH</button
		>
	</div>
</div>
