import type { SortableStats } from '$lib/api/types';

const RESP_COLUMN_WIDTH_MAP = {
	age: {
		default: [32, 46],
		sm: [32, 46],
		md: [33, 48],
		lg: [35, 52],
		xl: [35, 52],
		'2xl': [35, 52]
	},
	at_bats: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	avg: {
		default: [34, 48],
		sm: [34, 48],
		md: [36, 51],
		lg: [38, 54],
		xl: [38, 54],
		'2xl': [38, 54]
	},
	avg_lvg_index: {
		default: [32, 42],
		sm: [32, 42],
		md: [34, 45],
		lg: [36, 49],
		xl: [36, 49],
		'2xl': [36, 49]
	},
	bases_on_balls: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	bat_order: {
		default: [0, 0],
		sm: [0, 0],
		md: [0, 0],
		lg: [0, 0],
		xl: [0, 0],
		'2xl': [0, 0]
	},
	batters_faced: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	bb_per_nine: {
		default: [42, 56],
		sm: [42, 56],
		md: [44, 59],
		lg: [46, 62],
		xl: [46, 62],
		'2xl': [46, 62]
	},
	bb_rate: {
		default: [43, 57],
		sm: [43, 57],
		md: [45, 60],
		lg: [47, 63],
		xl: [47, 63],
		'2xl': [47, 63]
	},
	caught_stealing: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	csw: {
		default: [34, 48],
		sm: [34, 48],
		md: [36, 51],
		lg: [38, 54],
		xl: [38, 54],
		'2xl': [38, 54]
	},
	def_position: {
		default: [0, 0],
		sm: [0, 0],
		md: [0, 0],
		lg: [0, 0],
		xl: [0, 0],
		'2xl': [0, 0]
	},
	doubles: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	earned_runs: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	era: {
		default: [39, 48],
		sm: [39, 48],
		md: [41, 51],
		lg: [43, 54],
		xl: [43, 54],
		'2xl': [43, 54]
	},
	extra_base_hits: {
		default: [34, 48],
		sm: [34, 48],
		md: [36, 51],
		lg: [38, 54],
		xl: [38, 54],
		'2xl': [38, 54]
	},
	fly_balls: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	games_as_rp: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	games_as_sp: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	game_score: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	ground_balls: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	hits: {
		default: [37, 37],
		sm: [37, 37],
		md: [39, 40],
		lg: [40, 42],
		xl: [40, 42],
		'2xl': [40, 42]
	},
	homeruns: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	hr_per_fb: {
		default: [49, 63],
		sm: [49, 63],
		md: [51, 66],
		lg: [53, 69],
		xl: [53, 69],
		'2xl': [53, 69]
	},
	hr_per_nine: {
		default: [42, 56],
		sm: [42, 56],
		md: [44, 59],
		lg: [46, 62],
		xl: [46, 62],
		'2xl': [46, 62]
	},
	inherited_runners: {
		default: [36, 36],
		sm: [36, 36],
		md: [37, 38],
		lg: [39, 41],
		xl: [39, 41],
		'2xl': [39, 41]
	},
	inherited_scored: {
		default: [36, 36],
		sm: [36, 36],
		md: [37, 38],
		lg: [39, 41],
		xl: [39, 41],
		'2xl': [39, 41]
	},
	innings_pitched: {
		default: [40, 40],
		sm: [40, 40],
		md: [41, 43],
		lg: [43, 46],
		xl: [43, 46],
		'2xl': [43, 46]
	},
	k_minus_bb: {
		default: [59, 73],
		sm: [59, 73],
		md: [61, 76],
		lg: [63, 79],
		xl: [63, 79],
		'2xl': [63, 79]
	},
	k_per_bb: {
		default: [42, 56],
		sm: [42, 56],
		md: [44, 59],
		lg: [46, 62],
		xl: [46, 62],
		'2xl': [46, 62]
	},
	k_per_nine: {
		default: [34, 48],
		sm: [34, 48],
		md: [36, 51],
		lg: [38, 54],
		xl: [38, 54],
		'2xl': [38, 54]
	},
	k_rate: {
		default: [43, 47],
		sm: [43, 47],
		md: [45, 50],
		lg: [47, 53],
		xl: [47, 53],
		'2xl': [47, 53]
	},
	league: {
		default: [39, 39],
		sm: [39, 39],
		md: [40, 41],
		lg: [42, 44],
		xl: [42, 44],
		'2xl': [42, 44]
	},
	line_drives: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	losses: {
		default: [37, 37],
		sm: [37, 37],
		md: [39, 40],
		lg: [40, 42],
		xl: [40, 42],
		'2xl': [40, 42]
	},
	obp: {
		default: [34, 48],
		sm: [34, 48],
		md: [36, 51],
		lg: [38, 54],
		xl: [38, 54],
		'2xl': [38, 54]
	},
	opponent_team_id_bbref: {
		default: [48, 48],
		sm: [48, 48],
		md: [50, 50],
		lg: [54, 54],
		xl: [54, 54],
		'2xl': [54, 54]
	},
	ops: {
		default: [40, 48],
		sm: [40, 48],
		md: [42, 51],
		lg: [44, 54],
		xl: [44, 54],
		'2xl': [44, 54]
	},
	pitch_count: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	player_name: {
		default: [0, 0],
		sm: [0, 0],
		md: [0, 0],
		lg: [0, 0],
		xl: [0, 0],
		'2xl': [0, 0]
	},
	player_team_id_bbref: {
		default: [41, 55],
		sm: [41, 55],
		md: [43, 58],
		lg: [45, 61],
		xl: [45, 61],
		'2xl': [45, 61]
	},
	rbis: {
		default: [37, 44],
		sm: [37, 44],
		md: [39, 47],
		lg: [40, 49],
		xl: [40, 49],
		'2xl': [40, 49]
	},
	re24_bat: {
		default: [50, 61],
		sm: [50, 61],
		md: [52, 64],
		lg: [52, 67],
		xl: [54, 67],
		'2xl': [54, 67]
	},
	re24_pitch: {
		default: [50, 61],
		sm: [50, 61],
		md: [52, 64],
		lg: [52, 67],
		xl: [54, 67],
		'2xl': [54, 67]
	},
	runs: {
		default: [37, 37],
		sm: [37, 37],
		md: [39, 40],
		lg: [40, 42],
		xl: [40, 42],
		'2xl': [40, 42]
	},
	runs_allowed: {
		default: [37, 37],
		sm: [37, 37],
		md: [39, 40],
		lg: [40, 42],
		xl: [40, 42],
		'2xl': [40, 42]
	},
	runs_scored: {
		default: [37, 37],
		sm: [37, 37],
		md: [39, 40],
		lg: [40, 42],
		xl: [40, 42],
		'2xl': [40, 42]
	},
	saves: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	slg: {
		default: [34, 48],
		sm: [34, 48],
		md: [36, 51],
		lg: [38, 54],
		xl: [38, 54],
		'2xl': [38, 54]
	},
	stolen_bases: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	strikeouts: {
		default: [32, 41],
		sm: [32, 41],
		md: [33, 44],
		lg: [35, 48],
		xl: [35, 48],
		'2xl': [35, 48]
	},
	strikes: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	strikes_contact: {
		default: [37, 44],
		sm: [37, 44],
		md: [39, 47],
		lg: [40, 49],
		xl: [40, 49],
		'2xl': [40, 49]
	},
	strikes_looking: {
		default: [37, 44],
		sm: [37, 44],
		md: [39, 47],
		lg: [40, 49],
		xl: [40, 49],
		'2xl': [40, 49]
	},
	strikes_swinging: {
		default: [37, 44],
		sm: [37, 44],
		md: [39, 47],
		lg: [40, 49],
		xl: [40, 49],
		'2xl': [40, 49]
	},
	total_bases: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	total_games: {
		default: [37, 37],
		sm: [37, 37],
		md: [40, 41],
		lg: [40, 41],
		xl: [40, 41],
		'2xl': [40, 41]
	},
	total_outs: {
		default: [39, 53],
		sm: [39, 53],
		md: [41, 56],
		lg: [43, 59],
		xl: [43, 59],
		'2xl': [43, 59]
	},
	triples: {
		default: [37, 41],
		sm: [37, 41],
		md: [39, 44],
		lg: [40, 46],
		xl: [40, 46],
		'2xl': [40, 46]
	},
	unknown_type: {
		default: [37, 44],
		sm: [37, 44],
		md: [39, 47],
		lg: [40, 49],
		xl: [40, 49],
		'2xl': [40, 49]
	},
	whip: {
		default: [44, 58],
		sm: [43, 58],
		md: [45, 61],
		lg: [47, 64],
		xl: [47, 64],
		'2xl': [47, 64]
	},
	wins: {
		default: [37, 37],
		sm: [37, 37],
		md: [39, 40],
		lg: [40, 42],
		xl: [40, 42],
		'2xl': [40, 42]
	},
	wpa_bat: {
		default: [42, 53],
		sm: [42, 53],
		md: [44, 56],
		lg: [46, 59],
		xl: [46, 59],
		'2xl': [46, 59]
	},
	wpa_pitch: {
		default: [42, 53],
		sm: [42, 53],
		md: [44, 56],
		lg: [46, 59],
		xl: [46, 59],
		'2xl': [46, 59]
	},
	year: {
		default: [53, 53],
		sm: [53, 53],
		md: [56, 56],
		lg: [58, 58],
		xl: [58, 58],
		'2xl': [58, 58]
	}
};

