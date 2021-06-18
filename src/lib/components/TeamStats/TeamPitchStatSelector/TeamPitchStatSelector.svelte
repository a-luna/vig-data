<script lang="ts">
	import TeamPitchStatDropDown from '$lib/components/TeamStats/TeamPitchStatSelector/TeamPitchStatDropDown.svelte';
	import TeamPitchStatRadioButtons from '$lib/components/TeamStats/TeamPitchStatSelector/TeamPitchStatRadioButtons.svelte';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

</script>

<div class="flex flex-col items-center justify-center text-sm flex-nowrap">
	<div class="block w-full sm:hidden">
		<TeamPitchStatDropDown width={'100%'} />
	</div>
	<div class="hidden sm:block">
		<TeamPitchStatRadioButtons {color} />
	</div>
</div>
