import type { MlbSeason } from '$lib/api/types';
import { HSL_COLOR_REGEX } from '$lib/regex';
import type { Writable } from 'svelte/store';

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

export type ThemeColor = 'primary' | 'secondary';
export type GameContent = 'box' | 'pbp' | 'charts';
export type SeasonContent = 'scoreboard' | 'standings' | 'team-bat' | 'team-pitch';
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

export interface SeasonStatFilter {
	season: number;
	league: League;
	gameDate: string;
	pitchStatSplit: PitchStatSplit;
	batStatSplit: BatStatSplit;
	defPosition: DefPositionNumber;
	batOrder: BatOrder;
}

export interface AllMlbSeasons {
	seasons: MlbSeason[];
}

export interface SeasonStatFilterStore {
	subscribe: Writable<SeasonStatFilter>['subscribe'];
	changeSeason: (season: number) => void;
	changeLeague: (league: League) => void;
	changeGameDate: (gameDate: string) => void;
	changePitchStatSplit: (split: PitchStatSplit) => void;
	changeBatStatSplit: (split: BatStatSplit) => void;
	changeDefPosition: (defPosition: DefPositionNumber) => void;
	changeBatOrder: (batOrder: BatOrder) => void;
}

export interface AllMlbSeasonsStore {
	subscribe: Writable<AllMlbSeasons>['subscribe'];
	changeMlbSeasons: (seasons: MlbSeason[]) => void;
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
