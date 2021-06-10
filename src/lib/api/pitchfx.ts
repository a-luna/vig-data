import { API_URL_ROOT, API_VERSION } from './config';
import { validateApiResponse } from './util';
import type {
	ApiResponse,
	CareerPfxPitchingMetricsWithPercentiles,
	CareerPfxPitchingMetricsWithPercentilesByYear,
	PitchFx
} from './types';

export async function getPitchFxForAtBat(at_bat_id: string): Promise<ApiResponse<PitchFx[]>> {
	if (!at_bat_id)
		return { status: 400, success: false, message: 'No value was provided for At Bat ID' };
	const response = await fetch(`${API_URL_ROOT}/${API_VERSION}/pfx/at_bat?at_bat_id=${at_bat_id}`);
	return await validateApiResponse<PitchFx[]>(response);
}

export async function getCareerPfxDataForPitcher(
	mlb_id: number,
	fetch
): Promise<ApiResponse<CareerPfxPitchingMetricsWithPercentiles>> {
	if (!mlb_id)
		return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/player/pitching/pfx/career_pfx?mlb_id=${mlb_id}`
	);
	return await validateApiResponse<CareerPfxPitchingMetricsWithPercentiles>(response);
}

export async function getCareerPfxDataByYearForPitcher(
	mlb_id: number,
	fetch
): Promise<ApiResponse<CareerPfxPitchingMetricsWithPercentilesByYear>> {
	if (!mlb_id)
		return { status: 400, success: false, message: 'No value was provided for player MLB ID' };
	const response = await fetch(
		`${API_URL_ROOT}/${API_VERSION}/player/pitching/pfx/yearly_pfx?mlb_id=${mlb_id}`
	);
	return await validateApiResponse<CareerPfxPitchingMetricsWithPercentilesByYear>(response);
}
