import type { GameDateStore } from '$lib/types';
import { writable } from 'svelte/store';

function gameDateStore(): GameDateStore {
	const { subscribe, set, update } = writable<Date>(null);

	function getNextDay(date: Date): Date {
		if (date) {
			const result = new Date(date);
			result.setDate(result.getDate() + 1);
			return result;
		}
	}

	function getPrevDay(date: Date): Date {
		if (date) {
			const result = new Date(date);
			result.setDate(result.getDate() - 1);
			return result;
		}
	}

	return {
		subscribe,
		nextDay: () => update((gameDate) => getNextDay(gameDate)),
		prevDay: () => update((gameDate) => getPrevDay(gameDate)),
		changeDate: (date: Date) => set(date)
	};
}

export const scoreboardDate = gameDateStore();
export const homePageDate = gameDateStore();
// export const createDateStore = () => gameDateStore();
