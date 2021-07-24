import type {
	AllCareerAndYearlyPfxData,
	ApiResponse,
	CareerPfxPitchingMetricsWithPercentiles,
	CareerPfxPitchingMetricsWithPercentilesByYear,
	PfxDataForPlayerSeason,
	PfxDataForPlayerSeasonByYear,
	PitchFxMetrics,
	PitchTypePercentiles
} from '$lib/api/types';

export async function validateApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
	if (!response.ok || response.status >= 400)
		return {
			status: response.status,
			success: false,
			message: `HTTPException: ${response.status}`
		};
	return {
		status: response.status,
		success: true,
		value: await response.json()
	};
}

export function combineAllPfxCareerAndYearlyData(
	careerPfx: CareerPfxPitchingMetricsWithPercentiles,
	careerPfxByYear: CareerPfxPitchingMetricsWithPercentilesByYear
): AllCareerAndYearlyPfxData {
	const pfxPercentiles = {} as AllCareerAndYearlyPfxData;
	const allPitchTypes = Object.values(careerPfx['all']['metrics']['metrics_by_pitch_type'])
		.sort((a, b) => b.percent - a.percent)
		.map((m) => m.pitch_type);

	['all', 'rhb', 'lhb'].map((stance) => {
		pfxPercentiles[stance] = {} as PfxDataForPlayerSeasonByYear;
		pfxPercentiles[stance][0] = {} as PfxDataForPlayerSeason;
		allPitchTypes.map((pitchType) => {
			const metricsMatch: PitchFxMetrics[] = Object.values<PitchFxMetrics>(
				careerPfx[stance]['metrics']['metrics_by_pitch_type']
			).filter((metrics) => metrics.pitch_type === pitchType);
			const percentilesMatch: PitchTypePercentiles[] = careerPfx[stance]['percentiles'].filter(
				(perc) => perc.pitch_type === pitchType
			);
			if (metricsMatch.length === 1 && percentilesMatch.length === 1) {
				pfxPercentiles[stance][0][pitchType] = { percentiles: percentilesMatch[0], metrics: metricsMatch[0] };
			} else {
				pfxPercentiles[stance][0][pitchType] = { percentiles: null, metrics: null };
			}
		});

		const seasons = Array.from(Object.keys(careerPfxByYear['all']['metrics']));
		seasons.map((year) => {
			pfxPercentiles[stance][year] = {} as PfxDataForPlayerSeason;
			allPitchTypes.map((pitchType) => {
				const metricsMatch: PitchFxMetrics[] = Object.values<PitchFxMetrics>(
					careerPfxByYear[stance]['metrics'][year]['metrics_by_pitch_type']
				).filter((metrics) => metrics.pitch_type === pitchType);
				const percentilesMatch: PitchTypePercentiles[] = careerPfxByYear[stance]['percentiles'][year].filter(
					(perc) => perc.pitch_type === pitchType
				);
				if (metricsMatch.length === 1 && percentilesMatch.length === 1) {
					pfxPercentiles[stance][year][pitchType] = { percentiles: percentilesMatch[0], metrics: metricsMatch[0] };
				} else {
					pfxPercentiles[stance][year][pitchType] = { percentiles: null, metrics: null };
				}
			});
		});
	});

	return pfxPercentiles;
}
