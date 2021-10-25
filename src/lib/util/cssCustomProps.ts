import { NUMBER_OF_PIXELS_REGEX } from '$lib/regex';

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const getCSSPropNumber = (element: HTMLElement, propName: string): number => {
	const propValue = getCSSPropValue(element, propName);
	return parseInt(propValue);
};

export const getCSSPropNumberOfPixels = (element: HTMLElement, propName: string): number => {
	const propValue = getCSSPropValue(element, propName);
	const match = NUMBER_OF_PIXELS_REGEX.exec(propValue);
	return match ? parseInt(match.groups.pixels) : 0;
};
