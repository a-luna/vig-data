<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IoMdClose from 'svelte-icons/io/IoMdClose.svelte';

	export let label: string = 'OK';
	export let id: string | number = label;
	const dispatch = createEventDispatcher();
</script>

<div class="chip-outer flex justify-center items-center m-1 font-medium rounded-full">
	<div class="text-sm font-normal leading-none max-w-full flex-initial ml-2 mr-1 my-1">{label}</div>
	<div class="flex flex-grow-0 flex-row-reverse cursor-pointer">
		<div
			class="block w-4 h-4 stroke-current mr-1.5 my-1 close-button"
			style="stroke-width: 3"
			on:click={() => dispatch('dismissed', id)}
		>
			<IoMdClose />
		</div>
	</div>
</div>

<style lang="postcss">
	.chip-outer {
		color: var(--color-on-sec);
		background-color: var(--sec-color);
	}

	.close-button {
		color: var(--color-on-sec);
	}

	.close-button:hover {
		color: var(--color-on-sec-hov);
	}
</style>