const STAT_DISPLAY_NAME_MAP = {
	age: 'age',
	at_bats: 'at bats',
	avg: 'batting average',
	avg_lvg_index: 'average leverage index',
	bases_on_balls: 'walks',
	bat_order: 'bat order',
	batters_faced: 'batters faced',
	bb_per_nine: 'BB/9',
	bb_rate: 'walk rate',
	caught_stealing: 'caught stealing',
	csw: 'called strikes + whiffs',
	def_position: 'defensive position',
	doubles: 'doubles',
	earned_runs: 'earned runs',
	era: 'ERA',
	extra_base_hits: 'extra base hits',
	fly_balls: 'fly balls',
	game_score: 'game score',
	games_as_rp: 'games as RP',
	games_as_sp: 'games as SP',
	ground_balls: 'ground balls',
	hits: 'hits',
	homeruns: 'homeruns',
	hr_per_fb: 'HR/FB',
	hr_per_nine: 'HR/9',
	inherited_runners: 'inherited runners',
	inherited_scored: 'inherited scored',
	innings_pitched: 'innings pitched',
	k_minus_bb: 'K%-BB%',
	k_per_bb: 'K/BB',
	k_per_nine: 'K/9',
	k_rate: 'strikeout rate',
	league: 'league',
	line_drives: 'line drives',
	losses: 'losses',
	obp: 'on base percentage',
	opponent_team_id_bbref: 'opponent',
	ops: 'on base plus slugging percentage',
	pitch_count: 'pitch count',
	player_name: 'player name',
	player_team_id_bbref: 'team',
	rbis: 'RBIs',
	re24_bat: 'run expectancy',
	re24_pitch: 'run expectancy',
	runs: 'runs',
	runs_allowed: 'runs allowed',
	runs_scored: 'runs scored',
	saves: 'saves',
	slg: 'slugging percentage',
	stolen_bases: 'stolen bases',
	strikeouts: 'strikeouts',
	strikes: 'strikes',
	strikes_contact: 'strikes (contact)',
	strikes_looking: 'strikes (looking)',
	strikes_swinging: 'swinging strikes',
	total_bases: 'total bases',
	total_games: 'games played',
	total_outs: 'total outs',
	triples: 'triples',
	unknown_type: 'unknown type',
	whip: 'WHIP',
	wins: 'wins',
	wpa_bat: 'win probabilty added',
	wpa_pitch: 'win probabilty added',
	year: 'year'
};

