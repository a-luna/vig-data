import { API_URL_ROOT, API_VERSION } from './config';
import { validateApiResponse } from './util';
import type { ApiResponse, AtBatDetails, Boxscore, Scoreboard } from './types';
import { AT_BAT_ID_REGEX, GAME_DATE_REGEX } from '$lib/regex';

export async function getBoxscore(game_id: string): Promise<ApiResponse<Boxscore>> {
	if (!game_id)
		return { status: 400, success: false, message: 'No value was provided for Game ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/boxscore?game_id=${game_id}`);
	return await validateApiResponse<Boxscore>(response);
}

export async function getScoreboard(date: string): Promise<ApiResponse<Scoreboard>> {
	if (!date) return { status: 400, success: false, message: 'No value was provided for game date' };
	if (!GAME_DATE_REGEX.test(date))
		return {
			status: 400,
			success: false,
			message: 'Game date must be in the correct format: YYYYMMDD'
		};
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/season/scoreboard?game_date=${date}`
	);
	return await validateApiResponse<Scoreboard>(response);
}

export async function getAllPlayByPlayData(game_id: string): Promise<ApiResponse<AtBatDetails[]>> {
	if (!game_id)
		return { status: 400, success: false, message: 'No value was provided for Game ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/all_pbp?game_id=${game_id}`);
	return await validateApiResponse<AtBatDetails[]>(response);
}

export async function getAtBatDetails(at_bat_id: string): Promise<ApiResponse<AtBatDetails>> {
	if (!at_bat_id)
		return { status: 400, success: false, message: 'No value was provided for At Bat ID' };
	if (!AT_BAT_ID_REGEX.test(at_bat_id))
		return {
			status: 400,
			success: false,
			message: 'At Bat ID is not recognized or is formatted incorrectly'
		};
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/game/pbp?at_bat_id=${at_bat_id}`);
	return await validateApiResponse<AtBatDetails>(response);
}
