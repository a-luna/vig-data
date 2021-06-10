import type { TeamPitchStatFilter, TeamPitchStatFilterStore, PitchStatSplit } from '$lib/types';
import { writable } from 'svelte/store';

function createTeamPitchStatFilterStore(): TeamPitchStatFilterStore {
	const { subscribe, update } = writable<TeamPitchStatFilter>({ split: 'all' });

	return {
		subscribe,
		changeSplit: (split: PitchStatSplit) => update((teamPitchStatFilter) => ({ ...teamPitchStatFilter, split: split }))
	};
}

export const teamPitchStat = createTeamPitchStatFilterStore();
