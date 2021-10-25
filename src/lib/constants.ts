import type { DefPositionNumber } from './types';

export const DEF_POS_NUM_TO_ABBREV_MAP: { [key: number]: string } = {
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

export const DEF_POS_ABBREV_TO_NUM_MAP: { [key: string]: DefPositionNumber } = {
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

export const BAT_ORDER_NUM_TO_ABBREV_MAP: { [key: number]: string } = {
	1: '1st',
	2: '2nd',
	3: '3rd',
	4: '4th',
	5: '5th',
	6: '6th',
	7: '7th',
	8: '8th',
	9: '9th'
};

export const PITCH_TYPE_MAP: { [key: number]: string } = {
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

export const PITCH_TYPE_NAME_TO_ABBREV_MAP: { [key: string]: string } = {
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

export const PITCH_TYPE_ABBREV_TO_NAME_MAP: { [key: string]: string } = {
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

export const PITCH_TYPE_ABBREV_TO_CATEGORY_MAP: { [key: string]: string } = {
	'N/A': 'none',
	CH: 'offspeed',
	CU: 'breaking',
	EP: 'offspeed',
	FA: 'fastball',
	FC: 'breaking',
	FF: 'fastball',
	FS: 'breaking',
	FT: 'fastball',
	FO: 'breaking',
	IN: 'none',
	KC: 'breaking',
	KN: 'offspeed',
	PO: 'none',
	SC: 'breaking',
	SI: 'breaking',
	SL: 'breaking',
	UN: 'none'
};

export const TEAM_ID_TO_NAME_MAP: { [key: string]: string } = {
	ARI: 'Arizona D-backs',
	ATL: 'Atlanta Braves',
	BAL: 'Baltimore Orioles',
	BOS: 'Boston Red Sox',
	CHW: 'Chicago White Sox',
	CHC: 'Chicago Cubs',
	CIN: 'Cincinnati Reds',
	CLE: 'Cleveland Indians',
	COL: 'Colorado Rockies',
	DET: 'Detroit Tigers',
	HOU: 'Houston Astros',
	KCR: 'Kansas City Royals',
	ANA: 'Los Angeles Angels of Anaheim',
	LAA: 'Los Angeles Angels',
	LAD: 'Los Angeles Dodgers',
	MIA: 'Miami Marlins',
	MIL: 'Milwaukee Brewers',
	MIN: 'Minnesota Twins',
	NYY: 'New York Yankees',
	NYM: 'New York Mets',
	OAK: 'Oakland Athletics',
	PHI: 'Philadelphia Phillies',
	PIT: 'Pittsburgh Pirates',
	SDP: 'San Diego Padres',
	SEA: 'Seattle Mariners',
	SFG: 'San Francisco Giants',
	STL: 'St. Louis Cardinals',
	TBR: 'Tampa Bay Rays',
	TEX: 'Texas Rangers',
	TOR: 'Toronto Blue Jays',
	WSN: 'Washington Nationals'
};

export const TEAM_ID_TO_CITY_MAP: { [key: string]: string } = {
	ARI: 'Arizona',
	ATL: 'Atlanta',
	BAL: 'Baltimore',
	BOS: 'Boston',
	CHW: 'Chicago',
	CHC: 'Chicago',
	CIN: 'Cincinnati',
	CLE: 'Cleveland',
	COL: 'Colorado',
	DET: 'Detroit',
	HOU: 'Houston',
	KCR: 'Kansas City',
	ANA: 'Los Angeles',
	LAA: 'Los Angeles',
	LAD: 'Los Angeles',
	MIA: 'Miami',
	MIL: 'Milwaukee',
	MIN: 'Minnesota',
	NYY: 'New York',
	NYM: 'New York',
	OAK: 'Oakland',
	PHI: 'Philadelphia',
	PIT: 'Pittsburgh',
	SDP: 'San Diego',
	SEA: 'Seattle',
	SFG: 'San Francisco',
	STL: 'St. Louis',
	TBR: 'Tampa Bay',
	TEX: 'Texas',
	TOR: 'Toronto',
	WSN: 'Washington'
};

export const DEC_TO_HEX: { [key: number]: string } = {
	0: '0',
	1: '1',
	2: '2',
	3: '3',
	4: '4',
	5: '5',
	6: '6',
	7: '7',
	8: '8',
	9: '9',
	10: 'a',
	11: 'b',
	12: 'c',
	13: 'd',
	14: 'e',
	15: 'f'
};
