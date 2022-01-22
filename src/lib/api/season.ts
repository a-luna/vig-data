import { API_URL_ROOT, API_VERSION, useMockApiData } from '$lib/api/config';
import {
	getAllValidSeasonsMock,
	getBarrelsForDateMock,
	getMostRecentScrapedDateMock,
	getPlayerBatStatsForDateMock,
	getPlayerPitchStatsForDateMock,
	getStandingsOnDateMock
} from '$lib/api/mock/mockApi';
import type { ApiResponse, MlbSeason, PitchFx, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';
import { GAME_DATE_REGEX } from '$lib/regex';
import { getDateFromString, getSeasonDates, getStringFromDate } from '$lib/util/datetime';

export async function getSeasonStandings(year: number): Promise<ApiResponse<SeasonData>> {
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/standings?year=${year}`);
	return await validateApiResponse<SeasonData>(response);
}

export async function getAllValidSeasons(): Promise<ApiResponse<MlbSeason[]>> {
	if (useMockApiData()) {
		return getAllValidSeasonsMock();
	}
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/all`);
	const result = await validateApiResponse<MlbSeason[]>(response);
	if (!result.success) {
		return result;
	}
	return {
		status: 200,
		success: true,
		value: result.value.map((s) => getSeasonDates(s).value)
	};
}

export async function getStandingsOnDate(date: Date): Promise<ApiResponse<SeasonData>> {
	if (useMockApiData()) {
		return getStandingsOnDateMock(date);
	}
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/season/standings_on_date?game_date=${getStringFromDate(date)}`
	);
	return await validateApiResponse<SeasonData>(response);
}

export async function getMostRecentScrapedDate(): Promise<Date> {
	if (useMockApiData()) {
		return getMostRecentScrapedDateMock();
	}
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/most_recent_scraped_date`);
	const result = await validateApiResponse<string>(response);
	if (result.success) {
		const date_str = result.value;
		const parseDateResult = getDateFromString(date_str);
		if (parseDateResult.success) {
			return parseDateResult.value;
		}
	}
}

export async function getPlayerPitchStatsForDate(date: string): Promise<ApiResponse<PlayerPitchStats[]>> {
	if (useMockApiData()) {
		return getPlayerPitchStatsForDateMock(date);
	}
	if (!date) return { status: 400, success: false, message: 'No value was provided for game date' };
	if (!GAME_DATE_REGEX.test(date))
		return {
			status: 400,
			success: false,
			message: 'Game date must be in the correct format: YYYYMMDD'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/pitch_stats_for_date?game_date=${date}`);
	return await validateApiResponse<PlayerPitchStats[]>(response);
}

export async function getPlayerBatStatsForDate(date: string): Promise<ApiResponse<PlayerBatStats[]>> {
	if (useMockApiData()) {
		return getPlayerBatStatsForDateMock(date);
	}
	if (!date) return { status: 400, success: false, message: 'No value was provided for game date' };
	if (!GAME_DATE_REGEX.test(date))
		return {
			status: 400,
			success: false,
			message: 'Game date must be in the correct format: YYYYMMDD'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/bat_stats_for_date?game_date=${date}`);
	return await validateApiResponse<PlayerBatStats[]>(response);
}

export async function getBarrelsForDate(date: string): Promise<ApiResponse<PitchFx[]>> {
	if (useMockApiData()) {
		return getBarrelsForDateMock(date);
	}
	if (!date) return { status: 400, success: false, message: 'No value was provided for game date' };
	if (!GAME_DATE_REGEX.test(date))
		return {
			status: 400,
			success: false,
			message: 'Game date must be in the correct format: YYYYMMDD'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/barrels_for_date?game_date=${date}`);
	return await validateApiResponse<PitchFx[]>(response);
}
