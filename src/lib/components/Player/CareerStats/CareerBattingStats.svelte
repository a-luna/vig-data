<script lang="ts">
	import type { CareerBatStats } from '$lib/api/types';
	import { columnSettings } from '$lib/components/Player/CareerStats/battingColumnSettings';
	import CareerStatsTable from '$lib/components/Player/CareerStats/CareerStatsTable.svelte';

	export let careerBatStats: CareerBatStats;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc' = 'desc';
	const tableId: string = 'career-bat-stats';
	const heading: string = 'Career Batting Stats';
</script>

<CareerStatsTable careerStats={careerBatStats} {columnSettings} {tableId} {heading} {sortBy} {sortDir} />
