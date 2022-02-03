<script lang="ts">
	import type { PlayerBatStats } from '$lib/api/types';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { prefersDarkTheme } from '$lib/util/ui';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import type { TableSettings, TableState } from '@a-luna/svelte-simple-tables/types';
	import { getDefaultTableId } from '@a-luna/svelte-simple-tables/util';
	import { columnSettings } from './columnSettings';

	export let batStats: PlayerBatStats[] = [];
	export let tableHeading: string;
	export let sortBy: string;
	let sortDir: 'asc' | 'desc' = 'desc';
	export let tableId: string = getDefaultTableId();
	const tableIdSuffix = $pageWidth.isDefault ? '-mobile' : '';
	let tableState: TableState;

	$: if (tableState) $tableState.themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';

	const tableSettings: TableSettings = {
		tableId: `${tableId}${tableIdSuffix}`,
		showHeader: true,
		header: tableHeading,
		showSortDescription: true,
		sortBy,
		sortDir,
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageNavFormat: 'auto',
		rowType: 'batters'
	};
</script>

<SimpleTable data={batStats} {columnSettings} {tableSettings} bind:tableState />
