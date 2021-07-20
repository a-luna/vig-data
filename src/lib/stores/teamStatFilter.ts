import type {
	BatOrder,
	BatStatSplit,
	DefPositionNumber,
	League,
	PitchStatSplit,
	TeamStatFilter,
	TeamStatFilterStore,
	TeamStatType
} from '$lib/types';
import { writable } from 'svelte/store';

function createTeamStatFilterStore(): TeamStatFilterStore {
	const { subscribe, update } = writable<TeamStatFilter>({
		season: 2021,
		league: 'both',
		statType: 'bat',
		pitchStatSplit: 'all',
		batStatSplit: 'all',
		defPosition: [],
		batOrder: []
	});

	return {
		subscribe,
		changeSeason: (season: number) => update((state) => ({ ...state, season: season })),
		changeLeague: (league: League) => update((state) => ({ ...state, league: league })),
		changeStatType: (statType: TeamStatType) => update((state) => ({ ...state, statType: statType })),
		changePitchStatSplit: (split: PitchStatSplit) => update((state) => ({ ...state, pitchStatSplit: split })),
		changeBatStatSplit: (split: BatStatSplit) => update((state) => ({ ...state, batStatSplit: split })),
		changeDefPosition: (defPosition: DefPositionNumber[]) =>
			update((state) => ({ ...state, defPosition: defPosition })),
		changeBatOrder: (batOrder: BatOrder[]) => update((state) => ({ ...state, batOrder: batOrder }))
	};
}

export const teamStatFilter = createTeamStatFilterStore();
