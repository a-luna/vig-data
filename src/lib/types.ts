import type { Writable } from 'svelte/store';
import type { MlbSeason } from './api/types';
import { HSL_COLOR_REGEX } from './regex';

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
export type League = 'both' | 'al' | 'nl';
export type SeasonContent = 'scoreboard' | 'standings' | 'team-bat' | 'team-pitch';
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

export interface SeasonSettings {
	show: SeasonContent;
	league: League;
}

export interface TeamBatStatFilter {
	split: BatStatSplit;
	defPosition: DefPositionNumber;
	lineupSlot: BatOrder;
}

export interface TeamPitchStatFilter {
	split: PitchStatSplit;
}

export interface AllMlbSeasons {
	seasons: MlbSeason[];
}

export interface SeasonSettingsStore {
	subscribe: Writable<SeasonSettings>['subscribe'];
	changeLeague: (league: League) => void;
	changeContent: (show: SeasonContent) => void;
}

export interface TeamBatStatFilterStore {
	subscribe: Writable<TeamBatStatFilter>['subscribe'];
	changeSplit: (split: BatStatSplit) => void;
	changeDefPosition: (defPosition: DefPositionNumber) => void;
	changeLineupSlot: (lineupSlot: BatOrder) => void;
}

export interface TeamPitchStatFilterStore {
	subscribe: Writable<TeamPitchStatFilter>['subscribe'];
	changeSplit: (split: PitchStatSplit) => void;
}

export interface AllMlbSeasonsStore {
	subscribe: Writable<AllMlbSeasons>['subscribe'];
	changeMlbSeasons: (seasons: MlbSeason[]) => void;
}
