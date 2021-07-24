import type { JsonValue } from '$lib/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export function localStorageValue<T extends JsonValue>(key: string, initialValue: T): Writable<T> {
	if (typeof window !== 'undefined') {
		const clientValue = JSON.parse(localStorage.getItem(key));
		if (!clientValue) localStorage.setItem(key, JSON.stringify(initialValue));

		const store = writable(clientValue || initialValue);
		store.subscribe((value) => localStorage.setItem(key, JSON.stringify(value)));
		return store;
	}
}

export function sessionStorageValue<T extends JsonValue>(key: string, initialValue: T): Writable<T> {
	if (typeof window !== 'undefined') {
		const clientValue = JSON.parse(sessionStorage.getItem(key));
		if (!clientValue) sessionStorage.setItem(key, JSON.stringify(initialValue));

		const store = writable(clientValue || initialValue);
		store.subscribe((value) => sessionStorage.setItem(key, JSON.stringify(value)));
		return store;
	}
}
