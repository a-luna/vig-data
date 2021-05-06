import type { ApiResponse, MlbSeason, SeasonData } from './types';
import { API_URL_ROOT, API_VERSION } from './config';
import { validateApiResponse } from './util';

export async function getAllValidSeasons(): Promise<ApiResponse<MlbSeason[]>> {
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/all`);
	return await validateApiResponse<MlbSeason[]>(response);
}

export async function getSeasonStandings(year: number): Promise<ApiResponse<SeasonData>> {
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/standings?year=${year}`);
	return await validateApiResponse<SeasonData>(response);
}
