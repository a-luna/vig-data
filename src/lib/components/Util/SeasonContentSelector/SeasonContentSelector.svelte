<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import SeasonContentDropDown from './SeasonContentDropDown.svelte';
	import SeasonContentRadioButtons from './SeasonContentRadioButtons.svelte';

	export let color: ThemeColor = 'secondary';

</script>

<div class="flex flex-col flex-nowrap justify-center items-center text-sm">
	<div class="block sm:hidden w-full">
		<SeasonContentDropDown width={'100%'} />
	</div>
	<div class="hidden sm:block">
		<SeasonContentRadioButtons {color} />
	</div>
</div>
