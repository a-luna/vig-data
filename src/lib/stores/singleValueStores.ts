import { getMostRecentScrapedDate } from '$lib/api/season';
import type { PlayerDetails } from '$lib/api/types';
import type { BatterStance, GameContent, SiteTheme, TeamStatType } from '$lib/types';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/types/runtime/store';
import { createLocalStorageValue } from './util';

export const gameContentShown: Writable<GameContent> = writable('box');
export const teamStatType: Writable<TeamStatType> = writable('bat');
export const playerSeason: Writable<number> = writable(0);
export const batStanceSplit: Writable<BatterStance> = writable('all');
export const season: Writable<number> = writable(2021);
export const siteTheme: Writable<SiteTheme> = createLocalStorageValue('vig-theme', 'notset');
export const searchResults: Writable<PlayerDetails[]> = writable([]);

export const mostRecentScrapedDate: Writable<Date> = writable<Date>(null, (set) => {
	getMostRecentScrapedDate()
		.then(set)
		.catch((err) => {
			console.error('Failed to fetch most recent scraped date!', err);
		});
	return () => {
		//
	};
});
