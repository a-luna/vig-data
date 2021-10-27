<script lang="ts">
	import type { PlayerBatStats } from '$lib/api/types';
	import BatStatsForDateTable from '$lib/components/HomePage/PlayerStatsForDate/BatStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { createPaginationStore } from '$lib/stores/pagination';
	import type { PaginationStore } from '$lib/types';
	import { getRandomHexString } from '$lib/util/ui';

	export let tableId: string;
	export let sortBy: string;
	export let batStats: PlayerBatStats[] = [];
	let sortDir: 'asc' | 'desc' = 'desc';
	let pagination: PaginationStore = createPaginationStore(batStats.length, 5);

	$: pagination.toString();

	function getDefaultTableId() {
		return `bat-stats-for-date-${getRandomHexString(4)}`;
	}
</script>

<div class="flex flex-col w-full mb-4 player-stats-wrapper flex-nowrap responsive">
	<BatStatsForDateTable
		tableId={tableId ? tableId : getDefaultTableId()}
		{pagination}
		bind:batStats
		bind:sortBy
		bind:sortDir
	/>
	<Pagination {pagination} alwaysUseCompact={true} rowTypeSingle={'batter'} rowTypePlural={'batters'} />
</div>
