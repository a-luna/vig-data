import { syncWidth } from '$lib/stores/elementWidth';
import type { PageBreakPoint, PageBreakPointStore } from '$lib/types';
import type { Readable, Writable } from 'svelte/store';
import { derived } from 'svelte/store';

export const getPageWidth = (): Writable<number> => {
	if (typeof window !== 'undefined') {
		const svelteDiv = document.getElementById('svelte');
		return svelteDiv ? syncWidth(svelteDiv) : null;
	}
	return null;
};

export const pageBreakPoints: Readable<PageBreakPointStore> = derived(getPageWidth(), ($pageWidth) => {
	const isDefault = (width: number): boolean => width < 640;
	const isSmall = (width: number): boolean => width >= 640 && width < 768;
	const isMedium = (width: number): boolean => width >= 768 && width < 1024;
	const isLarge = (width: number): boolean => width >= 1024 && width < 1280;
	const isExtraLarge = (width: number): boolean => width >= 1280 && width < 1536;
	const is2xExtraLarge = (width: number): boolean => width >= 1536;

	const getCurrentPageBreakPoint = (width: number): PageBreakPoint =>
		isDefault(width)
			? 'default'
			: isSmall(width)
			? 'sm'
			: isMedium(width)
			? 'md'
			: isLarge(width)
			? 'lg'
			: isExtraLarge(width)
			? 'xl'
			: '2xl';

	if ($pageWidth > 0) {
		return {
			current: getCurrentPageBreakPoint($pageWidth),
			width: $pageWidth,
			isDefault: isDefault($pageWidth),
			isSmall: isSmall($pageWidth),
			isMedium: isMedium($pageWidth),
			isLarge: isLarge($pageWidth),
			isExtraLarge: isExtraLarge($pageWidth),
			is2xExtraLarge: is2xExtraLarge($pageWidth)
		};
	} else {
		return {
			current: 'default',
			width: 0,
			isDefault: true,
			isSmall: false,
			isMedium: false,
			isLarge: false,
			isExtraLarge: false,
			is2xExtraLarge: false
		};
	}
});
