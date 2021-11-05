import { API_URL_ROOT, API_VERSION } from '$lib/api/config';
import type { ApiResponse, MlbSeason, PitchFx, PlayerBatStats, PlayerPitchStats, SeasonData } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';
import { GAME_DATE_REGEX } from '$lib/regex';
import { getDateFromString, getSeasonDates, getStringFromDate } from '$lib/util/datetime';

export async function getSeasonStandings(year: number): Promise<ApiResponse<SeasonData>> {
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/standings?year=${year}`);
	return await validateApiResponse<SeasonData>(response);
}

export async function getAllValidSeasons(): Promise<ApiResponse<MlbSeason[]>> {
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
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/season/standings_on_date?game_date=${getStringFromDate(date)}`
	);
	return await validateApiResponse<SeasonData>(response);
}

export async function getMostRecentScrapedDate(): Promise<Date> {
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

// Mock Data
// import { allSeasonsMockData } from './mock/season/getAllValidSeasons';
// import { barrelsForDateMockData } from './mock/season/getBarrelsForDate';
// import { mostRecentScrapedDateMockData } from './mock/season/getMostRecentScrapedDate';
// import { PlayerBatStatsForDateMockData } from './mock/season/getPlayerBatStatsForDate';
// import { PlayerPitchStatsForDateMockData } from './mock/season/getPlayerPitchStatsForDate';
// import { standingsOnDateMockData } from './mock/season/getStandingsOnDate';

// export async function getAllValidSeasons(): Promise<ApiResponse<MlbSeason[]>> {
// 	const allSeasons = allSeasonsMockData;
// 	return {
// 		status: 200,
// 		success: true,
// 		value: allSeasons.map((s) => getSeasonDates(s).value)
// 	};
// }

// export async function getStandingsOnDate(date: Date): Promise<ApiResponse<SeasonData>> {
// 	return {
// 		status: 200,
// 		success: true,
// 		value: standingsOnDateMockData
// 	};
// }

// export async function getMostRecentScrapedDate(): Promise<Date> {
// 	return mostRecentScrapedDateMockData;
// }

// export async function getPlayerPitchStatsForDate(date: string): Promise<ApiResponse<PlayerPitchStats[]>> {
// 	return {
// 		status: 200,
// 		success: true,
// 		value: PlayerPitchStatsForDateMockData
// 	};
// }

// export async function getPlayerBatStatsForDate(date: string): Promise<ApiResponse<PlayerBatStats[]>> {
// 	return {
// 		status: 200,
// 		success: true,
// 		value: PlayerBatStatsForDateMockData
// 	};
// }

// export async function getBarrelsForDate(date: string): Promise<ApiResponse<PitchFx[]>> {
// 	return {
// 		status: 200,
// 		success: true,
// 		value: barrelsForDateMockData
// 	};
// }
