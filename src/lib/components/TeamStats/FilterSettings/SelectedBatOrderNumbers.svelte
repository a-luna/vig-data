<script lang="ts">
	import BatOrderDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/BatOrderDropDown.svelte';
	import Chip from '$lib/components/Util/Chip.svelte';
	import type { BatOrder } from '$lib/types';
	import { flip } from 'svelte/animate';

	export let selections: BatOrder[] = [];

	function addBatOrderNumber(batOrderNumber: BatOrder) {
		if (!selections.includes(batOrderNumber)) {
			selections = [batOrderNumber, ...selections];
			selections = selections.sort((a, b) => a - b);
		}
	}

	function remove(batOrderNumber: number) {
		selections = selections.filter((n) => n !== batOrderNumber);
	}

	const options = { duration: 500 };
</script>

<BatOrderDropDown width={'100%'} on:batOrderSelected={(e) => addBatOrderNumber(e.detail)} />
<div class="flex flex-wrap items-center flex-grow w-auto">
	{#each selections as batOrderNumber (batOrderNumber)}
		<div animate:flip={options} class="my-auto w-min">
			<Chip id={batOrderNumber} label={batOrderNumber.toString()} on:dismissed={() => remove(batOrderNumber)} />
		</div>
	{/each}
</div>
