import type { MlbSeason, Result } from '$lib/api/types';
import { GAME_DATE_REGEX, GAME_ID_REGEX, SEASON_DATE_REGEX } from '$lib/regex';
import { formatDuration, intervalToDuration } from 'date-fns';

export function getNextDay(date: Date): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + 1);
	return result;
}

export function getPreviousDay(date: Date): Date {
	const result = new Date(date);
	result.setDate(result.getDate() - 1);
	return result;
}

export function getTimeDeltaAsString(
	start: Date,
	end: Date = new Date(),
	format: string[] = ['years', 'months', 'days'],
	delimiter = ', '
): string {
	return formatDuration(intervalToDuration({ start, end }), { format, delimiter });
}

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

export function getSeasonDates(season: {
	year: number;
	start_date: string;
	end_date: string;
	asg_date: string;
}): Result<MlbSeason> {
	const parseStartResult = getDateFromString(season.start_date);
	const parseEndResult = getDateFromString(season.end_date);
	if (!parseStartResult.success || !parseEndResult.success)
		return {
			success: false,
			message: 'Season start/end dates must be in the correct format: YYYY-MM-DD'
		};
	const start_date = parseStartResult.value;
	const end_date = parseEndResult.value;

	const parseAsgResult = season.asg_date ? getDateFromString(season.asg_date) : null;
	const asg_date = parseAsgResult?.success ? parseAsgResult.value : null;

	return {
		success: true,
		value: {
			...season,
			start: start_date,
			end: end_date,
			asg: asg_date
		}
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
	if (date) {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}`;
	}
}
