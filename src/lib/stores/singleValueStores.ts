import type { PlayerDetails } from '$lib/api/types';
import type { GameContent, SiteTheme } from '$lib/types';
import { getDateFromString } from '$lib/util';
import { derived, writable } from 'svelte/store';
import { createLocalStorageValue } from './util';

export const gameContentShown = writable<GameContent>('box');
export const playerSeason = writable<number>(0);
export const siteTheme = createLocalStorageValue<SiteTheme>('vig-theme', 'notset');
export const searchResults = writable<PlayerDetails[]>([]);

export const mostRecentScrapedDateStore = createLocalStorageValue<string>('most-recent-scraped-date', '20211003');
export const mostRecentScrapedDate = derived(mostRecentScrapedDateStore, ($mostRecentScrapedDateStore) => {
	if ($mostRecentScrapedDateStore) {
		return getDateFromString($mostRecentScrapedDateStore).value;
	}
	return null;
});
