<script lang="ts">
	import { Pulse } from '../../../../node_modules/svelte-loading-spinners/src';
</script>

<div class="m-auto spinner">
	<div class="my-5">
		<Pulse size="40" color={`currentColor`} />
	</div>
</div>

<style lang="postcss">
	.spinner {
		color: var(--sec-color);
	}
</style>
