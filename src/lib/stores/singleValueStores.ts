import { Writable, writable } from 'svelte/store';
import type { GameContent } from '$lib/types';

export const useDarkTheme: Writable<boolean> = writable(true);
export const gameContentShown: Writable<GameContent> = writable('box');
export const selectedSeason: Writable<number> = writable(2019);
export const scoreboardDate: Writable<string> = writable('20190328');
