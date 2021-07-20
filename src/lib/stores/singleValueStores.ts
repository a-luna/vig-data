import { getMostRecentScrapedDate } from '$lib/api/season';
import type { GameContent, SiteTheme, TeamStatType } from '$lib/types';
import { createWritableSession } from '$lib/types';
import { Writable, writable } from 'svelte/store';

export const gameContentShown: Writable<GameContent> = writable('box');
export const teamStatType: Writable<TeamStatType> = writable('bat');
export const playerSeason: Writable<number> = writable(0);
export const scoreboardDate: Writable<Date> = writable(new Date(), async (set) => {
	const scrapeDate = await getMostRecentScrapedDate();
	set(scrapeDate);
	return () => {};
});
export const season: Writable<number> = writable(2021);
export const siteTheme: Writable<SiteTheme> = createWritableSession('vig-theme', 'notset');
