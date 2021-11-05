import { getMostRecentScrapedDate } from '$lib/api/season';
import type { PlayerDetails } from '$lib/api/types';
import type { BatStatSplit, GameContent, SiteTheme, TeamStatType } from '$lib/types';
import { writable } from 'svelte/store';
import { createLocalStorageValue } from './util';

export const gameContentShown = writable<GameContent>('box');
export const teamStatType = writable<TeamStatType>('bat');
export const playerSeason = writable<number>(0);
export const batStanceSplit = writable(<BatStatSplit>'all');
export const season = writable<number>(2021);
export const siteTheme = createLocalStorageValue<SiteTheme>('vig-theme', 'notset');
export const searchResults = writable<PlayerDetails[]>([]);

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
