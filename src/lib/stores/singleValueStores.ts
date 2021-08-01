import type { CareerPfxMetricsForPitcher, PitchType, PitchTypePercentiles, PlayerDetails } from '$lib/api/types';
import type { BatterStance, GameContent, SiteTheme, TeamStatType } from '$lib/types';
import { derived, Writable, writable } from 'svelte/store';
import { createLocalStorageValue } from './util';

export const gameContentShown: Writable<GameContent> = writable('box');
export const teamStatType: Writable<TeamStatType> = writable('bat');
export const playerSeason: Writable<number> = writable(0);
export const batStanceSplit: Writable<BatterStance> = writable('all');
export const season: Writable<number> = writable(2021);
export const siteTheme: Writable<SiteTheme> = createLocalStorageValue('vig-theme', 'notset');
export const searchResults: Writable<PlayerDetails[]> = writable([]);
export const careerPfxData: Writable<CareerPfxMetricsForPitcher> = writable({} as CareerPfxMetricsForPitcher);

export const allPlayerSeasons = derived(careerPfxData, ($careerPfxData) => {
	if ($careerPfxData) {
		return Array.from(Object.keys($careerPfxData['all'])).map((year) => parseInt(year));
	}
	return [];
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
