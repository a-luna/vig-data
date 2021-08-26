import { syncWidth } from '$lib/stores/elementWidth';
import { derived } from 'svelte/store';
import type { Writable } from 'svelte/types/runtime/store';

export const getPageWidth = (): Writable<number> => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncWidth(svelteDiv) : null;
	}
	return null;
};

export const pageBreakPoints = derived(getPageWidth(), ($pageWidth) => {
	if ($pageWidth > 0) {
		return {
			width: $pageWidth,
			isDefault: $pageWidth < 640,
			isSmall: $pageWidth >= 640 && $pageWidth < 768,
			isMedium: $pageWidth >= 768 && $pageWidth < 1024,
			isLarge: $pageWidth >= 1024
		};
	} else {
		return {};
	}
});
