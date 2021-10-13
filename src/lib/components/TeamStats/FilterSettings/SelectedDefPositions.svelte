<script lang="ts">
	import DefPositionDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/DefPositionDropDown.svelte';
	import Chip from '$lib/components/Util/Chip.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import type { DefPositionNumber } from '$lib/types';
	import { flip } from 'svelte/animate';

	export let selections: DefPositionNumber[] = [];

	function addDefPosition(positionNumber: DefPositionNumber) {
		if (!selections.includes(positionNumber)) {
			selections = [positionNumber, ...selections];
			selections = selections.sort((a, b) => a - b);
		}
	}

	function remove(positionNumber: number) {
		selections = selections.filter((n) => n !== positionNumber);
	}

	const options = { duration: 500 };
</script>

<DefPositionDropDown width={'100%'} on:defPosSelected={(e) => addDefPosition(e.detail)} />
<div class="flex flex-wrap items-center flex-grow w-auto col-span-2">
	{#each selections as positionNumber (positionNumber)}
		<div animate:flip={options} class="my-auto w-min">
			<Chip
				id={positionNumber}
				label={DEF_POS_NUM_TO_ABBREV_MAP[positionNumber]}
				on:dismissed={() => remove(positionNumber)}
			/>
		</div>
	{/each}
</div>
