<script lang="ts">
	import DefPositionDropDown from '$lib/components/TeamStats/FilterSettings/DropDownLists/DefPositionDropDown.svelte';
	import Chip from '$lib/components/Util/Chip.svelte';
	import { DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';
	import type { DefPositionNumber } from '$lib/types';
	import { flip } from 'svelte/animate';

	let selections: DefPositionNumber[] = $teamStatFilter.defPosition;

	function addDefPosition(positionNumber: DefPositionNumber) {
		if (!selections.includes(positionNumber)) {
			selections = [positionNumber, ...selections];
			selections = selections.sort((a, b) => a - b);
			teamStatFilter.changeDefPosition(selections);
		}
	}

	function remove(positionNumber: number) {
		selections = selections.filter((n) => n !== positionNumber);
		teamStatFilter.changeDefPosition(selections);
	}

	const options = { duration: 500 };
</script>

<div class="flex flex-wrap justify-center md:justify-start">
	<div class="flex-grow w-5/12 m-2 team-filter md:m-1 md:w-auto md:flex-grow-0">
		<DefPositionDropDown width={'auto'} on:defPosSelected={(e) => addDefPosition(e.detail)} />
	</div>
	<div class="flex flex-wrap items-center flex-grow w-5/12 m-2 team-filter sm:w-auto md:m-1">
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
</div>

<style lang="postcss">
	.team-filter {
		max-width: 45%;
	}

	@media screen and (min-width: 768px) {
		.team-filter {
			max-width: none;
		}
	}
</style>
