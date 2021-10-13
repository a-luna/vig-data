<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import PitchStatsForDateTable from '$lib/components/HomePage/PlayerStatsForDate/PitchStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { getRandomHexString } from '$lib/util';

	export let pitchStats: PlayerPitchStats[] = [];
	export let sortBy: string;
	export let tableId: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let totalRows = pitchStats.length;
	let pageSize: number = 5;
	let currentPage: number = 1;
	let startRow: number = 0;
	let endRow: number = 5;

	function getDefaultTableId() {
		return `pitch-stats-for-date-${getRandomHexString(4)}`;
	}
</script>

<div class="flex flex-col w-full mb-4 player-stats-wrapper flex-nowrap responsive">
	<PitchStatsForDateTable
		tableId={tableId ? tableId : getDefaultTableId()}
		bind:pitchStats
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
		rowTypeSingle={'pitcher'}
		rowTypePlural={'pitchers'}
	/>
</div>
