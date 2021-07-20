import type { MlbSeason, PlayerSearchResult } from '$lib/api/types';
import { HSL_COLOR_REGEX } from '$lib/regex';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export class HslColor {
	constructor(public hue: number, public saturation: number, public lightness: number) {}
	public toString = (): string => `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
	public changeHue = (newHue: number): HslColor => new HslColor(newHue, this.saturation, this.lightness);
	public adjustSaturation = (dim: number): HslColor =>
		new HslColor(this.hue, Math.floor(this.saturation * dim), this.lightness);
	public adjustLightness = (dim: number): HslColor =>
		new HslColor(this.hue, this.saturation, Math.floor(this.lightness * dim));
	public static fromString = (hsl_color: string): HslColor => {
		const match = HSL_COLOR_REGEX.exec(hsl_color);
		return match
			? new HslColor(parseInt(match.groups.hue), parseInt(match.groups.saturation), parseInt(match.groups.lightness))
			: new HslColor(0, 0, 0);
	};
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function persist(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function createWritableSession<JsonValue>(key: string, initialValue: JsonValue): Writable<JsonValue> {
	if (typeof window !== 'undefined') {
		const sessionValue = JSON.parse(localStorage.getItem(key));
		if (!sessionValue) persist(key, initialValue);

		const store = writable(sessionValue || initialValue);
		store.subscribe((value) => persist(key, value));
		return store;
	}
}

export type TeamID =
	| 'ARI'
	| 'ATL'
	| 'BAL'
	| 'BOS'
	| 'CHW'
	| 'CHC'
	| 'CIN'
	| 'CLE'
	| 'COL'
	| 'DET'
	| 'HOU'
	| 'KCR'
	| 'LAA'
	| 'LAD'
	| 'MIA'
	| 'MIL'
	| 'MIN'
	| 'NYY'
	| 'NYM'
	| 'OAK'
	| 'PHI'
	| 'PIT'
	| 'SDP'
	| 'SEA'
	| 'SFG'
	| 'STL'
	| 'TBR'
	| 'TEX'
	| 'TOR'
	| 'WSN';
export type ThemeColor = 'primary' | 'secondary';
export type SiteTheme = 'light' | 'dark' | 'notset';
export type GameContent = 'box' | 'pbp' | 'charts';
export type TeamStatType = 'bat' | 'pitch';
export type PlayerContent = 'percentiles' | 'velo-loc';
export type League = 'both' | 'al' | 'nl';
export type BatStatSplit = 'all' | 'starters' | 'subs' | 'defpos' | 'batorder';
export type PitchStatSplit = 'all' | 'sp' | 'rp';
export type BatterStance = 'both' | 'rhb' | 'lhb';
export type DefPositionNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type BatOrder = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface PlayerCardLink {
	text: string;
	url: string;
}

export interface SelectMenuOption {
	text: string;
	value: number | string;
	optionNumber: number;
	active: boolean;
}

export interface NavMenuItem {
	label: string;
	url: string;
}

export interface TeamStatFilter {
	season: number;
	league: League;
	statType: TeamStatType;
	pitchStatSplit: PitchStatSplit;
	batStatSplit: BatStatSplit;
	defPosition: DefPositionNumber[];
	batOrder: BatOrder[];
}

export interface AllMlbSeasons {
	seasons: MlbSeason[];
}

export interface SearchResults {
	results: PlayerSearchResult[];
}

export interface TeamStatFilterStore {
	subscribe: Writable<TeamStatFilter>['subscribe'];
	changeSeason: (season: number) => void;
	changeLeague: (league: League) => void;
	changeStatType: (statType: TeamStatType) => void;
	changePitchStatSplit: (split: PitchStatSplit) => void;
	changeBatStatSplit: (split: BatStatSplit) => void;
	changeDefPosition: (defPosition: DefPositionNumber[]) => void;
	changeBatOrder: (batOrder: BatOrder[]) => void;
}

export interface AllMlbSeasonsStore {
	subscribe: Writable<AllMlbSeasons>['subscribe'];
	changeMlbSeasons: (seasons: MlbSeason[]) => void;
}

export interface SearchResultsStore {
	subscribe: Writable<SearchResults>['subscribe'];
	changeSearchResults: (seasons: PlayerSearchResult[]) => void;
}

export interface TimeSpan {
	years: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	totalYears: number;
	totalDays: number;
	totalHours: number;
	totalMinutes: number;
	totalSeconds: number;
	totalMilliseconds: number;
}
