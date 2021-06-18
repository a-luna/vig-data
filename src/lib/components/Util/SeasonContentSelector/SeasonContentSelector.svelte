<script lang="ts">
	import SeasonContentDropDown from '$lib/components/Util/SeasonContentSelector/SeasonContentDropDown.svelte';
	import SeasonContentRadioButtons from '$lib/components/Util/SeasonContentSelector/SeasonContentRadioButtons.svelte';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

</script>

<div class="flex flex-col items-center justify-center text-sm flex-nowrap">
	<div class="block w-full sm:hidden">
		<SeasonContentDropDown width={'100%'} />
	</div>
	<div class="hidden sm:block">
		<SeasonContentRadioButtons {color} />
	</div>
</div>
