<script lang="ts">
	import { getRandomHexString } from '$lib/util';
	export let id: string = null;

	function getDefaultTableId() {
		return `page-section-${getRandomHexString(4)}`;
	}
</script>

<div
	id={id ? id : getDefaultTableId()}
	class="flex flex-col flex-initial items-center justify-start overflow-x-hidden shadow-lg section"
>
	<div class="flex flex-col items-center justify-between p-4 w-full flex-nowrap section-content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.section {
		background-color: var(--section-content-bg-color);
		border: 2px dotted var(--section-content-border-color);
		border-radius: 4px;
	}

	.section-content {
		background-color: var(--section-content-bg-color);
	}
</style>
