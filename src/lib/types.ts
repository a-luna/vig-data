import { HSL_COLOR_REGEX } from '$lib/regex';
import { getRandomHexString } from '$lib/util/ui';
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

export interface CarouselSettings {
	width: string;
	padding: string;
	props?: {
		loop?: boolean;
		dots?: boolean;
		perPage?: number;
	};
}

export interface PieChartSettings {
	pieWidth: string;
	chartHeight: string;
	chartTitleFontSize: string;
	legendFontSize: string;
	legendFontWeight: number;
}

export interface PlayerPageSettings {
	playerDetailsFlexStyles: string;
	playerNameFontSize: string;
	playerDetailsSettings: { fontSize: string; majorGap: string; minorGap: string };
	carouselSettings: CarouselSettings;
	chartSettings: PieChartSettings;
}

export interface PieSliceData {
	value: number;
	pieTotal: number;
	label: string;
	color: string;
	unit: string;
	description?: string;
	legend?: string;
	tooltip?: string;
}

export class PieSlice {
	readonly id: string;
	readonly percent: number;
	description: string;
	legend: string;
	tooltip: string;
	startCoordinates: [number, number];
	endCoordinates: [number, number];
	hovering: boolean;
	constructor(
		public value: number = 0,
		public pieTotal: number = 0,
		public label: string = '',
		public color: string = '#FFFFFF',
		public unit: string = 'items'
	) {
		this.id = `${getRandomHexString(4)}-${getRandomHexString(4)}`;
		this.percent = parseFloat((this.value / this.pieTotal).toFixed(3));
		this.description = `${Math.round(this.percent * 100)}% ${this.label}`;
		this.legend = this.description;
		this.tooltip = `${Math.round(this.percent * 100)}% ${this.label} (${this.value} ${this.unit})`;
		this.startCoordinates = [0, 0];
		this.endCoordinates = [0, 0];
		this.hovering = false;
	}

	public static fromObject = (obj: PieSliceData): PieSlice => {
		const newSlice = new PieSlice(obj.value, obj.pieTotal, obj.label, obj.color, obj.unit);
		newSlice.description = obj?.description ?? newSlice.description;
		newSlice.legend = obj?.legend ?? newSlice.legend;
		newSlice.tooltip = obj?.tooltip ?? newSlice.tooltip;
		return newSlice;
	};
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export const TEAM_IDS = [
	'ARI',
	'ATL',
	'BAL',
	'BOS',
	'CHW',
	'CHC',
	'CIN',
	'CLE',
	'COL',
	'DET',
	'HOU',
	'KCR',
	'LAA',
	'LAD',
	'MIA',
	'MIL',
	'MIN',
	'NYY',
	'NYM',
	'OAK',
	'PHI',
	'PIT',
	'SDP',
	'SEA',
	'SFG',
	'STL',
	'TBR',
	'TEX',
	'TOR',
	'WSN'
] as const;
export type TeamID = typeof TEAM_IDS[number];
export type ThemeColor = 'primary' | 'secondary';
export type ButtonColor =
	| 'red'
	| 'pink'
	| 'orange'
	| 'teal'
	| 'green'
	| 'blue'
	| 'gray'
	| 'yellow'
	| 'indigo'
	| ThemeColor;
export type SiteTheme = 'light' | 'dark' | 'notset';
export type ApiSource = 'dev' | 'mock' | 'prod';
export type GameContent = 'box' | 'pbp' | 'charts';
export type TeamStatType = 'bat' | 'pitch';
export type League = 'both' | 'al' | 'nl';
export type PlayerPitchContent = 'career-stats' | 'split-stats' | 'pitch-mix' | 'pitch-type-percentiles';
export type BatterPieChart = 'start/bench' | 'defpos' | 'batorder';
export type PitcherPieChart = 'role' | 'pitch-mix';
export type BatStatSplit = 'all' | 'starters' | 'subs' | 'defpos' | 'batorder';
export type PitchStatSplit = 'all' | 'sp' | 'rp';
export type BatterStance = 'all' | 'rhb' | 'lhb';
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

export interface GameDateStore {
	subscribe: Writable<Date>['subscribe'];
	update: Writable<Date>['update'];
	set: Writable<Date>['set'];
	nextDay: () => void;
	prevDay: () => void;
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
