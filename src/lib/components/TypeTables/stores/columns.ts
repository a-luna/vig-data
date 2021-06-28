import { writable } from 'svelte/store';
import type { Column, RowData } from '../types';
import { data } from './data';
import { localFilter } from './filters';
import { options } from './options';
import { pageNumber } from './state';

const createColumns = () => {
	const { subscribe, set, update } = writable<Column[]>([]);
	return {
		subscribe,
		set,
		update,
		get: () => {
			let $columns;
			columns.subscribe((store) => ($columns = store));
			return $columns;
		},
		sort: (element: HTMLElement, key: (x: RowData) => string) => {
			if (options.get().sortable !== true || typeof key === 'undefined') {
				return;
			}
			if (element.classList.contains('sortable') && element.classList.contains('asc')) {
				Array.from(element.parentNode.children).forEach((item) => item.classList.remove('asc', 'desc'));
				element.classList.add('desc');
				data.sortDesc(key);
				pageNumber.set(1);
			} else {
				Array.from(element.parentNode.children).forEach((item) => item.classList.remove('desc', 'asc'));
				element.classList.add('asc');
				data.sortAsc(key);
				pageNumber.set(1);
			}
			columns.redraw();
		},
		filter: (key, value) => {
			pageNumber.set(1);
			localFilter.add(key, value);
			columns.redraw();
		},
		draw: () => {
			setTimeout(() => {
				const tbody = document.querySelector<HTMLElement>('.datatable table tbody tr');
				if (tbody === null) return;
				const thead = document.querySelectorAll<HTMLElement>('.dt-header thead tr');
				const $columns = columns.get();
				thead.forEach((tr: HTMLElement) => {
					let i = 0;
					Array.from(tbody.children).forEach((td: HTMLElement) => {
						const th = tr.children[i] as HTMLElement;
						const thW = th.getBoundingClientRect().width;
						const tdW = td.getBoundingClientRect().width;
						// let columnMinWidth = parseFloat(columns.get()[i].minWidth.replace('px', ''))
						if (tdW > thW) {
							th.style.minWidth = tdW + 'px';
							th.style.maxWidth = tdW + 'px';
							$columns[i].minWidth = tdW;
						} else {
							td.style.minWidth = thW + 'px';
							td.style.maxWidth = thW + 'px';
							$columns[i].minWidth = thW;
						}
						i++;
					});
				});
			}, 50);
		},
		redraw: () => {
			if (options.get().scrollY === false) {
				return;
			}
			setTimeout(() => {
				const tbody = document.querySelector<HTMLElement>('.datatable table tbody tr');
				if (tbody === null) return;
				const thead = document.querySelectorAll<HTMLElement>('.dt-header thead tr');
				thead.forEach((tr: HTMLElement) => {
					let i = 0;
					Array.from(tbody.children).forEach((td: HTMLElement) => {
						const th = tr.children[i] as HTMLElement;
						const thW = th.getBoundingClientRect().width;
						const tdW = td.getBoundingClientRect().width;
						const columnMinWidth = parseFloat(columns.get()[i].minWidth);
						if (tdW > thW || thW > columnMinWidth) {
							th.style.minWidth = tdW + 'px';
							th.style.maxWidth = tdW + 'px';
						} else {
							td.style.minWidth = thW + 'px';
							td.style.maxWidth = thW + 'px';
						}
						i++;
					});
				});
			}, 50);
		}
	};
};
export const columns = createColumns();
