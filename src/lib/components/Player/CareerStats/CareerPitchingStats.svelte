<script lang="ts">
	import type { CareerPitchStats } from '$lib/api/types';
	import CareerStatsTable from '$lib/components/Player/CareerStats/CareerStatsTable.svelte';
	import { columnSettings } from '$lib/components/Player/CareerStats/pitchingColumnSettings';

	export let careerPitchStats: CareerPitchStats;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc' = 'desc';
	const tableId: string = 'career-pitch-stats';
	const heading: string = 'Career Pitching Stats';
</script>

<CareerStatsTable careerStats={careerPitchStats} {columnSettings} {tableId} {heading} {sortBy} {sortDir} />
