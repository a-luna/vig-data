<script lang="ts">
	import { getRandomHexString } from '$lib/util';
	export let id: string = null;

	function getDefaultTableId() {
		return `page-section-${getRandomHexString(4)}`;
	}
</script>

<div
	id={id ? id : getDefaultTableId()}
	class="flex flex-col items-start justify-start flex-initial p-4 overflow-x-hidden shadow-lg section"
>
	<div class="flex flex-col items-start justify-between w-full flex-nowrap section-content">
		<slot />
	</div>
</div>
