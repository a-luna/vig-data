import type { GameContent, SiteTheme, TeamStatType } from '$lib/types';
import { Writable, writable } from 'svelte/store';
import { localStorageValue } from './util';

export const gameContentShown: Writable<GameContent> = writable('box');
export const teamStatType: Writable<TeamStatType> = writable('bat');
export const playerSeason: Writable<number> = writable(0);
export const season: Writable<number> = writable(2021);
export const siteTheme: Writable<SiteTheme> = localStorageValue('vig-theme', 'notset');
