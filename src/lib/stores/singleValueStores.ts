import type { GameContent, SeasonContent } from '$lib/types';
import { Writable, writable } from 'svelte/store';

export const useDarkTheme: Writable<boolean> = writable(true);
export const gameContentShown: Writable<GameContent> = writable('box');
export const seasonContentShown: Writable<SeasonContent> = writable('standings');
export const playerSeason: Writable<number> = writable(0);
