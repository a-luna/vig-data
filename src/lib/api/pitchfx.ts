import { API_URL_ROOT, API_VERSION } from '$lib/api/config';
import type { ApiResponse, CareerPfxMetricsForPitcher, PitchFx } from '$lib/api/types';
import { validateApiResponse } from '$lib/api/util';

export async function getPitchFxForAtBat(at_bat_id: string): Promise<ApiResponse<PitchFx[]>> {
	if (!at_bat_id) return { status: 400, success: false, message: 'No value was provided for At Bat ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/pfx/at_bat?at_bat_id=${at_bat_id}`);
	return await validateApiResponse<PitchFx[]>(response);
}

export async function getCareerPfxDataForPitcher(mlb_id: number): Promise<ApiResponse<CareerPfxMetricsForPitcher>> {
	if (!mlb_id) return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/player/pitching/pfx/career_pfx?mlb_id=${mlb_id}`);
	return await validateApiResponse<CareerPfxMetricsForPitcher>(response);
}

export async function getPitchFxForPitchApp(pitch_app_id: string): Promise<ApiResponse<PitchFx[]>> {
	if (!pitch_app_id) return { status: 400, success: false, message: 'No value was provided for Pitch App ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/pfx/pitch_app?pitch_app_id=${pitch_app_id}`);
	return await validateApiResponse<PitchFx[]>(response);
}
