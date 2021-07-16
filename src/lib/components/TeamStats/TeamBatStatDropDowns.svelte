<script lang="ts">
	import BatOrderDropDown from '$lib/components/TeamStats/DropDownLists/BatOrderDropDown.svelte';
	import BatStatSplitDropDown from '$lib/components/TeamStats/DropDownLists/BatStatSplitDropDown.svelte';
	import DefPositionDropDown from '$lib/components/TeamStats/DropDownLists/DefPositionDropDown.svelte';
	import { teamStatFilter } from '$lib/stores/teamStatFilter';

	$: defposSelected = $teamStatFilter.batStatSplit === 'defpos';
	$: batorderSelected = $teamStatFilter.batStatSplit === 'batorder';
</script>

{#if defposSelected}
	<div class="flex flex-row flex-nowrap">
		<div class="flex flex-row justify-between w-full flex-nowrap">
			<div class="justify-start flex-grow-0 w-auto m-1">
				<BatStatSplitDropDown width={'100%'} />
			</div>
			<div class="justify-end flex-grow-0 w-auto m-1">
				<DefPositionDropDown width={'auto'} />
			</div>
		</div>
	</div>
{:else if batorderSelected}
	<div class="flex flex-row flex-nowrap">
		<div class="flex flex-row justify-between w-full flex-nowrap">
			<div class="justify-start flex-grow w-auto m-1">
				<BatStatSplitDropDown width={'100%'} />
			</div>
			<div class="justify-end flex-grow-0 w-auto m-1">
				<BatOrderDropDown width={'auto'} />
			</div>
		</div>
	</div>
{:else}
	<div class="flex-grow-0 w-auto m-1">
		<BatStatSplitDropDown width={'100%'} />
	</div>
{/if}
