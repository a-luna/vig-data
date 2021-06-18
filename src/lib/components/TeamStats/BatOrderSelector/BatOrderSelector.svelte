<script lang="ts">
	import BatOrderDropDown from '$lib/components/TeamStats/BatOrderSelector/BatOrderDropDown.svelte';
	import BatOrderRadioButtons from '$lib/components/TeamStats/BatOrderSelector/BatOrderRadioButtons.svelte';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

</script>

<div class="flex flex-col flex-nowrap justify-center items-center text-sm">
	<div class="block sm:hidden w-full">
		<BatOrderDropDown width={'100%'} />
	</div>
	<div class="hidden sm:block">
		<BatOrderRadioButtons {color} />
	</div>
</div>
