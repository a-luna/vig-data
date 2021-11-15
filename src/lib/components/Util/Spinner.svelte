<script lang="ts">
	import { Pulse } from '../../../../node_modules/svelte-loading-spinners/src';
</script>

<div class="flex justify-center items-center h-full m-auto">
	<div class="my-5 spinner">
		<Pulse size="40" color={`currentColor`} />
	</div>
</div>

<style lang="postcss">
	.spinner {
		color: var(--sec-color);
	}
</style>
