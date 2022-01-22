import { API_URL_ROOT, API_VERSION, useMockApiData } from '$lib/api/config';
import { getCareerBatStatsForPlayerMock, getCareerPitchStatsForPlayerMock } from '$lib/api/mock/mockApi';
import type { ApiResponse, CareerBatStats, CareerPitchStats, PlayerDetails, TeamBatStats } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';

export async function getPlayerDetails(mlb_id: number): Promise<ApiResponse<PlayerDetails>> {
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/details?mlb_id=${mlb_id}`);
	return await validateApiResponse<PlayerDetails>(response);
}

export async function getCareerBatStatsForPlayer(mlb_id: number): Promise<ApiResponse<CareerBatStats>> {
	if (useMockApiData()) {
		return getCareerBatStatsForPlayerMock(mlb_id);
	}
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/batting/career_stats?mlb_id=${mlb_id}`);
	return await validateApiResponse<CareerBatStats>(response);
}

export async function getCareerPitchStatsForPlayer(mlb_id: number): Promise<ApiResponse<CareerPitchStats>> {
	if (useMockApiData()) {
		return getCareerPitchStatsForPlayerMock(mlb_id);
	}
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/pitching/career_stats?mlb_id=${mlb_id}`);
	return await validateApiResponse<CareerPitchStats>(response);
}

export async function getPlayerBatStatsByYear(mlb_id: number): Promise<ApiResponse<TeamBatStats[]>> {
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/batting/by_year?mlb_id=${mlb_id}`);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getPlayerBatStatsByTeam(mlb_id: number): Promise<ApiResponse<TeamBatStats[]>> {
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/batting/by_team?mlb_id=${mlb_id}`);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getPlayerBatStatsByTeamByYear(mlb_id: number): Promise<ApiResponse<TeamBatStats[]>> {
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/batting/p?mlb_id=${mlb_id}`);
	return await validateApiResponse<TeamBatStats[]>(response);
}
