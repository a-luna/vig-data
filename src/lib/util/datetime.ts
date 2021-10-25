import type { Result } from '$lib/api/types';
import { GAME_DATE_REGEX, GAME_ID_REGEX, SEASON_DATE_REGEX } from '$lib/regex';
import { formatDuration, intervalToDuration } from 'date-fns';

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
	if (date) {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}`;
	}
}
