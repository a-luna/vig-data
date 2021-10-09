import type { CareerPfxMetricsForPitcher, PitchFxMetrics, PitchType, PitchTypePercentiles } from '$lib/api/types';
import type { BatterStance } from '$lib/types';
// import type { Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { playerSeason } from './singleValueStores';

// export const careerPfxData: Writable<CareerPfxMetricsForPitcher> = writable({} as CareerPfxMetricsForPitcher);
export const careerPfxData = writable({} as CareerPfxMetricsForPitcher);

export const allPlayerSeasons = derived(careerPfxData, ($careerPfxData) => {
	if ($careerPfxData) {
		return Array.from(Object.keys($careerPfxData['all'])).map((year) => parseInt(year));
	}
	return [];
});

export const pitchTypeMetricsByYearByStance = derived(careerPfxData, ($careerPfxData) => {
	const batterStanceSplits: BatterStance[] = ['all', 'rhb', 'lhb'];
	function getAllPlayerSeasons(): number[] {
		if ($careerPfxData) {
			return Array.from(Object.keys($careerPfxData['all'])).map((year) => parseInt(year));
		}
	}

	function getPitchTypeMetrics(year: number, stance: BatterStance): PitchFxMetrics[] {
		if ($careerPfxData) {
			return Object.values($careerPfxData[stance][year]).map((pfx) => pfx['metrics']);
		}
	}

	function getTotalPitches(pfxMetrics: PitchFxMetrics[]): number {
		return pfxMetrics.map((metrics) => metrics.total_pitches).reduce((prev, current) => prev + current, 0);
	}

	const metricsByYearByStance = {} as { [key: number]: { [key: string]: PitchFxMetrics[] } };
	getAllPlayerSeasons().map((year) => {
		metricsByYearByStance[year] = {} as { [key: string]: PitchFxMetrics[] };
		batterStanceSplits.map((stance) => (metricsByYearByStance[year][stance] = getPitchTypeMetrics(year, stance)));
	});

	const totalPitchesByYearByStance = {} as { [key: number]: { [key: string]: number } };
	getAllPlayerSeasons().map((year) => {
		totalPitchesByYearByStance[year] = {} as { [key: string]: number };
		batterStanceSplits.map(
			(stance) => (totalPitchesByYearByStance[year][stance] = getTotalPitches(getPitchTypeMetrics(year, stance)))
		);
	});

	return {
		metrics: metricsByYearByStance,
		total_pitches: totalPitchesByYearByStance
	};
});

export const pitchTypesByBatterStance = derived([careerPfxData, playerSeason], ([$careerPfxData, $playerSeason]) => {
	function getPitchTypesForSeason(stance: BatterStance): PitchType[] {
		if ($careerPfxData) {
			return Object.values($careerPfxData[stance][$playerSeason])
				.map((pfx) => pfx['metrics'])
				.sort((a, b) => b.percent - a.percent)
				.map((metrics) => metrics.pitch_type[0])
				.filter((pt) => pt !== 'UN');
		}
		return [];
	}

	return {
		all: getPitchTypesForSeason('all'),
		rhb: getPitchTypesForSeason('rhb'),
		lhb: getPitchTypesForSeason('lhb')
	};
});

export const pitchTypePercentilesByBatterStance = derived(
	[careerPfxData, playerSeason],
	([$careerPfxData, $playerSeason]) => {
		function getPitchTypePercentilesForSeason(stance: BatterStance): Record<PitchType, PitchTypePercentiles> {
			if ($careerPfxData) {
				const percentilesForSeason = {} as Record<PitchType, PitchTypePercentiles>;
				Object.values($careerPfxData[stance][$playerSeason])
					.map((pfx) => pfx['percentiles'])
					.sort((a, b) => b.percent - a.percent)
					.map((perc) => (percentilesForSeason[perc.pitch_type] = perc));
				return percentilesForSeason;
			}
			return {} as Record<PitchType, PitchTypePercentiles>;
		}

		return {
			all: getPitchTypePercentilesForSeason('all'),
			rhb: getPitchTypePercentilesForSeason('rhb'),
			lhb: getPitchTypePercentilesForSeason('lhb')
		};
	}
);
