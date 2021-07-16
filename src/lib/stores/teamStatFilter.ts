import type {
	BatOrder,
	BatStatSplit,
	DefPositionNumber,
	League,
	PitchStatSplit,
	TeamStatFilter,
	TeamStatFilterStore
} from '$lib/types';
import { writable } from 'svelte/store';

function createTeamStatFilterStore(): TeamStatFilterStore {
	const { subscribe, update } = writable<TeamStatFilter>({
		season: 2019,
		league: 'both',
		pitchStatSplit: 'all',
		batStatSplit: 'all',
		defPosition: 3,
		batOrder: 1
	});

	return {
		subscribe,
		changeSeason: (season: number) => update((state) => ({ ...state, season: season })),
		changeLeague: (league: League) => update((state) => ({ ...state, league: league })),
		changePitchStatSplit: (split: PitchStatSplit) => update((state) => ({ ...state, pitchStatSplit: split })),
		changeBatStatSplit: (split: BatStatSplit) => update((state) => ({ ...state, batStatSplit: split })),
		changeDefPosition: (defPosition: DefPositionNumber) => update((state) => ({ ...state, defPosition: defPosition })),
		changeBatOrder: (batOrder: BatOrder) => update((state) => ({ ...state, batOrder: batOrder }))
	};
}

export const teamStatFilter = createTeamStatFilterStore();
