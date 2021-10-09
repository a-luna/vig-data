// import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

// export function syncWidth(el: HTMLElement): Writable<number> {
export function syncWidth(el: HTMLElement) {
	return writable(null, (set) => {
		if (!el) {
			return;
		}
		const ro = new ResizeObserver(() => el && set(el.offsetWidth));
		ro.observe(el);
		return () => ro.disconnect();
	});
}
