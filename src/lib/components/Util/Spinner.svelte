<script lang="ts">
	import { Pulse } from '../../../../node_modules/svelte-loading-spinners/src';
</script>

<div class="flex flex-row flex-nowrap justify-center align-middle w-full h-full mt-2">
	<div class="spinner m-auto">
		<Pulse size="40" color={`currentColor`} />
	</div>
</div>

<style lang="postcss">
	.spinner {
		color: var(--sec-color);
	}
</style>
