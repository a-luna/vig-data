import { writable } from 'svelte/store';
import { options } from './options';

export const rowCount = writable<number>(0);

const createPageNumber = () => {
	const { subscribe, update } = writable<number>(1);
	return {
		subscribe,
		update,
		set: (pageNum: number) =>
			update((store) => {
				let $rowPerPage, $rowCount;
				rowCount.subscribe((store) => ($rowCount = store));
				options.subscribe((store) => ($rowPerPage = store.rowPerPage));
				if (pageNum >= 1 && pageNum <= Math.ceil($rowCount / $rowPerPage)) {
					store = pageNum;
				}
				document.querySelector('section.datatable .dt-table').scrollTop = 0;
				return store;
			})
	};
};
export const pageNumber = createPageNumber();

export const datatableWidth = writable<number>(null);
