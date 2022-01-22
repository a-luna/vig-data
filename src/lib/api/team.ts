import { API_URL_ROOT, API_VERSION, useMockApiData } from '$lib/api/config';
import { getBatStatsForAllTeamsMock, getPitchStatsForAllTeamsMock } from '$lib/api/mock/mockApi';
import type { ApiResponse, TeamBatStats, TeamBatStatsMap, TeamPitchStats, TeamPitchStatsMap } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';
import type { BatOrder, DefPositionNumber, TeamID } from '$lib/types';

export async function getBatStatsForAllTeams(year: number): Promise<ApiResponse<TeamBatStatsMap>> {
	if (useMockApiData()) {
		return getBatStatsForAllTeamsMock(year);
	}
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/batting/all_teams?year=${year}`);
	return await validateApiResponse<TeamBatStatsMap>(response);
}

export async function getBatStatsByPlayerForTeam(year: number, team: TeamID): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/batting/by_player?team_id=${team}&year=${year}`);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForStartingLineupForAllTeams(year: number): Promise<ApiResponse<TeamBatStatsMap>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/batting/starters/all_teams?year=${year}`);
	return await validateApiResponse<TeamBatStatsMap>(response);
}

export async function getBatStatsForStartingLineupByPlayerForTeam(
	year: number,
	team: TeamID,
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/starters/by_player?team_id=${team}&year=${year}`,
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForBenchForAllTeams(year: number): Promise<ApiResponse<TeamBatStatsMap>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/batting/subs/all_teams?year=${year}`);
	return await validateApiResponse<TeamBatStatsMap>(response);
}

export async function getBatStatsForBenchByPlayerForTeam(
	year: number,
	team: TeamID,
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/subs/by_player?team_id=${team}&year=${year}`,
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForLineupSpotForAllTeams(
	year: number,
	batOrder: BatOrder[],
): Promise<ApiResponse<TeamBatStatsMap>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!batOrder) return { status: 400, success: false, message: 'No value was provided for lineup spot' };
	const batorderParams = batOrder.map((b) => `bat_order=${b}`).join('&');
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/bat_order/all_teams?${batorderParams}&year=${year}`,
	);
	return await validateApiResponse<TeamBatStatsMap>(response);
}

export async function getBatStatsForLineupSpotByPlayerForTeam(
	year: number,
	team: TeamID,
	batOrder: BatOrder[],
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const batorderParams = batOrder.map((b) => `bat_order=${b}`).join('&');
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/bat_order/by_player?team_id=${team}&year=${year}&${batorderParams}`,
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getBatStatsForDefPositionForAllTeams(
	year: number,
	defPos: DefPositionNumber[],
): Promise<ApiResponse<TeamBatStatsMap>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!defPos) return { status: 400, success: false, message: 'No value was provided for def. position' };
	const defPosParams = defPos.map((d) => `def_position=${d}`).join('&');
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/position/all_teams?${defPosParams}&year=${year}`,
	);
	return await validateApiResponse<TeamBatStatsMap>(response);
}

export async function getBatStatsForDefPositionByPlayerForTeam(
	year: number,
	team: TeamID,
	defPos: DefPositionNumber[],
): Promise<ApiResponse<TeamBatStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const defPosParams = defPos.map((d) => `def_position=${d}`).join('&');
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/batting/position/by_player?team_id=${team}&year=${year}&${defPosParams}`,
	);
	return await validateApiResponse<TeamBatStats[]>(response);
}

export async function getPitchStatsForAllTeams(year: number): Promise<ApiResponse<TeamPitchStatsMap>> {
	if (useMockApiData()) {
		return getPitchStatsForAllTeamsMock(year);
	}
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/pitching/all_teams?year=${year}`);
	return await validateApiResponse<TeamPitchStatsMap>(response);
}

export async function getPitchStatsByPlayerForTeam(year: number, team: TeamID): Promise<ApiResponse<TeamPitchStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/pitching/by_player?team_id=${team}&year=${year}`);
	return await validateApiResponse<TeamPitchStats[]>(response);
}

export async function getPitchStatsForSpForAllTeams(year: number): Promise<ApiResponse<TeamPitchStatsMap>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/pitching/sp/all_teams?year=${year}`);
	return await validateApiResponse<TeamPitchStatsMap>(response);
}

export async function getPitchStatsForSpByPlayerForTeam(
	year: number,
	team: TeamID,
): Promise<ApiResponse<TeamPitchStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/pitching/sp/by_player?team_id=${team}&year=${year}`,
	);
	return await validateApiResponse<TeamPitchStats[]>(response);
}

export async function getPitchStatsForRpForAllTeams(year: number): Promise<ApiResponse<TeamPitchStatsMap>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/team/pitching/rp/all_teams?year=${year}`);
	return await validateApiResponse<TeamPitchStatsMap>(response);
}

export async function getPitchStatsForRpByPlayerForTeam(
	year: number,
	team: TeamID,
): Promise<ApiResponse<TeamPitchStats[]>> {
	if (!year) return { status: 400, success: false, message: 'No value was provided for year' };
	if (!team) return { status: 400, success: false, message: 'No value was provided for team' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/team/pitching/rp/by_player?team_id=${team}&year=${year}`,
	);
	return await validateApiResponse<TeamPitchStats[]>(response);
}
