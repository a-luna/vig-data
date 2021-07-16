import { columns } from './stores/columns';
import { data } from './stores/data';
import { globalFilter, localFilter } from './stores/filters';
import { options } from './stores/options';
import { datatableWidth, pageNumber } from './stores/state';
import type { RowData, TableDimensions } from './types';

export const datatable = {
	init: (): void => {
		datatable.resize();
		datatable.addEventScrollX();
		datatable.getColumns();
		const tableEl = document.querySelector('section.datatable');
		if (tableEl !== null && tableEl.parentElement !== null) {
			new ResizeObserver(() => {
				datatable.resize();
			}).observe(tableEl.parentElement);
		}
	},
	reset: (): void => {
		pageNumber.update((store) => {
			store = 1;
			return store;
		});
		globalFilter.remove();
		localFilter.remove();
		columns.set([]);
	},
	setRows: (arr: RowData[]): void => {
		arr.forEach((item) => {
			Object.keys(item).forEach((k) => {
				if (item[k] === null) {
					item[k] = '';
				}
			});
		});
		data.set(arr);
		return;
	},
	getSize: (): TableDimensions => {
		const parent = document.querySelector('section.datatable').parentNode as Element;
		const style = getComputedStyle(parent);
		const rect = parent.getBoundingClientRect();
		const getNumber = (pxValue) => {
			return parseFloat(pxValue.replace('px', ''));
		};
		return {
			parentWidth: rect.width,
			parentHeight: rect.height,
			width:
				(rect.width -
					getNumber(style.paddingLeft) -
					getNumber(style.paddingRight) -
					getNumber(style.borderLeftWidth) -
					getNumber(style.borderRightWidth)) /
				rect.width,
			height:
				(rect.height -
					getNumber(style.paddingTop) -
					getNumber(style.paddingBottom) -
					getNumber(style.borderTopWidth) -
					getNumber(style.borderBottomWidth)) /
				rect.height,
			top: style.paddingTop,
			right: style.paddingRight,
			bottom: style.paddingBottom,
			left: style.paddingLeft
		};
	},
	resize: (): void => {
		if (!document.querySelector('section.datatable')) return;
		const size = datatable.getSize();
		const tableContainer = document.querySelector<HTMLElement>('section.datatable .dt-table');
		if (options.get().scrollY) {
			tableContainer.style.height = datatable.getTableContainerHeight(size.parentHeight * size.height) + 'px';
			columns.redraw();
		}
		datatableWidth.set(size.parentWidth * size.width);
		if (size.parentWidth * size.width < document.querySelector<HTMLElement>('section.datatable table')?.offsetWidth) {
			tableContainer.style.overflowX = 'auto';
		}
	},
	getTableContainerHeight: (height: number): void => {
		let paginationBlock;
		if (
			options.get().pagination &&
			(options.get().blocks.paginationButtons || options.get().blocks.paginationRowCount)
		) {
			paginationBlock = true;
		}
		const calc = [
			options.get().blocks.searchInput
				? document.querySelector('.datatable .dt-search').getBoundingClientRect().height
				: 0,
			paginationBlock ? document.querySelector('.datatable .dt-pagination').getBoundingClientRect().height : 0
		];
		const sum = (a, b) => a + b;
		document.querySelector<HTMLElement>('section.datatable .dt-table').style.height = height - calc.reduce(sum) + 'px';
	},
	addEventScrollX: (): void => {
		if (options.get().scrollY) {
			document.querySelector('section.datatable .dt-table').addEventListener('scroll', (e) => {
				const eventTarget = e.target as Element;
				document.querySelector<HTMLElement>('.dt-header').style.left = -1 * eventTarget.scrollLeft + 'px';
			});
		}
	},
	getColumns: (): void => {
		const columnList = [];
		let i = 0;
		document.querySelectorAll('.datatable table thead th').forEach((th: HTMLElement) => {
			columnList.push({
				index: i,
				html: th.innerHTML,
				key: datatable.getKey(th.dataset.key),
				sort: null,
				classList: th.classList,
				minWidth: th.getBoundingClientRect().width
			});
			th.addEventListener(
				'click',
				(e) => {
					const eventTarget = e.target as HTMLElement;
					columns.sort(eventTarget, datatable.getKey(th.dataset.key));
				},
				true
			);
			i++;
		});
		columns.set(columnList);
	},
	getKey: (key: string): ((x: RowData) => string) => {
		if (!key) return;
		if (key && key.indexOf('=>') > 0) {
			return new Function(`'use strict';return (${key})`)();
		}
		return (x) => x[key];
	}
};
