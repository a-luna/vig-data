<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import PitchStatsForDateTable from '$lib/components/HomePage/PlayerStatsForDate/PitchStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { createPaginationStore } from '$lib/stores/pagination';
	import type { PaginationStore } from '$lib/types';
	import { getRandomHexString } from '$lib/util/ui';

	export let pitchStats: PlayerPitchStats[] = [];
	export let sortBy: string;
	export let tableId: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let pagination: PaginationStore = createPaginationStore(pitchStats.length, 5);

	function getDefaultTableId() {
		return `pitch-stats-for-date-${getRandomHexString(4)}`;
	}
</script>

<div class="flex flex-col w-full mb-4 player-stats-wrapper flex-nowrap responsive">
	<PitchStatsForDateTable
		tableId={tableId ? tableId : getDefaultTableId()}
		{pagination}
		bind:pitchStats
		bind:sortBy
		bind:sortDir
	/>
	<Pagination {pagination} alwaysUseCompact={true} rowTypeSingle={'pitcher'} rowTypePlural={'pitchers'} />
</div>
