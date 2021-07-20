<script lang="ts">
	import BatOrderDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/BatOrderDropDown.svelte';
	import Chip from '$lib/components/Util/Chip.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { BatOrder } from '$lib/types';
	import { flip } from 'svelte/animate';

	let selections: BatOrder[] = $teamStatFilter.batOrder;

	function addBatOrderNumber(batOrderNumber: BatOrder) {
		if (!selections.includes(batOrderNumber)) {
			selections = [batOrderNumber, ...selections];
			selections = selections.sort((a, b) => a - b);
			teamStatFilter.changeBatOrder(selections);
		}
	}

	function remove(batOrderNumber: number) {
		selections = selections.filter((n) => n !== batOrderNumber);
		teamStatFilter.changeBatOrder(selections);
	}

	const options = { duration: 500 };
</script>

<div class="flex flex-wrap justify-center md:justify-start">
	<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto md:flex-grow-0">
		<BatOrderDropDown width={'auto'} on:batOrderSelected={(e) => addBatOrderNumber(e.detail)} />
	</div>
	<div class="flex flex-wrap items-center flex-grow w-5/12 m-2 team-filter sm:w-auto md:m-1">
		{#each selections as batOrderNumber (batOrderNumber)}
			<div animate:flip={options} class="my-auto w-min">
				<Chip id={batOrderNumber} label={batOrderNumber.toString()} on:dismissed={() => remove(batOrderNumber)} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.team-filter {
		max-width: 45%;
	}
</style>
