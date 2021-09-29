<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TiArrowSortedDown from 'svelte-icons/ti/TiArrowSortedDown.svelte';
	import TiArrowSortedUp from 'svelte-icons/ti/TiArrowSortedUp.svelte';

	export let colStat: string = '';
	export let tooltip: string = '';
	export let sortBy: string = '';
	export let sortDir: 'asc' | 'desc' = 'desc';
	export let width: number = 0;
	const dispatch = createEventDispatcher();
</script>

<div
	class="cursor-pointer table-header-cell sortable"
	data-stat-name={colStat}
	title={tooltip}
	style={width > 0 ? `width: ${width}px` : ''}
	on:click={() => dispatch('sortTable', colStat)}
>
	<div class="flex flex-row justify-center flex-nowrap gap-x-1">
		<span class="hover:underline"><slot /></span>
		{#if sortBy === colStat}
			{#if sortDir === 'asc'}
				<div class="my-auto leading-none cursor-pointer stroke-current stroke-2 asc">
					<TiArrowSortedUp />
				</div>
			{:else}
				<div class="my-auto leading-none cursor-pointer stroke-current stroke-2 desc">
					<TiArrowSortedDown />
				</div>
			{/if}
		{/if}
	</div>
</div>

<style lang="postcss">
	.asc,
	.desc {
		flex: 0 0 1rem;
		font-size: 0.5rem;
	}
</style>
