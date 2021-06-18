<script lang="ts">
	import DefPositionDropDown from '$lib/components/TeamStats/DefPositionSelector/DefPositionDropDown.svelte';
	import DefPositionRadioButtons from '$lib/components/TeamStats/DefPositionSelector/DefPositionRadioButtons.svelte';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

</script>

<div class="flex flex-col flex-nowrap justify-center items-center text-sm">
	<div class="block sm:hidden w-full">
		<DefPositionDropDown width={'100%'} />
	</div>
	<div class="hidden sm:block">
		<DefPositionRadioButtons {color} />
	</div>
</div>
