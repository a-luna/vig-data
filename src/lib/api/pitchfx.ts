import { API_URL_ROOT, API_VERSION } from './config';
import { validateApiResponse } from './util';
import type { ApiResponse, PitchFx } from './types';

export async function getPitchFxForAtBat(at_bat_id: string): Promise<ApiResponse<PitchFx[]>> {
	if (!at_bat_id) return { status: 400, success: false, message: 'No value was provided for At Bat ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/pfx/at_bat?at_bat_id=${at_bat_id}`);
	return await validateApiResponse<PitchFx[]>(response);
}
