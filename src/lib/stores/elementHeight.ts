import { writable } from 'svelte/store';
import type { Writable } from 'svelte/types/runtime/store';

export function syncHeight(el: HTMLElement): Writable<number> {
	return writable(null, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetHeight));
		ro.observe(el);
		return () => ro.disconnect();
	});
}
