export const DEF_POS_NUM_TO_ABBREV_MAP = {
	1: 'P',
	2: 'C',
	3: '1B',
	4: '2B',
	5: '3B',
	6: 'SS',
	7: 'LF',
	8: 'CF',
	9: 'RF',
	10: 'DH'
};

export const DEF_POS_ABBREV_TO_NUM_MAP = {
	P: 1,
	C: 2,
	'1B': 3,
	'2B': 4,
	'3B': 5,
	SS: 6,
	LF: 7,
	CF: 8,
	RF: 9,
	DH: 10
};

export const PITCH_TYPE_MAP = {
	1: 'CH',
	2: 'CU',
	4: 'EP',
	8: 'FA',
	16: 'FC',
	32: 'FF',
	64: 'FS',
	128: 'FT',
	256: 'FO',
	512: 'IN',
	1024: 'KC',
	2048: 'KN',
	4096: 'PO',
	8192: 'SC',
	16384: 'SI',
	32768: 'SL',
	65536: 'UN'
};

export const PITCH_TYPE_NAME_TO_ABBREV_MAP = {
	none: 'N/A',
	changeup: 'CH',
	curveball: 'CU',
	eephus: 'EP',
	fastball: 'FA',
	cutter: 'FC',
	'four-seam fastball': 'FF',
	splitter: 'FS',
	'two-seam fastball': 'FT',
	forkball: 'FO',
	'ball (intentional)': 'IN',
	'knuckle ball curve': 'KC',
	'knuckle ball': 'KN',
	'pitch out': 'PO',
	screwball: 'SC',
	sinker: 'SI',
	slider: 'SL',
	unknown: 'UN'
};

export const PITCH_TYPE_ABBREV_TO_NAME_MAP = {
	'N/A': 'none',
	CH: 'changeup',
	CU: 'curveball',
	EP: 'eephus',
	FA: 'fastball',
	FC: 'cutter',
	FF: 'four-seam fastball',
	FS: 'splitter',
	FT: 'two-seam fastball',
	FO: 'forkball',
	IN: 'ball (intentional)',
	KC: 'knuckle ball curve',
	KN: 'knuckle ball',
	PO: 'pitch out',
	SC: 'screwball',
	SI: 'sinker',
	SL: 'slider',
	UN: 'unknown'
};