const STAT_SORT_TYPE_MAP = {
	age: ['ascending', 'descending'],
	at_bats: ['fewest', 'most'],
	avg: ['lowest', 'highest'],
	avg_lvg_index: ['lowest', 'highest'],
	bases_on_balls: ['fewest', 'most'],
	bat_order: ['ascending', 'descending'],
	batters_faced: ['fewest', 'most'],
	bb_per_nine: ['lowest', 'highest'],
	bb_rate: ['lowest', 'highest'],
	caught_stealing: ['fewest times', 'most times'],
	csw: ['fewest', 'most'],
	def_position: ['ascending', 'descending'],
	doubles: ['fewest', 'most'],
	earned_runs: ['fewest', 'most'],
	era: ['lowest', 'highest'],
	extra_base_hits: ['fewest', 'most'],
	fly_balls: ['fewest', 'most'],
	game_score: ['worst', 'best'],
	games_as_rp: ['fewest', 'most'],
	games_as_sp: ['fewest', 'most'],
	ground_balls: ['fewest', 'most'],
	hits: ['fewest', 'most'],
	homeruns: ['fewest', 'most'],
	hr_per_fb: ['lowest', 'highest'],
	hr_per_nine: ['lowest', 'highest'],
	inherited_runners: ['fewest', 'most'],
	inherited_scored: ['fewest', 'most'],
	innings_pitched: ['fewest', 'most'],
	k_minus_bb: ['lowest', 'highest'],
	k_per_bb: ['lowest', 'highest'],
	k_per_nine: ['lowest', 'highest'],
	k_rate: ['lowest', 'highest'],
	league: ['ascending', 'descending'],
	line_drives: ['fewest', 'most'],
	losses: ['fewest', 'most'],
	obp: ['lowest', 'highest'],
	opponent_team_id_bbref: ['ascending', 'descending'],
	ops: ['lowest', 'highest'],
	pitch_count: ['lowest', 'highest'],
	player_name: ['ascending', 'descending'],
	player_team_id_bbref: ['ascending', 'descending'],
	rbis: ['fewest', 'most'],
	re24_bat: ['lowest', 'highest'],
	re24_pitch: ['lowest', 'highest'],
	runs: ['fewest', 'most'],
	runs_allowed: ['fewest', 'most'],
	runs_scored: ['fewest', 'most'],
	saves: ['fewest', 'most'],
	slg: ['lowest', 'highest'],
	stolen_bases: ['fewest', 'most'],
	strikeouts: ['fewest', 'most'],
	strikes: ['fewest', 'most'],
	strikes_contact: ['fewest', 'most'],
	strikes_looking: ['fewest', 'most'],
	strikes_swinging: ['fewest', 'most'],
	total_bases: ['fewest', 'most'],
	total_games: ['fewest', 'most'],
	total_outs: ['fewest', 'most'],
	triples: ['fewest', 'most'],
	unknown_type: ['fewest', 'most'],
	whip: ['lowest', 'highest'],
	wins: ['fewest', 'most'],
	wpa_bat: ['lowest', 'highest'],
	wpa_pitch: ['lowest', 'highest'],
	year: ['ascending', 'descending']
};

