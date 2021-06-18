<script lang="ts">
	import BatOrderDropDown from '$lib/components/TeamStats/BatOrderSelector/BatOrderDropDown.svelte';
	import BatOrderRadioButtons from '$lib/components/TeamStats/BatOrderSelector/BatOrderRadioButtons.svelte';
	import BatStatSplitDropDown from '$lib/components/TeamStats/BatStatSplitSelector/BatStatSplitDropDown.svelte';
	import BatStatSplitRadioButtons from '$lib/components/TeamStats/BatStatSplitSelector/BatStatSplitRadioButtons.svelte';
	import BatStatSplitSelector from '$lib/components/TeamStats/BatStatSplitSelector/BatStatSplitSelector.svelte';
	import DefPositionDropDown from '$lib/components/TeamStats/DefPositionSelector/DefPositionDropDown.svelte';
	import DefPositionRadioButtons from '$lib/components/TeamStats/DefPositionSelector/DefPositionRadioButtons.svelte';
	import { seasonStatFilter } from '$lib/stores/seasonStatFilter';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

	$: defposSelected = $seasonStatFilter.batStatSplit === 'defpos';
	$: batorderSelected = $seasonStatFilter.batStatSplit === 'batorder';

</script>

<div class="w-full mx-auto mb-4">
	{#if defposSelected}
		<div class="flex flex-row sm:hidden flex-nowrap">
			<div class="flex flex-row justify-between w-full flex-nowrap">
				<div class="flex justify-start w-5/6">
					<BatStatSplitDropDown width={'100%'} />
				</div>
				<div class="flex justify-end w-auto ml-3">
					<DefPositionDropDown width={'auto'} />
				</div>
			</div>
		</div>
		<div class="flex-col items-center justify-center hidden sm:flex flex-nowrap">
			<BatStatSplitRadioButtons {color} />
			<DefPositionRadioButtons {color} />
		</div>
	{:else if batorderSelected}
		<div class="flex flex-row sm:hidden flex-nowrap">
			<div class="flex flex-row justify-between w-full flex-nowrap">
				<div class="flex justify-start w-5/6">
					<BatStatSplitDropDown width={'100%'} />
				</div>
				<div class="flex justify-end w-auto ml-3">
					<BatOrderDropDown width={'auto'} />
				</div>
			</div>
		</div>
		<div class="flex-col items-center justify-center hidden sm:flex flex-nowrap">
			<BatStatSplitRadioButtons {color} />
			<BatOrderRadioButtons {color} />
		</div>
	{:else}
		<BatStatSplitSelector width={'100%'} {color} />
	{/if}
</div>
