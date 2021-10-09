import { getMostRecentScrapedDate } from '$lib/api/season';
// import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { createLocalStorageValue } from './util';

// export const gameContentShown: Writable<GameContent> = writable('box');
// export const teamStatType: Writable<TeamStatType> = writable('bat');
// export const playerSeason: Writable<number> = writable(0);
// export const batStanceSplit: Writable<BatterStance> = writable('all');
// export const season: Writable<number> = writable(2021);
// export const siteTheme: Writable<SiteTheme> = createLocalStorageValue('vig-theme', 'notset');
// export const searchResults: Writable<PlayerDetails[]> = writable([]);

export const gameContentShown = writable('box');
export const teamStatType = writable('bat');
export const playerSeason = writable(0);
export const batStanceSplit = writable('all');
export const season = writable(2021);
export const siteTheme = createLocalStorageValue('vig-theme', 'notset');
export const searchResults = writable([]);

// export const mostRecentScrapedDate: Writable<Date> = writable<Date>(null, (set) => {
export const mostRecentScrapedDate = writable<Date>(null, (set) => {
	getMostRecentScrapedDate()
		.then(set)
		.catch((err) => {
			console.error('Failed to fetch most recent scraped date!', err);
		});
	return () => {
		//
	};
});
