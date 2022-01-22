<script lang="ts">
	import type { CareerBatStats, CareerPitchStats, TeamStats } from '$lib/api/types';
	import { siteTheme } from '$lib/stores/singleValueStores';
	import { prefersDarkTheme } from '$lib/util';
	import ColumnHeader from '@a-luna/svelte-simple-tables/components/DataTable/ColumnHeader.svelte';
	import TableCell from '@a-luna/svelte-simple-tables/components/DataTable/TableCell.svelte';
	import TableHeader from '@a-luna/svelte-simple-tables/components/DataTable/TableHeader.svelte';
	import {
		createComponentWidthStore,
		createTableStateStore,
		pageWidth,
		syncWidth
	} from '@a-luna/svelte-simple-tables/stores';
	import type { ColumnSettings, PropType, TableSettings } from '@a-luna/svelte-simple-tables/types';
	import { getBorderCssValues, getSortFunction, getTableFontSize } from '@a-luna/svelte-simple-tables/util';
	import { createEventDispatcher, onMount, setContext, tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintInOut } from 'svelte/easing';

	export let careerStats: CareerBatStats | CareerPitchStats;
	export let columnSettings: ColumnSettings<TeamStats>[];
	export let tableId: string;
	export let heading: string;
	export let sortBy: string;
	export let sortDir: 'asc' | 'desc' = 'desc';
	let sortedSeasonStats: TeamStats[] = [];
	let tableState = null;
	let expanded: boolean = true;
	let tableElement: HTMLElement;
	let mounted = false;
	let themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';
	const options = { delay: 100, duration: 500, easing: quintInOut };
	const dispatch = createEventDispatcher();
	const tableIdSuffix = $pageWidth.isDefault ? '-mobile' : '';

	const tableSettings: TableSettings = {
		tableId: `${tableId}${tableIdSuffix}`,
		showHeader: true,
		header: heading,
		showSortDescription: true,
		sortBy,
		sortDir,
		themeName,
		clickableRows: true,
		animateSorting: true,
		paginated: false
	};

	const totalRows = [careerStats.career, ...careerStats.by_team, ...careerStats.by_team_by_year].length;
	tableSettings.sortType = columnSettings.find((col) => col.propName === sortBy)?.propType || 'unsorted';
	tableState = createTableStateStore(totalRows, tableSettings);
	const componentWidth = createComponentWidthStore(tableState);
	setContext($tableState.tableId, { tableState, componentWidth });
	sortedSeasonStats = sortSeasonStats($tableState.sortBy, $tableState.sortType, $tableState.sortDir, expanded);

	$: fontSize = getTableFontSize($tableState.tableId);
	$: statsTableRows = [...sortedSeasonStats, careerStats.career, ...careerStats.by_team];
	$: if ($tableState.state.syncState === 'started-sort-table') changeSortSettings();
	$: if ($tableState.state.syncState === 'finished-sort-table') updateColumnWidths();
	$: tableWrapperBorderStyle = $tableState.tableWrapper ? getBorderCssValues($tableState.tableId) : 'none';
	$: themeName = $siteTheme !== 'notset' ? $siteTheme : prefersDarkTheme() ? 'dark' : 'light';
	$: tableWidthStore = syncWidth(tableElement);
	$: $tableState.state.tableWidth = $tableWidthStore;
	$: if (mounted && careerStats.by_team_by_year.some((s: TeamStats) => s.changed_teams_midseason))
		createExpandSeasonClickHandlers();

	onMount(async () => {
		await tick();
		mounted = true;
	});

	const createExpandSeasonClickHandlers = () =>
		Array.from(document.querySelectorAll<HTMLElement>('.show-separate-season-stats-button')).forEach((el) =>
			el.addEventListener('click', toggleExpanded)
		);

	function toggleExpanded() {
		expanded = !expanded;
		changeSortSettings();
	}

	function handleSortTable(sortSettings) {
		const { propName, propType } = sortSettings;
		$tableState.sortDir = $tableState.sortBy !== propName ? 'asc' : $tableState.sortDir === 'asc' ? 'desc' : 'asc';
		$tableState.sortBy = propName;
		$tableState.sortType = propType;
		$tableState.state.syncState = 'started-sort-table';
	}
	async function changeSortSettings() {
		sortedSeasonStats = sortSeasonStats($tableState.sortBy, $tableState.sortType, $tableState.sortDir, expanded);
		$tableState.state.syncState = 'finished-sort-table';
	}
	async function updateColumnWidths() {
		if ($tableState.state.syncState !== 'not-started') {
			await tick();
			$tableState.state.syncState = 'started-resize-columns';
			await tick();
			$tableState.state.syncState = 'finished-resize-columns';
			await tick();
			$tableState.state.syncState = 'not-started';
		}
	}

	function sortSeasonStats(
		sortStat: string,
		sortType: PropType,
		dir: 'asc' | 'desc',
		isExpanded: boolean
	): TeamStats[] {
		const combinedSeasonStats: TeamStats[] = [];
		let sortableRows: TeamStats[] = careerStats.by_team_by_year;
		sortableRows
			.filter((s) => s.all_stats_for_season)
			.sort(getSortFunction(sortStat, sortType, dir))
			.map((s) => {
				combinedSeasonStats.push(s);
				if (isExpanded) {
					const currentYear = s.year;
					sortableRows
						.filter((s) => s.all_stats_for_stint && s.year === currentYear)
						.sort((a, b) => a.stint_number - b.stint_number)
						.map((s) => {
							combinedSeasonStats.push(s);
						});
				}
			});
		return combinedSeasonStats;
	}

	function handleRowClicked(stats: TeamStats) {
		if ($tableState.clickableRows) {
			dispatch('rowClicked', stats);
		}
	}
