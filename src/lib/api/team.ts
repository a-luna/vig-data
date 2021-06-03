import { API_URL_ROOT, API_VERSION } from './config';
import { validateApiResponse } from './util';
import type { ApiResponse, TeamBatStats, TeamPitchStats } from './types';

export async function getBatStatsForAllTeams(year: number): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/all_teams?year=${year}`
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForStartingLineupForAllTeams(
	year: number
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/starters/all_teams?year=${year}`
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForBenchForAllTeams(
	year: number
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/subs/all_teams?year=${year}`
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForLineupSpotForAllTeams(
	year: number,
	batOrder: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!batOrder)
		return { status: 400, success: false, message: 'No value was provided for lineup spot' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/bat_order/all_teams?bat_order=${batOrder}&year=${year}`
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForDefPositionForAllTeams(
	year: number,
	defPos: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!defPos)
		return { status: 400, success: false, message: 'No value was provided for def. position' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/position/all_teams?def_position=${defPos}&year=${year}`
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getPitchStatsForAllTeams(
	year: number
): Promise<ApiResponse<TeamPitchStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/pitching/all_teams?year=${year}`
	);
	return await validateApiResponse<TeamPitchStats[]>(response);
}

export async function getPitchStatsForSpForAllTeams(
	year: number
): Promise<ApiResponse<TeamPitchStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/pitching/sp/all_teams?year=${year}`
	);
	return await validateApiResponse<TeamPitchStats[]>(response);
}

export async function getPitchStatsForRpForAllTeams(
	year: number
): Promise<ApiResponse<TeamPitchStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/pitching/rp/all_teams?year=${year}`
	);
	return await validateApiResponse<TeamPitchStats[]>(response);
}
