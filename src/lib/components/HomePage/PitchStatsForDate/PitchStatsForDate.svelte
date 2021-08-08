<script lang="ts">
	import type { PlayerPitchStats } from '$lib/api/types';
	import PitchStatsForDateTable from '$lib/components/HomePage/PitchStatsForDate/PitchStatsForDateTable.svelte';
	import Pagination from '$lib/components/Util/Pagination/Pagination.svelte';
	import { scoreboardDate } from '$lib/stores/scoreboardDate';
	import { format } from 'date-fns';
	import { onMount, tick } from 'svelte';

	export let pitchStats: PlayerPitchStats[] = [];
	export let sortBy: string = 'game_score';
	export let sortDesc: boolean = true;
	let tableId: string = 'sp-stats-for-date';
	let tableCaption: string = '';
	let tableWidth: number;

	$: desc = (a: PlayerPitchStats, b: PlayerPitchStats) => b[sortBy] - a[sortBy];
	$: asc = (a: PlayerPitchStats, b: PlayerPitchStats) => a[sortBy] - b[sortBy];
	$: if ($scoreboardDate) tableCaption = getTableCaption($scoreboardDate, sortBy, sortDesc);

	$: pitchStatsForSp = pitchStats.filter((p) => p.is_sp == 1).sort(sortDesc ? desc : asc);
	$: totalRows = pitchStatsForSp.length;
	$: pageSize = 5;
	$: currentPage = 1;
	$: startRow = 0;
	$: endRow = 5;

	onMount(async () => {
		await tick();
		toggleHighlightedColumn(true);
	});

	function getTableCaption(date: Date, sortStat: string, desc: boolean): string {
		const STAT_DISPLAY_NAME_MAP = {
			hits: 'Hits',
			bases_on_balls: 'Walks',
			strikeouts: 'Strikeouts',
			strikes_swinging: 'Swinging Strikes',
			csw: 'Called Strikes + Whiffs',
			game_score: 'Game Score',
			wpa_pitch: 'WPA',
			re24_pitch: 'RE24'
		};
		const sort = desc ? 'Best' : 'Worst';
		return `${sort} ${getPitcherRole()} Performances by ${STAT_DISPLAY_NAME_MAP[sortStat]} (${format(date, 'MMM do')})`;
	}

	function getPitcherRole(): string {
		return pitchStats.every((p) => p.is_sp) ? 'SP' : pitchStats.every((p) => p.is_rp) ? 'RP' : 'Pitching';
	}

	async function sortTableByStat(stat: string) {
		if (sortBy === stat) {
			sortDesc = !sortDesc;
		}
		toggleHighlightedColumn(false);
		sortBy = stat;
		await tick();
		toggleHighlightedColumn(true);
	}

	function getSelectors() {
		const sortStatValueSelector = `#${tableId} .resp-table-body [data-stat-name='${sortBy}']`;
		const sortStatColumnHeadSelector = `#${tableId} .resp-table-header [data-stat-name='${sortBy}']`;
		return [sortStatValueSelector, sortStatColumnHeadSelector];
	}

	function toggleHighlightedColumn(addClass: boolean) {
		const [sortStatValueSelector, sortStatColumnHeadSelector] = getSelectors();
		const colSortHeader = document.querySelector<HTMLElement>(sortStatColumnHeadSelector);
		const colStatValues = [...document.querySelectorAll<HTMLElement>(sortStatValueSelector)];
		if (addClass) {
			addHighlightToColumn(colSortHeader, colStatValues);
		} else {
			removeHighlightFromColumn(colSortHeader, colStatValues);
		}
	}

	function addHighlightToColumn(colSortHeader: HTMLElement, colStatValues: HTMLElement[]) {
		if (colSortHeader) {
			colSortHeader.classList.add('sort');
			colSortHeader.classList.add(sortDesc ? 'desc' : 'asc');
		}
		colStatValues.map((el) => el.classList.add('highlight-stat'));
	}

	function removeHighlightFromColumn(colSortHeader: HTMLElement, colStatValues: HTMLElement[]) {
		if (colSortHeader) {
			colSortHeader.classList.remove('sort');
			colSortHeader.classList.remove(sortDesc ? 'desc' : 'asc');
		}
		colStatValues.map((el) => el.classList.remove('highlight-stat'));
	}
</script>

<div class="flex flex-row flex-wrap text-sm">
	<PitchStatsForDateTable
		{tableCaption}
		{tableId}
		pitchStats={pitchStatsForSp}
		bind:startRow
		bind:endRow
		bind:tableWidth
		on:sortTable={(e) => sortTableByStat(e.detail)}
	/>
	<div style="width: {tableWidth}px">
		<Pagination
			bind:totalRows
			bind:pageSize
			bind:currentPage
			bind:startRow
			bind:endRow
			rowTypeSingle={'player'}
			rowTypePlural={'players'}
			on:pageChanged={() => toggleHighlightedColumn(true)}
		/>
	</div>
</div>
