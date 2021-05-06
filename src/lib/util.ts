import type { Result } from './api/types';
import { GAME_DATE_REGEX, GAME_ID_REGEX, SEASON_DATE_REGEX } from '$lib/regex';

export function scrollToTop(): void {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

export function getDateFromString(date_str: string): Result<Date> {
	if (!GAME_DATE_REGEX.test(date_str))
		return { success: false, message: 'Game date must be in the correct format: YYYYMMDD' };
	const year = parseInt(date_str.slice(0, 4));
	const month = parseInt(date_str.slice(4, 6));
	const day = parseInt(date_str.slice(6, 8));
	return {
		success: true,
		value: new Date(year, month - 1, day)
	};
}

export function getSeasonDates(start_str: string, end_str: string): Result<Date[]> {
	if (!SEASON_DATE_REGEX.test(start_str) || !SEASON_DATE_REGEX.test(end_str))
		return { success: false, message: 'Season start/end dates must be in the correct format: YYYY-MM-DD' };
	const start_year = parseInt(start_str.slice(0, 4));
	const start_month = parseInt(start_str.slice(5, 7));
	const start_day = parseInt(start_str.slice(8, 10));
	const start = new Date(start_year, start_month - 1, start_day);
	const end_year = parseInt(end_str.slice(0, 4));
	const end_month = parseInt(end_str.slice(5, 7));
	const end_day = parseInt(end_str.slice(8, 10));
	const end = new Date(end_year, end_month - 1, end_day);
	return {
		success: true,
		value: [start, end]
	};
}

export function getDateFromGameId(game_id: string): Result<Date> {
	return GAME_ID_REGEX.test(game_id)
		? getDateFromString(game_id.slice(3, 11))
		: { success: false, message: 'Game ID must be in the correct format: (team_id)YYYYMMDD(game_num)' };
}

export function getStringFromDate(date: Date): string {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}${month}${day}`;
}
