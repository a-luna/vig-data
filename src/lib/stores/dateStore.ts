import { browser } from '$app/env';
import type { GameDateStore } from '$lib/types';
import { getDateFromString, getStringFromDate } from '$lib/util';
import { derived, writable } from 'svelte/store';
import { createLocalStorageValue } from './util';

export const mostRecentScrapedDateStore = createLocalStorageValue<string>('most-recent-scraped-date', '20211003');
export const mostRecentScrapedDate = derived(mostRecentScrapedDateStore, ($mostRecentScrapedDateStore) => {
	if ($mostRecentScrapedDateStore) {
		return getDateFromString($mostRecentScrapedDateStore).value;
	}
	return null;
});

function gameDateStore(key: string): GameDateStore {
	const { subscribe, set, update } = writable<Date>(null, (set) => {
		let storedValue: string;
		if (browser) {
			storedValue = window.sessionStorage.getItem(key);
			if (storedValue) {
				set(getDateFromString(storedValue).value);
				return () => {
					//
				};
			}
		}
		let date: Date;
		const unsubscribe = mostRecentScrapedDate.subscribe((value) => (date = value));
		set(date);
		return () => {
			unsubscribe();
		};
	});
	subscribe((value) => {
		if (browser) {
			window.sessionStorage.setItem(key, getStringFromDate(value));
		}
	});

	function nextDay() {
		update((date) => {
			date = new Date(date);
			date.setDate(date.getDate() + 1);
			return date;
		});
	}

	function prevDay() {
		update((date) => {
			date = new Date(date);
			date.setDate(date.getDate() - 1);
			return date;
		});
	}

	return {
		subscribe,
		set,
		update,
		nextDay,
		prevDay,
	};
}

export const scoreboardDate = gameDateStore('scoreboard-date');
export const homePageDate = gameDateStore('homepage-date');
