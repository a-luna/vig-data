import {
	GAME_DATE_REGEX,
	GAME_ID_REGEX,
	NUMBER_OF_PIXELS_REGEX,
	PITCH_SEQ_NUMS_REGEX,
	SEASON_DATE_REGEX
} from '$lib/regex';
import type { AtBatPitchDescription, PitchFx, Result, StrikeZoneCorner, StrikeZoneDimensions } from './api/types';
import { PITCH_TYPE_NAME_TO_ABBREV_MAP } from './constants';
import type { TimeSpan } from './types';

export function scrollToTop(): void {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const getCSSPropNumber = (element: HTMLElement, propName: string): number => {
	const propValue = getCSSPropValue(element, propName);
	return parseInt(propValue);
};

export const getCSSPropNumberOfPixels = (element: HTMLElement, propName: string): number => {
	const propValue = getCSSPropValue(element, propName);
	const match = NUMBER_OF_PIXELS_REGEX.exec(propValue);
	return match ? parseInt(match.groups.pixels) : 0;
};

export function getDateFromString(date_str: string): Result<Date> {
	const matchFormat1 = GAME_DATE_REGEX.exec(date_str);
	const matchFormat2 = SEASON_DATE_REGEX.exec(date_str);
	if (!matchFormat1 && !matchFormat2)
		return { success: false, message: 'Game date must be in either format: YYYYMMDD, YYYY-MM-DD' };

	const match = matchFormat1 || matchFormat2;
	const year = parseInt(match.groups.year);
	const month = parseInt(match.groups.month) - 1;
	const day = parseInt(match.groups.day);
	return {
		success: true,
		value: new Date(year, month, day)
	};
}

export function formatDateString(date: Date): string {
	if (date) {
		return date.toDateString().slice(3);
	}
}

export function getSeasonDates(start_str: string, end_str: string): Result<Date[]> {
	const matchStartDate = SEASON_DATE_REGEX.exec(start_str);
	const matchEndDate = SEASON_DATE_REGEX.exec(end_str);
	if (!matchStartDate || !matchEndDate)
		return {
			success: false,
			message: 'Season start/end dates must be in the correct format: YYYY-MM-DD'
		};
	const start_year = parseInt(matchStartDate.groups.year);
	const start_month = parseInt(matchStartDate.groups.month) - 1;
	const start_day = parseInt(matchStartDate.groups.day);
	const end_year = parseInt(matchEndDate.groups.year);
	const end_month = parseInt(matchEndDate.groups.month) - 1;
	const end_day = parseInt(matchEndDate.groups.day);
	return {
		success: true,
		value: [new Date(start_year, start_month, start_day), new Date(end_year, end_month, end_day)]
	};
}

export function getDateFromGameId(game_id: string): Result<Date> {
	return GAME_ID_REGEX.test(game_id)
		? getDateFromString(game_id.slice(3, 11))
		: {
				success: false,
				message: 'Game ID must be in the correct format: (team_id)YYYYMMDD(game_num)'
		  };
}

export function getStringFromDate(date: Date): string {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}${month}${day}`;
}

export function formatAtBatResult(atBatResult: string): string[] {
	const split = atBatResult.split(';');
	return split.length > 1 ? split : [atBatResult];
}

export function createPitchDescriptionList(pitchSequence: string[][], pfx: PitchFx[]): AtBatPitchDescription[] {
	const validPfx = pfx.filter((pfx) => pfx.basic_type !== 'Z');
	const pitchDescriptions = pitchSequence.map((p) => formatPitchDescription(p, validPfx));
	return pitchDescriptions.slice(0, -1);
}

function formatPitchDescription(pitch_des: string[], pfx: PitchFx[]): AtBatPitchDescription {
	const pitch: AtBatPitchDescription = {
		number: '',
		description: '',
		type: '',
		blocked_by_c: false,
		out_of_boundary: false,
		non_pitch_event: false
	};
	if (pitch_des.length === 3) {
		const match = PITCH_SEQ_NUMS_REGEX.exec(pitch_des[0]);
		pitch.number = match ? match.groups.num : '';
		pitch.description = pitch_des[1];
		pitch.type = pitch_des[2];
		pitch.non_pitch_event = pitch.number === '';

		if (pitch.description.includes('pitch was blocked by catcher')) {
			pitch.description = pitch.description.split('\n')[0];
			pitch.blocked_by_c = true;
		}

		if (pitch.number !== '') {
			const pitchNumber = parseInt(pitch.number);
			const matches = pfx.filter((pfx) => pfx.ab_count === pitchNumber);
			if (matches.length === 1) {
				pitch.out_of_boundary = matches[0].is_out_of_boundary;
			}
		}
	}
	return pitch;
}

export function getPitchTypeAbbrevFromName(pitchType: string): string {
	return Object.prototype.hasOwnProperty.call(PITCH_TYPE_NAME_TO_ABBREV_MAP, pitchType.toLowerCase())
		? PITCH_TYPE_NAME_TO_ABBREV_MAP[pitchType.toLowerCase()]
		: PITCH_TYPE_NAME_TO_ABBREV_MAP['unknown'];
}

export function getXAxisMinMax(): [number, number] {
	const xMin = getCSSPropNumber(document.documentElement, '--ploc-x-min');
	const xMax = getCSSPropNumber(document.documentElement, '--ploc-x-max');
	return [xMin, xMax];
}

export function getYAxisMinMax(): [number, number] {
	const yMin = getCSSPropNumber(document.documentElement, '--ploc-y-min');
	const yMax = getCSSPropNumber(document.documentElement, '--ploc-y-max');
	return [yMin, yMax];
}

export function identifyPfxDataBeyondBoundary(pfx: PitchFx[]): PitchFx[] {
	const [xMin, xMax] = getXAxisMinMax();
	const [yMin, yMax] = getYAxisMinMax();
	pfx.map((pfx) => (pfx.is_out_of_boundary = pfx.px > xMax || pfx.px < xMin || pfx.pz > yMax || pfx.pz < yMin));
	return pfx;
}

export function addStrikeZoneCornersToPfxData(pfx: PitchFx[]): PitchFx[] {
	const zoneLeft = -0.70833;
	const zoneRight = 0.70833;
	const zoneTop = getZoneTop(pfx);
	const zoneBottom = getZoneBottom(pfx);

	const zoneTopLeft = fakePfxData();
	zoneTopLeft.px = zoneLeft;
	zoneTopLeft.pz = zoneTop;
	zoneTopLeft.mlbam_pitch_name = 'TL';
	pfx.push(zoneTopLeft);

	const zoneTopRight = fakePfxData();
	zoneTopRight.px = zoneRight;
	zoneTopRight.pz = zoneTop;
	zoneTopRight.mlbam_pitch_name = 'TR';
	pfx.push(zoneTopRight);

	const zoneBottomLeft = fakePfxData();
	zoneBottomLeft.px = zoneLeft;
	zoneBottomLeft.pz = zoneBottom;
	zoneBottomLeft.mlbam_pitch_name = 'BL';
	pfx.push(zoneBottomLeft);

	return pfx;
}

function fakePfxData() {
	return {
		bb_game_id: '',
		bbref_game_id: '',
		pitch_app_id: '',
		inning_id: '',
		at_bat_id: '',
		pitcher_id_bbref: '',
		batter_id_bbref: '',
		pitcher_team_id_bb: '',
		opponent_team_id_bb: '',
		p_throws: '',
		stand: '',
		des: '',
		basic_type: 'Z',
		pdes: '',
		mlbam_pitch_name: '',
		park_sv_id: '',
		game_start_time_utc: '',
		time_pitch_thrown_utc: '',
		pbp_play_result: '',
		pbp_runs_outs_result: '',
		pitcher_id_mlb: 0,
		batter_id_mlb: 0,
		pitch_id: 0,
		inning: 0,
		ab_total: 0,
		ab_count: 0,
		ab_id: 0,
		table_row_number: 0,
		strikes: 0,
		balls: 0,
		seconds_since_game_start: 0,
		has_zone_location: 0,
		batter_did_swing: 0,
		batter_made_contact: 0,
		called_strike: 0,
		swinging_strike: 0,
		inside_strike_zone: 0,
		outside_strike_zone: 0,
		swing_inside_zone: 0,
		swing_outside_zone: 0,
		contact_inside_zone: 0,
		contact_outside_zone: 0,
		is_batted_ball: 0,
		is_ground_ball: 0,
		is_fly_ball: 0,
		is_line_drive: 0,
		is_pop_up: 0,
		is_final_pitch_of_ab: 0,
		ab_result_out: 0,
		ab_result_hit: 0,
		ab_result_single: 0,
		ab_result_double: 0,
		ab_result_triple: 0,
		ab_result_homerun: 0,
		ab_result_bb: 0,
		ab_result_ibb: 0,
		ab_result_k: 0,
		ab_result_hbp: 0,
		ab_result_error: 0,
		ab_result_sac_hit: 0,
		ab_result_sac_fly: 0,
		ab_result_unclear: 0,
		pitch_type_int: 0,
		is_sp: 0,
		is_rp: 0,
		is_patched: 0,
		is_invalid_ibb: 0,
		is_out_of_sequence: 0,
		start_speed: 0,
		spin: 0,
		zone_location: 0,
		sz_top: 0,
		sz_bot: 0,
		pfx_x: 0,
		pfx_z: 0,
		px: 0,
		pz: 0,
		pxold: 0,
		pzold: 0
	};
}

function getZoneTop(pfx: PitchFx[]): number {
	const uniqueVals = [...new Set(pfx.map((pfx) => pfx.sz_top))];
	return uniqueVals.length == 1 ? uniqueVals[0] : uniqueVals.reduce((a, b) => a + b) / uniqueVals.length;
}

function getZoneBottom(pfx: PitchFx[]): number {
	const uniqueVals = [...new Set(pfx.map((pfx) => pfx.sz_bot))];
	return uniqueVals.length == 1 ? uniqueVals[0] : uniqueVals.reduce((a, b) => a + b) / uniqueVals.length;
}

export function drawStrikeZoneRect(document: Document): void {
	const strikeZone = document.querySelector<HTMLElement>('.strike-zone') || document.createElement('div');
	const dimensions = getStrikeZoneDimensions(document);
	if (dimensions) {
		strikeZone.className = 'strike-zone';
		strikeZone.style.top = dimensions.top;
		strikeZone.style.left = dimensions.left;
		strikeZone.style.width = dimensions.width;
		strikeZone.style.height = dimensions.height;
		document.querySelector('.scatter-group').appendChild(strikeZone);
	}
}

function getStrikeZoneDimensions(document: Document): StrikeZoneDimensions {
	const zoneCornerHtmlElements = document.querySelectorAll<HTMLElement>('.strike-zone-corner');
	const zoneCorners = Array.from(zoneCornerHtmlElements).map((pfx) => getZoneCorner(pfx));
	if (zoneCorners.length > 0) {
		const topLeftCorner = zoneCorners.filter((zc) => zc.corner === 'TL')?.[0];
		const topRightCorner = zoneCorners.filter((zc) => zc.corner === 'TR')?.[0];
		const bottomLeftCorner = zoneCorners.filter((zc) => zc.corner === 'BL')?.[0];
		const chartSize = getCSSPropNumberOfPixels(document.documentElement, '--ploc-chart-size');

		const top = topLeftCorner.top;
		const left = topLeftCorner.left;
		const width = chartSize * ((topRightCorner.left - topLeftCorner.left) / 100);
		const height = chartSize * ((bottomLeftCorner.top - topLeftCorner.top) / 100);

		return {
			top: `${top}%`,
			left: `${left}%`,
			width: `${width}px`,
			height: `${height}px`
		};
	}
}

function getZoneCorner(pfx: HTMLElement): StrikeZoneCorner {
	return {
		corner: pfx.dataset.pitchType,
		left: parseFloat(pfx.dataset.leftPosition),
		top: parseFloat(pfx.dataset.topPosition)
	};
}

export function formatRateStat(value: string, precision: number): string {
	const rate = parseFloat(value);
	const rate_str = rate.toFixed(precision);
	// Remove leading-zero if value is less than 1.000
	return rate < 1.0 ? rate_str.slice(1) : rate_str;
}

export function formatPercentStat(value: string, precision: number): string {
	const percent = (parseFloat(value) * 100).toFixed(precision);
	return `${percent}%`;
}

export function formatSpeedStat(value: string, precision: number): string {
	return parseFloat(value).toFixed(precision);
}

export function prefersDarkTheme(): boolean {
	return window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
}

export function getAngleOfLineBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number): number {
	return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

export function getAngleOfPitchLocation(x: number, y: number): number {
	return getAngleOfLineBetweenTwoPoints(0, 1.5, x, y);
}

export function getToolTipPositionForPfxData(x: number, y: number): 'top' | 'right' | 'bottom' | 'left' {
	let angle = getAngleOfPitchLocation(x, y);
	angle = angle >= 0 ? angle : angle + 360;
	if (angle >= 315 || 45 > angle) {
		return 'right';
	} else if (angle >= 45 && 135 > angle) {
		return 'top';
	} else if (angle >= 135 && 225 > angle) {
		return 'left';
	} else if (angle >= 225 && 315 > angle) {
		return 'bottom';
	}
}

export function getTimeSpan(start: Date, end: Date): TimeSpan {
	const timespan = {} as TimeSpan;
	const seconds = getDurationSeconds(start, end);
	let remainingTime = seconds;
	const conversion = [
		{ key: 'years', value: 60 * 60 * 24 * 365 },
		{ key: 'days', value: 60 * 60 * 24 },
		{ key: 'hours', value: 60 * 60 },
		{ key: 'minutes', value: 60 },
		{ key: 'seconds', value: 1 },
		{ key: 'milliseconds', value: 1 / 1000 }
	];
	for (const def of conversion) {
		timespan[def.key] = Math.floor(remainingTime / def.value);
		remainingTime %= def.value;
		const additionalKey = `total${capitalize(def.key)}`;
		timespan[additionalKey] = seconds / def.value;
	}
	timespan.toString = () => {
		let string = '';
		for (const def of conversion) {
			const value = timespan[def.key];
			if (value != 0) {
				let name = def.key;
				if (name.endsWith('s')) {
					name = name.substring(0, name.length - 1);
				}
				string += string.length > 0 ? ',' : '';
				string += ` ${value} ${name}${value == 1 ? '' : 's'}`;
			}
		}
		return string.trim();
	};
	return timespan;
}

function getDurationSeconds(start: Date, end: Date): number {
	const timeStart = start ? treatAsUTC(start).getTime() : 0;
	const timeEnd = end ? treatAsUTC(end).getTime() : 0;
	return (timeEnd - timeStart) / 1000;
}

function treatAsUTC(date: Date): Date {
	const result = new Date(date);
	result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
	return result;
}

function capitalize(string): string {
	return string.charAt(0).toUpperCase() + string.substring(1);
}
