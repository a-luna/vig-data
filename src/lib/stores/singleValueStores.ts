import { dev } from '$app/env';
import type { PlayerDetails } from '$lib/api/types';
import type { ApiSource, GameContent, SiteTheme } from '$lib/types';
import { writable } from 'svelte/store';
import { createLocalStorageValue, createSessionStorageValue } from './util';

export const gameContentShown = writable<GameContent>('box');
export const playerSeason = writable<number>(0);
export const siteTheme = createLocalStorageValue<SiteTheme>('vig-theme', 'notset');
export const searchResults = writable<PlayerDetails[]>([]);
export const apiSource = createSessionStorageValue<ApiSource>('api-source', dev ? 'mock' : 'prod');
