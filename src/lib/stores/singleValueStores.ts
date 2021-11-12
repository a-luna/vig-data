import type { PlayerDetails } from '$lib/api/types';
import type { GameContent, SiteTheme } from '$lib/types';
import { writable } from 'svelte/store';
import { createLocalStorageValue } from './util';

export const gameContentShown = writable<GameContent>('box');
export const playerSeason = writable<number>(0);
export const siteTheme = createLocalStorageValue<SiteTheme>('vig-theme', 'notset');
export const searchResults = writable<PlayerDetails[]>([]);
