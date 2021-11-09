import type { Pagination, PaginationStore } from '$lib/types';
import { writable } from 'svelte/store';

export function createPaginationStore(totalRows: number, pageSize: number): PaginationStore {
	const { subscribe, update } = writable<Pagination>(resetPageSettings(totalRows, pageSize));

	function resetPageSettings(totalRows: number, pageSize: number): Pagination {
		return {
			totalRows,
			pageSize,
			currentPage: 1,
			totalPages: Math.ceil(totalRows / pageSize),
			startRow: 0,
			endRow: Math.min(pageSize, totalRows)
		};
	}

	function getPageSettings(totalRows: number, pageSize: number, pageNumber: number): Pagination {
		return {
			totalRows,
			pageSize,
			currentPage: pageNumber,
			totalPages: Math.ceil(totalRows / pageSize),
			startRow: (pageNumber - 1) * pageSize,
			endRow: Math.min(pageNumber * pageSize, totalRows)
		};
	}

	return {
		subscribe,
		changeTotalRows(totalRows: number) {
			update((settings) => resetPageSettings(totalRows, settings.pageSize));
		},
		changePageSize(pageSize: number) {
			update((settings) => resetPageSettings(settings.totalRows, pageSize));
		},
		changeCurrentPage(page: number) {
			update((settings) => getPageSettings(settings.totalRows, settings.pageSize, page));
		},
		firstPage() {
			update((settings) => getPageSettings(settings.totalRows, settings.pageSize, 1));
		},
		prevPage() {
			update((settings) => getPageSettings(settings.totalRows, settings.pageSize, settings.currentPage - 1));
		},
		nextPage() {
			update((settings) => getPageSettings(settings.totalRows, settings.pageSize, settings.currentPage + 1));
		},
		lastPage() {
			update((settings) => getPageSettings(settings.totalRows, settings.pageSize, settings.totalPages));
		}
	};
}
