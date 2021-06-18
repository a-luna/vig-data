import { API_URL_ROOT, API_VERSION } from '$lib/api/config';
import type { ApiResponse, MlbSeason, SeasonData } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';

export async function getAllValidSeasons(): Promise<ApiResponse<MlbSeason[]>> {
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/all`);
	return await validateApiResponse<MlbSeason[]>(response);
}

export async function getSeasonStandings(year: number): Promise<ApiResponse<SeasonData>> {
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/season/standings?year=${year}`);
	return await validateApiResponse<SeasonData>(response);
}