</script>

<svelte:window on:resize={() => updateColumnWidths()} />

{#if careerStats}
	<div
		id="{$tableState.tableId}-wrapper"
		class:sst-wrapper={$tableState.tableWrapper}
		class:sst-container={!$tableState.tableWrapper}
		class:light-theme={$tableState.themeName === 'light'}
		class:lighter-theme={$tableState.themeName === 'lighter'}
		class:dark-theme={$tableState.themeName === 'dark'}
		class:darker-theme={$tableState.themeName === 'darker'}
		class:custom-theme={$tableState.themeName === 'custom'}
		data-font-size={fontSize}
		style="width: {$componentWidth.finalWrapperWidth}; border: {tableWrapperBorderStyle}"
	>
		{#if columnSettings}
			<TableHeader tableId={$tableState.tableId} />
			<article class="resp-table-container" style="width: {$componentWidth.finalComponentWidth}">
				<div class="resp-table-wrapper">
					<div
						id={$tableState.tableId}
						role="table"
						aria-labelledby="{$tableState.tableId}-cap"
						aria-rowcount={$tableState.pagination.totalRows}
						class="resp-table"
						class:auto-layout={$tableState.fullWidth}
						class:fixed-layout={!$tableState.fullWidth}
						data-testid={$tableState.tableId}
						bind:this={tableElement}
					>
						<div role="row" class="resp-table-header">
							{#each columnSettings as { propName, propType, headerText, tooltip, sortable }}
								<ColumnHeader
									tableId={$tableState.tableId}
									{propName}
									{propType}
									{headerText}
									{tooltip}
									{sortable}
									on:sortTable={(e) => handleSortTable(e.detail)}
								/>
							{/each}
						</div>
						<div role="rowgroup" class="resp-table-body">
							{#each statsTableRows as stats, i (stats.row_id)}
								<div
									animate:flip={options}
									role="row"
									class="resp-table-row"
									class:clickable={$tableState.clickableRows}
									class:season-stats={!stats.changed_teams_midseason && stats.all_stats_for_season}
									class:combined-team-stats={stats.changed_teams_midseason && stats.all_stats_for_season}
									class:separate-team-stats={stats.all_stats_for_stint}
									class:career-stats-all-teams={stats.career_stats_all_teams}
									class:career-stats-for-team={stats.career_stats_for_team}
									aria-rowindex={$tableState.pagination.startRow + i + 1}
									data-testid="{$tableState.tableId}-row"
									on:click={() => handleRowClicked(stats)}
								>
									{#each columnSettings as { propName, propType, classList, colValue }}
										<TableCell tableId={$tableState.tableId} obj={stats} {propName} {propType} {classList} {colValue} />
									{/each}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</article>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.light-theme,
	.dark-theme {
		--sst-default-font-size: 13px;
		--sst-default-table-wrapper-border-width: 2px;
		--sst-default-table-wrapper-border-style: 'dotted';
		--sst-default-table-wrapper-padding: 13px;
		--sst-default-sort-description-font-size: 0.85em;
		--sst-default-table-header-font-size: 1.25em;
		--sst-default-table-border-radius: 4px;
		--sst-default-col-header-padding: 2px 4px;
		--sst-default-col-header-text-weight: 500;
		--sst-default-col-header-highlight-text-weight: 500;
		--sst-default-body-cell-padding: 2px 4px;
		--sst-default-button-group-border-radius: 0.375em;

		font-size: var(--sst-font-size, var(--sst-default-font-size));
	}

	.sst-wrapper {
		background-color: var(--sst-table-wrapper-bg-color, var(--sst-default-table-wrapper-bg-color));
		border-radius: 4px;
		padding: var(--sst-table-wrapper-padding, var(--sst-default-table-wrapper-padding));
		margin: 0 auto 1em auto;
	}

	.sst-container {
		background-color: var(--sst-table-wrapper-bg-color, var(--sst-default-table-wrapper-bg-color));
		margin-bottom: 1em;
	}

	.light-theme {
		--sst-default-table-wrapper-bg-color: hsl(0, 0%, 95%);
		--sst-default-table-wrapper-border-color: hsl(218, 100%, 25%);

		--sst-default-text-color: hsl(0, 0%, 5%);
		--sst-default-link-text-color: hsl(218, 100%, 25%);
		--sst-default-link-hover-text-color: hsl(218, 100%, 25%);
		--sst-default-table-outer-border-color: hsl(218, 100%, 25%);
		--sst-default-table-header-text-color: hsl(0, 0%, 15%);
		--sst-default-sort-description-text-color: hsl(113, 100%, 30%);
		--sst-default-page-range-description-text-color: hsl(113, 100%, 30%);

		--sst-default-col-header-bg-color: hsl(218, 100%, 25%);
		--sst-default-col-header-text-color: hsl(0, 0%, 85%);
		--sst-default-col-header-vert-border-color: hsl(218, 100%, 25%);
		--sst-default-col-header-horiz-border-color: hsl(218, 100%, 25%);

		--sst-default-col-header-highlight-sort-bg-color: hsl(218, 100%, 25%);
		--sst-default-col-header-highlight-sort-text-color: hsl(0, 0%, 85%);
		--sst-default-col-header-highlight-sort-vert-border-color: hsl(218, 100%, 25%);
		--sst-default-col-header-highlight-sort-horiz-border-color: hsl(218, 100%, 25%);

		--sst-default-body-even-row-bg-color: hsl(0, 0%, 85%);
		--sst-default-body-odd-row-bg-color: hsl(0, 0%, 80%);
		--sst-default-body-inner-vert-border-color: hsl(0, 0%, 45%);
		--sst-default-body-inner-horiz-border-color: hsl(0, 0%, 50%);

		--sst-default-body-highlight-sort-bg-color: hsl(113, 100%, 70%);
		--sst-default-body-highlight-sort-text-color: hsl(0, 0%, 5%);
		--sst-default-body-highlight-sort-border-color: hsl(0, 0%, 50%);

		--sst-default-button-text-color: hsl(0, 0%, 100%);
		--sst-default-button-bg-color: hsl(113, 100%, 30%);
		--sst-default-button-border-color: hsl(113, 100%, 30%);

		--sst-default-button-hover-text-color: hsl(0, 0%, 100%);
		--sst-default-button-hover-bg-color: hsl(113, 100%, 20%);
		--sst-default-button-hover-border-color: transparent;

		--sst-default-button-active-text-color: hsl(0, 0%, 100%);
		--sst-default-button-active-bg-color: hsl(113, 100%, 40%);
		--sst-default-button-active-border-color: transparent;

		--sst-default-button-disabled-text-color: hsl(0, 0%, 80%);
		--sst-default-button-disabled-bg-color: hsl(0, 0%, 60%);
		--sst-default-button-disabled-border-color: transparent;

		--sst-default-button-focus-border-color: transparent;
	}

	.dark-theme {
		--sst-default-table-wrapper-bg-color: hsl(226, 27%, 10%);
		--sst-default-table-wrapper-border-color: hsl(251, 74%, 30%);

		--sst-default-text-color: hsl(0, 0%, 5%);
		--sst-default-link-text-color: hsl(251deg 74% 40%);
		--sst-default-link-hover-text-color: hsl(251deg 74% 50%);
		--sst-default-table-outer-border-color: hsl(251, 74%, 30%);
		--sst-default-table-header-text-color: hsl(0, 0%, 95%);
		--sst-default-sort-description-text-color: hsl(165, 100%, 45%);
		--sst-default-page-range-description-text-color: hsl(165, 100%, 45%);

		--sst-default-col-header-bg-color: hsl(251, 74%, 30%);
		--sst-default-col-header-text-color: hsl(0, 0%, 95%);
		--sst-default-col-header-vert-border-color: hsl(251, 74%, 30%);
		--sst-default-col-header-horiz-border-color: hsl(251, 74%, 30%);

		--sst-default-col-header-highlight-sort-bg-color: hsl(251, 74%, 30%);
		--sst-default-col-header-highlight-sort-text-color: hsl(0, 0%, 95%);
		--sst-default-col-header-highlight-sort-vert-border-color: hsl(251, 74%, 30%);
		--sst-default-col-header-highlight-sort-horiz-border-color: hsl(251, 74%, 30%);

		--sst-default-body-even-row-bg-color: hsl(0, 0%, 50%);
		--sst-default-body-odd-row-bg-color: hsl(0, 0%, 45%);
		--sst-default-body-inner-vert-border-color: hsl(0, 0%, 30%);
		--sst-default-body-inner-horiz-border-color: hsl(0, 0%, 35%);

		--sst-default-body-highlight-sort-bg-color: hsl(165, 100%, 55%);
		--sst-default-body-highlight-sort-text-color: hsl(0, 0%, 5%);
		--sst-default-body-highlight-sort-border-color: hsl(0, 0%, 35%);

		--sst-default-button-text-color: hsl(0, 0%, 10%);
		--sst-default-button-bg-color: hsl(165, 100%, 45%);
		--sst-default-button-border-color: hsl(165, 100%, 45%);

		--sst-default-button-hover-text-color: hsl(0, 0%, 0%);
		--sst-default-button-hover-bg-color: hsl(165, 100%, 35%);
		--sst-default-button-hover-border-color: transparent;

		--sst-default-button-active-text-color: hsl(0, 0%, 0%);
		--sst-default-button-active-bg-color: hsl(165, 100%, 75%);
		--sst-default-button-active-border-color: transparent;

		--sst-default-button-disabled-text-color: hsl(0, 0%, 30%);
		--sst-default-button-disabled-bg-color: hsl(0, 0%, 50%);
		--sst-default-button-disabled-border-color: transparent;

		--sst-default-button-focus-border-color: transparent;
	}

	.resp-table-container {
		overflow-x: auto;
		white-space: nowrap;
		border-top-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-top-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	.resp-table-wrapper {
		display: inline-block;
	}

	.resp-table {
		display: table;
		color: var(--sst-text-color, var(--sst-default-text-color));
		line-height: 1.25em;
		margin: 0 auto;
	}

	.auto-layout {
		table-layout: auto;
	}

	.fixed-layout {
		table-layout: fixed;
	}

	.resp-table-header {
		display: table-header-group;
		text-align: center;
	}

	.resp-table-body {
		display: table-row-group;
	}

	.resp-table-body :global(a) {
		text-decoration: none;
		color: var(--sst-link-text-color, var(--sst-default-link-text-color));
	}

	.resp-table-body :global(a:hover) {
		text-decoration: underline;
		color: var(--sst-link-hover-text-color, var(--sst-default-link-hover-text-color));
	}

	.resp-table-row {
		display: table-row;
	}

	.resp-table-row:nth-child(even) {
		background-color: var(--sst-body-even-row-bg-color, var(--sst-default-body-even-row-bg-color));
	}

	.resp-table-row:nth-child(odd) {
		background-color: var(--sst-body-odd-row-bg-color, var(--sst-default-body-odd-row-bg-color));
	}

	.resp-table-row:last-child {
		border-bottom-left-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
		border-bottom-right-radius: var(--sst-table-border-radius, var(--sst-default-table-border-radius));
	}

	.clickable {
		cursor: pointer;
	}

	.season-stats :global(.table-body-cell),
	.combined-team-stats :global(.table-body-cell) {
		background-color: var(--table-single-season-stats-bg-color);
		border-left: 1px solid var(--table-inner-border-vert-color);
		border-top: 1px dotted var(--table-inner-border-vert-color);
	}

	.season-stats :global(.table-body-cell:first-child),
	.combined-team-stats :global(.table-body-cell:first-child) {
		border-left: 1px solid var(--table-outer-border-color);
	}
	.season-stats:first-child :global(.table-body-cell),
	.combined-team-stats:first-child :global(.table-body-cell) {
		border-top: none;
	}

	.separate-team-stats :global(.table-body-cell) {
		background-color: var(--table-separate-team-stats-bg-color);
	}

	.season-stats :global(.highlight-stat),
	.combined-team-stats :global(.highlight-stat) {
		background-color: var(--sec-color-hov);
	}

	.separate-team-stats {
		font-style: italic;
		color: var(--player-separate-team-stats-text-color);
	}

	:global(.table-body-cell) {
		padding: 2px 4px;
	}

	.career-stats-all-teams :global(.table-body-cell),
	.career-stats-for-team :global(.table-body-cell) {
		font-weight: 700;
		background-color: var(--table-totals-bg-color);
		border-left: 1px solid var(--table-totals-border-vert-color);
	}

	.career-stats-all-teams :global(.table-body-cell:first-child),
	.career-stats-for-team :global(.table-body-cell:first-child) {
		border-left: 1px solid var(--table-outer-border-color);
	}

	.career-stats-all-teams :global([data-stat-name='age']),
	.career-stats-for-team :global([data-stat-name='age']) {
		border-left: none;
	}

	.career-stats-all-teams :global([data-stat-name='player_team_id_bbref']),
	.career-stats-for-team :global([data-stat-name='player_team_id_bbref']) {
		border-left: none;
	}

	.career-stats-all-teams :global(.table-body-cell) {
		border-top: 1px solid var(--table-body-color);
		border-bottom: 1px solid var(--table-body-color);
	}

	:global(.show-separate-season-stats-button) {
		color: var(--pri-color);
		flex: 0 0 0.75rem;
		margin: auto 0;
		cursor: pointer;
		stroke: currentColor;
		stroke-width: 2;
	}

	@media screen and (min-width: 640px) {
		.light-theme,
		.lighter-theme,
		.dark-theme,
		.darker-theme,
		.custom-theme {
			--sst-default-table-header-font-size: 1.35em;
			--sst-default-table-wrapper-padding: 14px;
			--sst-default-font-size: 14px;
			--sst-default-col-header-padding: 4px 6px;
			--sst-default-body-cell-padding: 4px 6px;
		}
	}

	@media screen and (min-width: 768px) {
		.light-theme,
		.lighter-theme,
		.dark-theme,
		.darker-theme,
		.custom-theme {
			--sst-default-table-header-font-size: 1.5em;
		}
	}
</style>
