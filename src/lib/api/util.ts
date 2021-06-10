import { PITCH_TYPE_MAP } from '$lib/constants';
import type {
	ApiResponse,
	CareerPfxPitchingMetricsWithPercentiles,
	CareerPfxPitchingMetricsWithPercentilesByYear,
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
	let updatedCareerPfxByYear = {} as CareerPfxPitchingMetricsWithPercentilesByYear;
	updatedCareerPfxByYear['both'] = updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(both);
	updatedCareerPfxByYear['lhb'] = updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(lhb);
	updatedCareerPfxByYear['rhb'] = updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(rhb);
	return updatedCareerPfxByYear;
}

function updatePfxPitchingMetricsWithPercentilesByYearWithPitchTypeAbbrevs(
	pfxMetricsWithPercentilesByYear: PfxPitchingMetricsWithPercentilesByYear
): PfxPitchingMetricsWithPercentilesByYear {
	const { metrics, percentiles } = pfxMetricsWithPercentilesByYear;
	let updatedPfxPitchingMetricsWithPercentilesByYear = {} as PfxPitchingMetricsWithPercentilesByYear;

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
	let updatedCareerPfx = {} as CareerPfxPitchingMetricsWithPercentiles;
	updatedCareerPfx['both'] = updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(both);
	updatedCareerPfx['lhb'] = updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(lhb);
	updatedCareerPfx['rhb'] = updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(rhb);
	return updatedCareerPfx;
}

function updatePfxPitchingMetricsWithPercentilesWithPitchTypeAbbrevs(
	pfxMetricsWithPercentiles: PfxPitchingMetricsWithPercentiles
): PfxPitchingMetricsWithPercentiles {
	let updatedPfxPitchingMetricsWithPercentiles = {} as PfxPitchingMetricsWithPercentiles;
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
	let updatedPitchTypeMetrics = {} as Record<PitchType, PfxPitchingMetrics>;
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
