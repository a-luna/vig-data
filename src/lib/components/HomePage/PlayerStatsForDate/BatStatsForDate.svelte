<script lang="ts">
	import type { PlayerBatStats } from '$lib/api/types';
	import BatStatsForDateTable from '$lib/components/HomePage/PlayerStatsForDate/BatStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { syncWidth } from '$lib/stores/elementWidth';
	import { pageBreakPoints } from '$lib/stores/pageBreakPoints';
	import { getRandomHexString } from '$lib/util';
	import { onMount, tick } from 'svelte';
	import type { Writable } from 'svelte/types/runtime/store';

	export let batStats: PlayerBatStats[] = [];
	export let sortBy: string;
	export let tableId: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	let sectionWidthStore: Writable<number> = null;
	let tableWidth: number = 0;

	$: remFontSize = $pageBreakPoints.isLarge ? 16 : $pageBreakPoints.isMedium ? 15 : 14;
	$: tableWidth = $sectionWidthStore - remFontSize - remFontSize;
	$: inlineStyles = $pageBreakPoints.isDefault ? null : `width: ${tableWidth}px`;
	$: desc = (a: PlayerBatStats, b: PlayerBatStats) => b[sortBy] - a[sortBy];
	$: asc = (a: PlayerBatStats, b: PlayerBatStats) => a[sortBy] - b[sortBy];
	$: sortedBatStats = batStats.sort(sortDir === 'desc' ? desc : asc);
	$: totalRows = sortedBatStats.length;
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
		return `bat-stats-for-date-${getRandomHexString(4)}`;
	}

	async function sortTableByStat(stat: string) {
		sortDir = sortBy !== stat ? 'desc' : sortDir === 'asc' ? 'desc' : 'asc';
		sortBy = stat;
		currentPage = 1;
	}
</script>

<div class="flex flex-col mx-4 mb-4 player-stats-wrapper flex-nowrap responsive w-full sm:w-auto" style={inlineStyles}>
	<BatStatsForDateTable
		{tableId}
		batStats={sortedBatStats}
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
		rowTypeSingle={'batter'}
		rowTypePlural={'batters'}
	/>
</div>
