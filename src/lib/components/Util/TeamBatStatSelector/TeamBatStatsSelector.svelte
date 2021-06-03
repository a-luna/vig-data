<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import BatOrderSelector from '../../ButtonGroups/BatOrderSelector.svelte';
	import DefPositionSelector from '../../ButtonGroups/DefPositionSelector.svelte';
	import { teamBatStat } from '$lib/stores/teamBatStatFilter';
	import TeamBatStatDropDown from './TeamBatStatDropDown.svelte';
	import TeamBatStatRadioButtons from './TeamBatStatRadioButtons.svelte';

	export let color: ThemeColor = 'primary';

	$: defposSelected = $teamBatStat.split === 'defpos';
	$: batorderSelected = $teamBatStat.split === 'batorder';

</script>

<div class="flex flex-col flex-nowrap justify-center items-end text-sm">
	<div class="block sm:hidden">
		<TeamBatStatDropDown />
	</div>
	<div class="hidden sm:block">
		<TeamBatStatRadioButtons {color} />
	</div>
	{#if defposSelected}
		<DefPositionSelector />
	{:else if batorderSelected}
		<BatOrderSelector />
	{/if}
</div>
