import { API_URL_ROOT, API_VERSION } from '$lib/api/config';
import type { ApiResponse, AtBatDetails, Boxscore, Scoreboard, ScoreboardApiResponse } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';
import { AT_BAT_ID_REGEX, GAME_DATE_REGEX, GAME_ID_REGEX } from '$lib/regex';
import { getSeasonDates } from '$lib/util/datetime';

export async function getBoxscore(game_id: string): Promise<ApiResponse<Boxscore>> {
	if (!game_id) return { status: 400, success: false, message: 'No value was provided for Game ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/boxscore?game_id=${game_id}`);
	return await validateApiResponse<Boxscore>(response);
}

export async function getScoreboardForDate(
	date: string
): Promise<ApiResponse<Scoreboard> | ApiResponse<ScoreboardApiResponse>> {
	if (!date) return { status: 400, success: false, message: 'No value was provided for game date' };
	if (!GAME_DATE_REGEX.test(date))
		return {
			status: 400,
			success: false,
			message: 'Game date must be in the correct format: YYYYMMDD'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/scoreboard?game_date=${date}`);
	const result = await validateApiResponse<ScoreboardApiResponse>(response);
	if (!result.success) {
		return result;
	}
	const { season, games_for_date } = result.value;
	return {
		status: 200,
		success: true,
		value: { season: getSeasonDates(season).value, games_for_date }
	};
}

export async function getAllPlayByPlayData(game_id: string): Promise<ApiResponse<AtBatDetails[]>> {
	if (!game_id) return { status: 400, success: false, message: 'No value was provided for Game ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/all_pbp?game_id=${game_id}`);
	return await validateApiResponse<AtBatDetails[]>(response);
}

export async function getAtBatDetails(at_bat_id: string): Promise<ApiResponse<AtBatDetails>> {
	if (!at_bat_id) return { status: 400, success: false, message: 'No value was provided for At Bat ID' };
	if (!AT_BAT_ID_REGEX.test(at_bat_id))
		return {
			status: 400,
			success: false,
			message: 'At Bat ID is not recognized or is formatted incorrectly'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/pbp?at_bat_id=${at_bat_id}`);
	return await validateApiResponse<AtBatDetails>(response);
}

export async function getAllPitchAppIdsForGame(game_id: string): Promise<ApiResponse<string[]>> {
	if (!game_id) return { status: 400, success: false, message: 'No value was provided for Game ID' };
	if (!GAME_ID_REGEX.test(game_id))
		return {
			status: 400,
			success: false,
			message: 'Game ID is not recognized or is formatted incorrectly'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/pitch_app_ids?game_id=${game_id}`);
	return await validateApiResponse<string[]>(response);
}

// Mock Data
// import { scoreboardForDateMockData } from './mock/game/getScoreboardForDate';
// export async function getScoreboardForDate(date: string): Promise<ApiResponse<Scoreboard>> {
// 	const { season, games_for_date } = scoreboardForDateMockData;
// 	return {
// 		status: 200,
// 		success: true,
// 		value: { season: getSeasonDates(season).value, games_for_date }
// 	};
// }
