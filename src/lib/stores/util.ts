import type { JsonValue } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function createLocalStorageValue<T extends JsonValue>(key: string, initialValue: T): Writable<T> {
	if (typeof window !== 'undefined') {
		const clientValue = JSON.parse(localStorage.getItem(key));
		if (!clientValue) localStorage.setItem(key, JSON.stringify(initialValue));

		const store = writable(clientValue || initialValue);
		store.subscribe((value) => localStorage.setItem(key, JSON.stringify(value)));
		return store;
	}
}

export function createSessionStorageValue<T extends JsonValue>(key: string, initialValue: T): Writable<T> {
	if (typeof window !== 'undefined') {
		const clientValue = JSON.parse(sessionStorage.getItem(key));
		if (!clientValue) sessionStorage.setItem(key, JSON.stringify(initialValue));

		const store = writable(clientValue || initialValue);
		store.subscribe((value) => sessionStorage.setItem(key, JSON.stringify(value)));
		return store;
	}
}

// import { derived, writable, Writable } from "svelte/store";

// class MyFormStore {
//     constructor(
//         public firstname: Writable<string> = writable(''),
//         public lastname: Writable<string> = writable(''),
//     ) { }

//     get fullname() {
//         // Use derived to access writable values and export as readonly
//         return derived(
//             [this.firstname, this.lastname],
//             ([$firstName, $lastName]) => {
//                 return $firstName + " " + $lastName
//             }
//         )
//     }
// }

// Export a singleton
// export const myFormStore = new MyFormStore();

// Allow for multiple stores (good for contexts)
// export const createMyFormStore = () => new MyFormStore();
