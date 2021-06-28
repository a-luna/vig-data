import { writable } from 'svelte/store';
import type { BlockOptions, LabelOptions, TableOptions } from '../types';

const createOptions = () => {
	const { subscribe, set } = writable<TableOptions>({
		sortable: true,
		pagination: true,
		rowPerPage: 50,
		columnFilter: false,
		scrollY: true,
		css: true,
		labels: {
			search: 'Search...',
			filter: 'Filter',
			noRows: 'No entries to found',
			info: 'Showing {start} to {end} of {rows} entries',
			previous: 'Previous',
			next: 'Next'
		},
		blocks: {
			searchInput: true,
			paginationButtons: true,
			paginationRowCount: true
		}
	});
	return {
		subscribe,
		set,
		get: () => {
			let $store;
			options.subscribe((store) => ($store = store));
			return $store;
		},
		update: (opt: TableOptions) => {
			opt.labels = opt.labels ? opt.labels : ({} as LabelOptions);
			const labels: LabelOptions = {
				search: typeof opt.labels.search === 'string' ? opt.labels.search : 'Search...',
				filter: typeof opt.labels.filter === 'string' ? opt.labels.filter : 'Filter',
				noRows: typeof opt.labels.noRows === 'string' ? opt.labels.noRows : 'No entries to found',
				info: typeof opt.labels.info === 'string' ? opt.labels.info : 'Showing {start} to {end} of {rows} entries',
				previous: typeof opt.labels.previous === 'string' ? opt.labels.previous : 'Previous',
				next: typeof opt.labels.next === 'string' ? opt.labels.next : 'Next'
			};
			opt.blocks = opt.blocks ? opt.blocks : ({} as BlockOptions);
			const blocks: BlockOptions = {
				searchInput: typeof opt.blocks.searchInput === 'boolean' ? opt.blocks.searchInput : true,
				paginationButtons: typeof opt.blocks.paginationButtons === 'boolean' ? opt.blocks.paginationButtons : true,
				paginationRowCount: typeof opt.blocks.paginationRowCount === 'boolean' ? opt.blocks.paginationRowCount : true
			};
			const parsed: TableOptions = {
				sortable: typeof opt.sortable === 'boolean' ? opt.sortable : true,
				pagination: typeof opt.pagination === 'boolean' ? opt.pagination : true,
				rowPerPage: typeof opt.rowPerPage === 'number' ? opt.rowPerPage : 50,
				columnFilter: typeof opt.columnFilter === 'boolean' ? opt.columnFilter : false,
				scrollY: typeof opt.scrollY === 'boolean' ? opt.scrollY : true,
				css: typeof opt.css === 'boolean' ? opt.css : true,
				labels: labels,
				blocks: blocks
			};
			options.set(parsed);
		}
	};
};
export const options = createOptions();
