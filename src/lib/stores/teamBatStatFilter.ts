import type { BatOrder, TeamBatStatFilter, TeamBatStatFilterStore, BatStatSplit, DefPositionNumber } from '$lib/types';
import { writable } from 'svelte/store';

function createTeamBatStatFilterStore(): TeamBatStatFilterStore {
	const { subscribe, update } = writable<TeamBatStatFilter>({
		split: 'all',
		defPosition: 3,
		lineupSlot: 1
	});

	return {
		subscribe,
		changeSplit: (split: BatStatSplit) => update((state) => ({ ...state, split: split })),
		changeDefPosition: (defPosition: DefPositionNumber) => update((state) => ({ ...state, defPosition: defPosition })),
		changeLineupSlot: (lineupSlot: BatOrder) => update((state) => ({ ...state, lineupSlot: lineupSlot }))
	};
}

export const teamBatStat = createTeamBatStatFilterStore();
