<script lang="ts">
	import BatStatSplitDropDown from '$lib/components/TeamStats/BatStatSplitSelector/BatStatSplitDropDown.svelte';
	import BatStatSplitRadioButtons from '$lib/components/TeamStats/BatStatSplitSelector/BatStatSplitRadioButtons.svelte';
	import type { ThemeColor } from '$lib/types';

	export let width = 'auto';
	export let color: ThemeColor = 'secondary';

</script>

<div class="block sm:hidden">
	<BatStatSplitDropDown {width} />
</div>
<div class="hidden sm:block">
	<BatStatSplitRadioButtons {color} />
</div>
