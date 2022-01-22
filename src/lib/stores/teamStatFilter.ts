import type {
	BatOrder,
	BatStatSplit,
	DefPositionNumber,
	League,
	PitchStatSplit,
	TeamStatFilter,
	TeamStatFilterStore,
	TeamStatType,
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
		batOrder: [],
	});

	return {
		subscribe,
		changeSeason: (season: number) => update((state) => ({ ...state, season })),
		changeLeague: (league: League) => update((state) => ({ ...state, league })),
		changeStatType: (statType: TeamStatType) => update((state) => ({ ...state, statType })),
		changePitchStatSplit: (split: PitchStatSplit) => update((state) => ({ ...state, pitchStatSplit: split })),
		changeBatStatSplit: (split: BatStatSplit) => update((state) => ({ ...state, batStatSplit: split })),
		changeDefPosition: (defPosition: DefPositionNumber[]) => update((state) => ({ ...state, defPosition })),
		changeBatOrder: (batOrder: BatOrder[]) => update((state) => ({ ...state, batOrder })),
	};
}

export const teamStatFilter = createTeamStatFilterStore();
