<script lang="ts">
	import type { PlayerBatStats } from '$lib/api/types';
	import BatStatsForDateTable from '$lib/components/HomePage/PlayerStatsForDate/BatStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { getRandomHexString } from '$lib/util/ui';

	export let tableId: string;
	export let sortBy: string;
	export let batStats: PlayerBatStats[] = [];
	let sortDir: 'asc' | 'desc' = 'desc';
	let totalRows = batStats.length;
	let pageSize: number = 5;
	let currentPage: number = 1;
	let startRow: number = 0;
	let endRow: number = 5;

	function getDefaultTableId() {
		return `bat-stats-for-date-${getRandomHexString(4)}`;
	}
</script>

<div class="flex flex-col w-full mb-4 player-stats-wrapper flex-nowrap responsive">
	<BatStatsForDateTable
		tableId={tableId ? tableId : getDefaultTableId()}
		bind:batStats
		bind:sortBy
		bind:sortDir
		bind:currentPage
		bind:startRow
		bind:endRow
	/>
	<Pagination
		bind:totalRows
		bind:pageSize
		bind:currentPage
		bind:startRow
		bind:endRow
		compactPageNav={true}
		rowTypeSingle={'batter'}
		rowTypePlural={'batters'}
	/>
</div>
