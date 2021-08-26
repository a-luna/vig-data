<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TiArrowSortedDown from 'svelte-icons/ti/TiArrowSortedDown.svelte';
	import TiArrowSortedUp from 'svelte-icons/ti/TiArrowSortedUp.svelte';

	export let sortProp: string = '';
	export let tooltip: string = '';
	export let sortBy: string = '';
	export let sortDir: 'asc' | 'desc' = 'desc';
	const dispatch = createEventDispatcher();
</script>

<div
	class="cursor-pointer table-header-cell sortable"
	data-stat-name={sortProp}
	title={tooltip}
	on:click={() => dispatch('sortTable', sortProp)}
>
	<div class="flex flex-row flex-nowrap">
		<span class="hover:underline"><slot /></span>
		{#if sortBy === sortProp}
			{#if sortDir === 'asc'}
				<div class="asc leading-none w-4 h-4 my-auto ml-1 cursor-pointer stroke-current stroke-2">
					<TiArrowSortedUp />
				</div>
			{:else}
				<div class="desc leading-none w-4 h-4 my-auto ml-1 cursor-pointer stroke-current stroke-2">
					<TiArrowSortedDown />
				</div>
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">
	.asc,
	.desc {
		font-size: 8px;
	}
</style>
