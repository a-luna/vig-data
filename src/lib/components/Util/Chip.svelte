<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string = 'OK';
	export let id: string | number = label;
	const dispatch = createEventDispatcher();
</script>

<div class="chip-outer flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full">
	<div class="text-sm font-normal leading-none max-w-full flex-initial">{label}</div>
	<div class="flex flex-grow-0 flex-row-reverse">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-x cursor-pointer rounded-full w-4 h-4 ml-1"
				on:click={() => dispatch('dismissed', id)}
			>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</div>
	</div>
</div>

<style lang="postcss">
	.chip-outer {
		color: var(--color-on-sec);
		background-color: var(--sec-color);
	}

	.chip-outer:hover {
		color: var(--color-on-sec-hov);
	}
</style>
