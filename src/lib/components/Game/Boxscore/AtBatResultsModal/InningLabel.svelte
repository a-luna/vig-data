<script lang="ts">
	import TiArrowSortedUp from 'svelte-icons/ti/TiArrowSortedUp.svelte';
	import TiArrowSortedDown from 'svelte-icons/ti/TiArrowSortedDown.svelte';

	export let inning: string;
</script>

<div class="flex flex-row flex-nowrap justify-start items-center">
	{#if inning.startsWith('t')}
		<div class="icon text-black">
			<TiArrowSortedUp />
		</div>
	{:else}
		<div class="icon text-black">
			<TiArrowSortedDown />
		</div>
	{/if}
	<span>{inning.slice(1)}</span>
</div>

<style lang="postcss">
	.icon {
		width: 12px;
		height: 12px;
	}
</style>
