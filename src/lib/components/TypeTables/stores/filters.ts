import { writable } from 'svelte/store';
import type { RowData, TableFilter } from '../types';

const createLocal = () => {
	const { subscribe, update } = writable<TableFilter[]>([]);
	return {
		subscribe,
		update,
		add: (key: string, value: RowData) =>
			update((store) => {
				const filter = { key: key, value: value } as TableFilter;
				store = store.filter((item) => {
					return item.key !== key && item.value.length > 0;
				});
				store.push(filter);
				return store;
			}),
		remove: () =>
			update((store) => {
				store = [];
				return store;
			})
	};
};
export const localFilter = createLocal();

const createGlobal = () => {
	const { subscribe, update } = writable<string>(null);
	return {
		subscribe,
		set: (value: string) =>
			update((store) => {
				store = value.length > 0 ? value : null;
				return store;
			}),
		remove: () =>
			update((store) => {
				store = null;
				return store;
			})
	};
};
export const globalFilter = createGlobal();
