<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import PitchStatsForDateTable from '$lib/components/HomePage/PlayerStatsForDate/PitchStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { syncWidth } from '$lib/stores/elementWidth';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { getRandomHexString } from '$lib/util';
	import { onMount, tick } from 'svelte';
	import type { Writable } from 'svelte/types/runtime/store';

	export let pitchStats: PlayerPitchStats[] = [];
	export let sortBy: string;
	export let tableId: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let sectionWidthStore: Writable<number> = null;
	let tableWidth: number = 0;

	$: remFontSize = $pageBreakPoints.isLarge ? 16 : $pageBreakPoints.isMedium ? 15 : 14;
	$: tableWidth = $sectionWidthStore - remFontSize - remFontSize;
	$: inlineStyles = $pageBreakPoints.isDefault ? null : `width: ${tableWidth}px`;
	$: desc = (a: PlayerPitchStats, b: PlayerPitchStats) => b[sortBy] - a[sortBy];
	$: asc = (a: PlayerPitchStats, b: PlayerPitchStats) => a[sortBy] - b[sortBy];
	$: sortedPitchStats = pitchStats.sort(sortDir === 'desc' ? desc : asc);
	$: totalRows = sortedPitchStats.length;
	$: pageSize = 5;
	$: currentPage = 1;
	$: startRow = 0;
	$: endRow = 5;
	// $: console.log(`tableWidth=${tableWidth}`);

	onMount(async () => {
		await tick();
		tableId = tableId ? tableId : getDefaultTableId();
		await tick();
		sectionWidthStore = getWidthStoreForParentPageSection();
	});

	function getWidthStoreForParentPageSection() {
		const pageSections = document.querySelectorAll<HTMLElement>('[id^=page-section]');
		const tableElement = document.getElementById(tableId);
		if (tableElement) {
			const match = Array.from(pageSections).filter((el) => el.contains(tableElement));
			if (match.length === 1) {
				return syncWidth(match[0]);
			}
		}
	}

	function getDefaultTableId() {
		return `pitch-stats-for-date-${getRandomHexString(4)}`;
	}

	async function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		currentPage = 1;
	}
</script>

<div class="flex flex-col mx-4 mb-4 player-stats-wrapper flex-nowrap responsive w-full">
	<PitchStatsForDateTable
		tableId={tableId ? tableId : getDefaultTableId()}
		pitchStats={sortedPitchStats}
		bind:sortBy
		bind:sortDir
		bind:startRow
		bind:endRow
		on:sortTable={(e) => sortTableByStat(e.detail)}
	/>
	<Pagination
		bind:totalRows
		bind:pageSize
		bind:currentPage
		bind:startRow
		bind:endRow
		neverShowPageNumbers={true}
		rowTypeSingle={'pitcher'}
		rowTypePlural={'pitchers'}
	/>
</div>
