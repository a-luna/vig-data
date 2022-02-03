<script lang="ts">
	import type { PitchFx } from '$lib/api/types';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { prefersDarkTheme } from '$lib/util/ui';
	import SimpleTable from '@a-luna/svelte-simple-tables';
	import { pageWidth } from '@a-luna/svelte-simple-tables/stores';
	import type { TableSettings, TableState } from '@a-luna/svelte-simple-tables/types';
	import { columnSettings } from './columnSettings';

	export let pfxBarrels: PitchFx[] = [];
  export let tableHeading: string;
	export let sortBy: string;
	export let tableId: string;
	const tableIdSuffix = $pageWidth.isDefault ? '-mobile' : '';
	let tableState: TableState;

	$: if (tableState) $tableState.themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';

	const tableSettings: TableSettings = {
		tableId: `${tableId}${tableIdSuffix}`,
		showHeader: true,
		header: tableHeading,
		showSortDescription: true,
		sortBy,
		sortDir: 'desc',
		paginated: true,
		pageSize: 5,
		pageSizeOptions: [5, 10, 15, 20, 25],
		pageNavFormat: 'auto',
		rowType: 'barrels'
	};
</script>

<SimpleTable data={pfxBarrels} {columnSettings} {tableSettings} bind:tableState />
