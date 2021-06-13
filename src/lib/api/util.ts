import { PITCH_TYPE_MAP } from '$lib/constants';
import type {
	AllCareerAndYearlyPfxData,
	ApiResponse,
	CareerPfxPitchingMetricsWithPercentiles,
	CareerPfxPitchingMetricsWithPercentilesByYear,
	PfxDataForPlayerSeason,
	PfxDataForPlayerSeasonByYear,
	PfxPitchingMetrics,
	PfxPitchingMetricsCollection,
	PfxPitchingMetricsWithPercentiles,
	PfxPitchingMetricsWithPercentilesByYear,
	PfxPitchTypePercentiles,
	PitchType
} from './types';

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

export function getPitchTypeAbbrevsForCareerPfxMetricsByYear(
	careerPfxByYear: CareerPfxPitchingMetricsWithPercentilesByYear
): CareerPfxPitchingMetricsWithPercentilesByYear {
	const { both, lhb, rhb } = careerPfxByYear;
	const updatedCareerPfxByYear = {} as CareerPfxPitchingMetricsWithPercentilesByYear;
	updatedCareerPfxByYear['both'] = updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(both);
	updatedCareerPfxByYear['lhb'] = updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(lhb);
	updatedCareerPfxByYear['rhb'] = updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(rhb);
	return updatedCareerPfxByYear;
}

function updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(
	pfxMetricsWithPercentilesByYear: PfxPitchingMetricsWithPercentilesByYear
): PfxPitchingMetricsWithPercentilesByYear {
	const { metrics, percentiles } = pfxMetricsWithPercentilesByYear;
	const updatedPfxPitchingMetricsWithPercentilesByYear = {} as PfxPitchingMetricsWithPercentilesByYear;

	updatedPfxPitchingMetricsWithPercentilesByYear['metrics'] = {} as {
		[key: number]: PfxPitchingMetricsCollection;
	};
	for (const [year, seasonMetrics] of Object.entries(metrics)) {
		const { pitch_type_metrics, ...pfxMetricsCollection } = seasonMetrics;
		updatedPfxPitchingMetricsWithPercentilesByYear['metrics'][year] = updatePfxMetricsCollectionWithPitchTypeAbbrevs(
			pfxMetricsCollection,
			pitch_type_metrics
		);
	}

	updatedPfxPitchingMetricsWithPercentilesByYear['percentiles'] = {} as {
		[key: number]: PfxPitchTypePercentiles[];
	};
	for (const [year, pitchTypePercentiles] of Object.entries(percentiles)) {
		updatedPfxPitchingMetricsWithPercentilesByYear['percentiles'][
			year
		] = updatePfxPitchTypePercentilesWithPitchTypeAbbrevs(pitchTypePercentiles);
	}
	return updatedPfxPitchingMetricsWithPercentilesByYear;
}

export function getPitchTypeAbbrevsForCareerPfxMetrics(
	careerPfx: CareerPfxPitchingMetricsWithPercentiles
): CareerPfxPitchingMetricsWithPercentiles {
	const { both, lhb, rhb } = careerPfx;
	const updatedCareerPfx = {} as CareerPfxPitchingMetricsWithPercentiles;
	updatedCareerPfx['both'] = updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(both);
	updatedCareerPfx['lhb'] = updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(lhb);
	updatedCareerPfx['rhb'] = updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(rhb);
	return updatedCareerPfx;
}

function updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(
	pfxMetricsWithPercentiles: PfxPitchingMetricsWithPercentiles
): PfxPitchingMetricsWithPercentiles {
	const updatedPfxPitchingMetricsWithPercentiles = {} as PfxPitchingMetricsWithPercentiles;
	const { metrics, percentiles } = pfxMetricsWithPercentiles;
	const { pitch_type_metrics, ...pfxMetricsCollection } = metrics;
	updatedPfxPitchingMetricsWithPercentiles['metrics'] = updatePfxMetricsCollectionWithPitchTypeAbbrevs(
		pfxMetricsCollection,
		pitch_type_metrics
	);
	updatedPfxPitchingMetricsWithPercentiles['percentiles'] = updatePfxPitchTypePercentilesWithPitchTypeAbbrevs(
		percentiles
	);
	return updatedPfxPitchingMetricsWithPercentiles;
}

function updatePfxMetricsCollectionWithPitchTypeAbbrevs(
	pfxMetricsCollection: PfxPitchingMetricsCollection,
	pitch_type_metrics: Record<PitchType, PfxPitchingMetrics>
): PfxPitchingMetricsCollection {
	const updatedPitchTypeMetrics = {} as Record<PitchType, PfxPitchingMetrics>;
	for (const [key, value] of Object.entries(pitch_type_metrics)) {
		value.pitch_type = PITCH_TYPE_MAP[key];
		updatedPitchTypeMetrics[PITCH_TYPE_MAP[key]] = value;
	}
	pfxMetricsCollection['pitch_type_metrics'] = updatedPitchTypeMetrics;
	return pfxMetricsCollection;
}

function updatePfxPitchTypePercentilesWithPitchTypeAbbrevs(
	pfxPercentiles: PfxPitchTypePercentiles[]
): PfxPitchTypePercentiles[] {
	pfxPercentiles.map((perc) => (perc.pitch_type = PITCH_TYPE_MAP[perc.pitch_type]));
	return pfxPercentiles;
}

export function combineAllPfxCareerAndYearlyData(
	careerPfx: CareerPfxPitchingMetricsWithPercentiles,
	careerPfxByYear: CareerPfxPitchingMetricsWithPercentilesByYear
): AllCareerAndYearlyPfxData {
	const pfxPercentiles = {} as AllCareerAndYearlyPfxData;
	const allPitchTypes = Object.values(careerPfx['both']['metrics']['pitch_type_metrics'])
		.sort((a, b) => b.percent - a.percent)
		.map((m) => m.pitch_type);

	['both', 'rhb', 'lhb'].map((stance) => {
		pfxPercentiles[stance] = {} as PfxDataForPlayerSeasonByYear;
		pfxPercentiles[stance][0] = {} as PfxDataForPlayerSeason;
		allPitchTypes.map((pitchType) => {
			const metricsMatch: PfxPitchingMetrics[] = Object.values<PfxPitchingMetrics>(
				careerPfx[stance]['metrics']['pitch_type_metrics']
			).filter((metrics) => metrics.pitch_type === pitchType);
			const percentilesMatch: PfxPitchTypePercentiles[] = careerPfx[stance]['percentiles'].filter(
				(perc) => perc.pitch_type === pitchType
			);
			if (metricsMatch.length === 1 && percentilesMatch.length === 1) {
				pfxPercentiles[stance][0][pitchType] = { percentiles: percentilesMatch[0], metrics: metricsMatch[0] };
			} else {
				pfxPercentiles[stance][0][pitchType] = { percentiles: null, metrics: null };
			}
		});

		const seasons = Array.from(Object.keys(careerPfxByYear['both']['metrics']));
		seasons.map((year) => {
			pfxPercentiles[stance][year] = {} as PfxDataForPlayerSeason;
			allPitchTypes.map((pitchType) => {
				const metricsMatch: PfxPitchingMetrics[] = Object.values<PfxPitchingMetrics>(
					careerPfxByYear[stance]['metrics'][year]['pitch_type_metrics']
				).filter((metrics) => metrics.pitch_type === pitchType);
				const percentilesMatch: PfxPitchTypePercentiles[] = careerPfxByYear[stance]['percentiles'][year].filter(
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
