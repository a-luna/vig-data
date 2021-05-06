import type { ApiResponse, PlayerSearchResult } from './types';
import { API_URL_ROOT, API_VERSION } from './config';
import { validateApiResponse } from './util';

export async function playerNameSearch(query: string): Promise<ApiResponse<PlayerSearchResult[]>> {
	if (!query) return { status: 400, success: false, message: 'You must enter a search term' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/search?query=${query}`);
	return await validateApiResponse<PlayerSearchResult[]>(response);
}
