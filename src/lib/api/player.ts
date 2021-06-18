import { API_URL_ROOT, API_VERSION } from '$lib/api/config';
import type { ApiResponse, PlayerDetails, PlayerSearchResult } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';

export async function playerNameSearch(query: string): Promise<ApiResponse<PlayerSearchResult[]>> {
	if (!query) return { status: 400, success: false, message: 'You must enter a search term' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/search?query=${query}`);
	return await validateApiResponse<PlayerSearchResult[]>(response);
}

export async function getPlayerDetails(mlb_id: number): Promise<ApiResponse<PlayerDetails>> {
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/details?mlb_id=${mlb_id}`);
	return await validateApiResponse<PlayerDetails>(response);
}