export function getFixedColumnWidth(breakPoint: string, statName: string, sortBy: string): number {
	const columnWidthOptions = RESP_COLUMN_WIDTH_MAP[statName][breakPoint];
	return statName !== sortBy ? columnWidthOptions[0] : columnWidthOptions[1];
}

export function describeSortSetting(sortBy: string, sortDir: 'asc' | 'desc'): string {
	const sortType = sortDir === 'asc' ? STAT_SORT_TYPE_MAP[sortBy][0] : STAT_SORT_TYPE_MAP[sortBy][1];
	return sortType === 'ascending' || sortType === 'descending'
		? `Sorted by: ${STAT_DISPLAY_NAME_MAP[sortBy]} (${sortType})`
		: `Sorted by: ${sortType} ${STAT_DISPLAY_NAME_MAP[sortBy]}`;
}

export function getVariableColumnWidth(tableId: string, statName: string, htmlTag: string, cellPadding = 0): number {
	if (typeof window !== 'undefined') {
		const allElementsInColumnQuery = `#${tableId} [data-stat-name="${statName}"] > ${htmlTag}`;
		const columnElements = Array.from(document.querySelectorAll<HTMLElement>(allElementsInColumnQuery));
		if (columnElements.length > 0) {
			const widestElementInColumn = columnElements.reduce((max, el) => (max.offsetWidth > el.offsetWidth ? max : el));
			return widestElementInColumn.offsetWidth + cellPadding;
		}
	}
	return 0;
}

export function getSortFunction(
	stats: SortableStats,
	propName: string,
	dir: 'asc' | 'desc'
): (a: SortableStats, b: SortableStats) => number {
	const sortFunctionMap = {
		number: {
			desc: (a: SortableStats, b: SortableStats) => b[propName] - a[propName],
			asc: (a: SortableStats, b: SortableStats) => a[propName] - b[propName]
		},
		string: {
			desc: (a: SortableStats, b: SortableStats) => b[propName].localeCompare(a[propName]),
			asc: (a: SortableStats, b: SortableStats) => a[propName].localeCompare(b[propName])
		}
	};
	return sortFunctionMap[typeof stats[propName]][dir];
}
