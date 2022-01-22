import type { BatOrder, BatStatSplit, DefPositionNumber, PieSlice, PlayerPageSettings, TeamStatType } from '$lib/types';

export function scrollToTop(): void {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }) {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update(initialEnabled);
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}

export function prefersDarkTheme(): boolean {
	return window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
}

export function teamStatFilterSettingsAreInvalid(
	teamStatType: TeamStatType,
	batStatSplit: BatStatSplit,
	defPositions: DefPositionNumber[],
	batOrderNumbers: BatOrder[]
): { invalid: boolean; error: string } {
	if (teamStatType === 'bat') {
		if (batStatSplit === 'defpos' && defPositions.length === 0) {
			return { invalid: true, error: 'You must select at least one Defensive Position!' };
		}
		if (batStatSplit === 'batorder' && batOrderNumbers.length === 0) {
			return { invalid: true, error: 'You must select at least one Bat Order number!' };
		}
	}
	return { invalid: false, error: '' };
}

export function getRandomHexString(length: number): string {
	return Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');
}

export function prepareSvgPieChart(slices: PieSlice[]): PieSlice[] {
	let cumulativePercent = 0;
	slices.forEach((slice) => {
		slice.startCoordinates = getCoordinatesForPercent(cumulativePercent);
		slice.endCoordinates = getCoordinatesForPercent(cumulativePercent + slice.percent);
		cumulativePercent += slice.percent;
	});
	return slices;
}

function getCoordinatesForPercent(percent: number): [number, number] {
	const x = Math.cos(2 * Math.PI * percent);
	const y = Math.sin(2 * Math.PI * percent);
	return [x, y];
}

export function getPlayerPageSettings(pageWidth: number): PlayerPageSettings {
	return pageWidth < 385
		? {
				playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
				playerNameFontSize: '2rem',
				playerDetailsSettings: { fontSize: `0.9rem`, majorGap: 'gap-2', minorGap: 'gap-1' },
				carouselSettings: {
					width: `calc(${pageWidth}px - 2.5rem)`,
					padding: 'py-3 px-2',
					props: { infinite: true, dots: true, particlesToShow: 1 }
				},
				chartSettings: {
					chartHeight: '145px',
					chartTitleFontSize: '1.25rem',
					pieWidth: '120px',
					legendFontSize: '0.9rem',
					legendFontWeight: 500
				}
		  }
		: pageWidth < 455
		? {
				playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
				playerNameFontSize: '2.1rem',
				playerDetailsSettings: { fontSize: `0.95rem`, majorGap: 'gap-2', minorGap: 'gap-1' },
				carouselSettings: {
					width: `calc(${pageWidth}px - 2.5rem)`,
					padding: 'py-3 px-2',
					props: { infinite: true, dots: true, particlesToShow: 1 }
				},
				chartSettings: {
					chartHeight: '145px',
					chartTitleFontSize: '1.25rem',
					pieWidth: '120px',
					legendFontSize: '0.9rem',
					legendFontWeight: 500
				}
		  }
		: pageWidth < 590
		? {
				playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
				playerNameFontSize: '2.1rem',
				playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-2', minorGap: 'gap-2' },
				carouselSettings: {
					width: `calc(${pageWidth}px - 2.5rem)`,
					padding: 'py-3 px-2',
					props: { infinite: false, dots: false, particlesToShow: 2 }
				},
				chartSettings: {
					chartHeight: '120px',
					chartTitleFontSize: '1.2rem',
					pieWidth: '100px',
					legendFontSize: '0.8rem',
					legendFontWeight: 500
				}
		  }
		: pageWidth < 640
		? {
				playerDetailsFlexStyles: 'flex-col justify-start items-center gap-5',
				playerNameFontSize: '2.1rem',
				playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-2', minorGap: 'gap-2' },
				carouselSettings: {
					width: `calc(${pageWidth}px - 2.5rem)`,
					padding: 'py-3 px-1',
					props: { infinite: false, dots: false, particlesToShow: 3 }
				},
				chartSettings: {
					chartHeight: '100px',
					chartTitleFontSize: '1.1rem',
					pieWidth: '80px',
					legendFontSize: '0.725rem',
					legendFontWeight: 700
				}
		  }
		: pageWidth < 740
		? {
				playerDetailsFlexStyles: 'flex-row justify-between items-start',
				playerNameFontSize: '2.15rem',
				playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
				carouselSettings: {
					width: '325px',
					padding: 'p-3',
					props: { infinite: false, dots: false, particlesToShow: 1 }
				},
				chartSettings: {
					chartHeight: '135px',
					chartTitleFontSize: '1.1rem',
					pieWidth: '100px',
					legendFontSize: '0.8rem',
					legendFontWeight: 500
				}
		  }
		: pageWidth < 768
		? {
				playerDetailsFlexStyles: 'flex-row justify-between items-start',
				playerNameFontSize: '2.15rem',
				playerDetailsSettings: { fontSize: `1rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
				carouselSettings: {
					width: '450px',
					padding: 'p-3',
					props: { infinite: false, dots: false, particlesToShow: 2 }
				},
				chartSettings: {
					chartHeight: '135px',
					chartTitleFontSize: '1.1rem',
					pieWidth: '100px',
					legendFontSize: '0.8rem',
					legendFontWeight: 500
				}
		  }
		: pageWidth < 970
		? {
				playerDetailsFlexStyles: 'flex-row justify-between items-start',
				playerNameFontSize: '2.2rem',
				playerDetailsSettings: { fontSize: `0.95rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
				carouselSettings: {
					width: '470px',
					padding: 'p-3',
					props: { infinite: false, dots: false, particlesToShow: 2 }
				},
				chartSettings: {
					chartHeight: '140px',
					chartTitleFontSize: '1.1rem',
					pieWidth: '110px',
					legendFontSize: '0.8rem',
					legendFontWeight: 500
				}
		  }
		: pageWidth < 1024
		? {
				playerDetailsFlexStyles: 'flex-row justify-between items-start',
				playerNameFontSize: '2rem',
				playerDetailsSettings: { fontSize: `0.95rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
				carouselSettings: {
					width: '680px',
					padding: 'p-3',
					props: { infinite: false, dots: false, particlesToShow: 3 }
				},
				chartSettings: {
					chartHeight: '140px',
					chartTitleFontSize: '1.1rem',
					pieWidth: '100px',
					legendFontSize: '0.8rem',
					legendFontWeight: 500
				}
		  }
		: {
				playerDetailsFlexStyles: 'flex-row justify-between items-start',
				playerNameFontSize: '2rem',
				playerDetailsSettings: { fontSize: `0.9rem`, majorGap: 'gap-5', minorGap: 'gap-2' },
				carouselSettings: {
					width: '710px',
					padding: 'p-3',
					props: { infinite: false, dots: false, particlesToShow: 3 }
				},
				chartSettings: {
					chartHeight: '152px',
					chartTitleFontSize: '1.1rem',
					pieWidth: '105px',
					legendFontSize: '0.8rem',
					legendFontWeight: 500
				}
		  };
}

export function getQueryStringParameter(param: string): string {
	if (typeof window !== 'undefined') {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.has(param) ? urlParams.get(param) : '';
	}
}
