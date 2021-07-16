import type { GameContent, SiteTheme, TeamStatType } from '$lib/types';
import { createWritableSession } from '$lib/types';
import { Writable, writable } from 'svelte/store';

export const gameContentShown: Writable<GameContent> = writable('box');
export const teamStatType: Writable<TeamStatType> = writable('bat');
export const playerSeason: Writable<number> = writable(0);
export const gameDate: Writable<Date> = writable(new Date(2021, 3, 1));
export const season: Writable<number> = writable(2019);
export const siteTheme: Writable<SiteTheme> = createWritableSession('vig-theme', 'notset');
