import type { TeamPitchStats } from '$lib/api/types';
import { formatNumber, formatPercentStat, formatPosNegValue } from '$lib/util';
import type { ColumnSettings } from '@a-luna/svelte-simple-tables/types';
import { formatAge, formatTeamId, formatYear } from './columnSettings';

const formatInningsPitched = (stats: TeamPitchStats): string => formatNumber(stats.innings_pitched, 1);
const formatBattersFaced = (stats: TeamPitchStats): string => formatNumber(stats.batters_faced);
const formatRuns = (stats: TeamPitchStats): string => formatNumber(stats.runs);
const formatEarnedRuns = (stats: TeamPitchStats): string => formatNumber(stats.earned_runs);
const formatHits = (stats: TeamPitchStats): string => formatNumber(stats.hits);
const formatStrikeouts = (stats: TeamPitchStats): string => formatNumber(stats.strikeouts);
const formatWalks = (stats: TeamPitchStats): string => formatNumber(stats.bases_on_balls);
const formatEra = (stats: TeamPitchStats): string => formatNumber(stats.era, 2);
const formatWhip = (stats: TeamPitchStats): string => formatNumber(stats.whip, 2);
const formatKPerNine = (stats: TeamPitchStats): string => formatNumber(stats.k_per_nine, 1);
const formatBBPerNine = (stats: TeamPitchStats): string => formatNumber(stats.bb_per_nine, 1);
const formatHRPerNine = (stats: TeamPitchStats): string => formatNumber(stats.hr_per_nine, 1);
const formatKPerBB = (stats: TeamPitchStats): string => formatNumber(stats.k_per_bb, 1);
const formatKRate = (stats: TeamPitchStats): string => formatPercentStat(stats.k_rate.toString(), 1);
const formatBBRate = (stats: TeamPitchStats): string => formatPercentStat(stats.bb_rate.toString(), 1);
const formatKMinusBB = (stats: TeamPitchStats): string => formatPercentStat(stats.k_minus_bb.toString(), 1);
const formatHRPerFB = (stats: TeamPitchStats): string => formatNumber(stats.hr_per_fb, 1);
const formatWpa = (stats: TeamPitchStats): string => formatPosNegValue(stats.wpa_pitch, 2);
const formatRe24 = (stats: TeamPitchStats): string => formatPosNegValue(stats.re24_pitch, 1);

export const columnSettings: ColumnSettings<TeamPitchStats>[] = [
	{
		propName: 'year',
		propType: 'number',
		headerText: 'Year',
		tooltip: 'Year',
		classList: ['overflow-x-visible'],
		colValue: formatYear
	},
	{
		propName: 'age',
		propType: 'number',
		headerText: 'Age',
		tooltip: "Player's age at midnight on June 30 of each season",
		colValue: formatAge
	},
	{
		propName: 'player_team_id_bbref',
		propType: 'string',
		headerText: 'Team',
		tooltip: 'Team',
		colValue: formatTeamId
	},
	{
		propName: 'league',
		propType: 'number',
		headerText: 'Lg',
		tooltip: 'American or National League'
	},
	{
		propName: 'wins',
		propType: 'number',
		headerText: 'W',
		tooltip: 'Wins'
	},
	{
		propName: 'losses',
		propType: 'number',
		headerText: 'L',
		tooltip: 'Losses'
	},
	{
		propName: 'total_games',
		propType: 'number',
		headerText: 'G',
		tooltip: 'Total Games'
	},
	{
		propName: 'games_as_sp',
		propType: 'number',
		headerText: 'GS',
		tooltip: 'Total Games as SP'
	},
	{
		propName: 'games_as_rp',
		propType: 'number',
		headerText: 'GR',
		tooltip: 'Total Games as RP'
	},
	{
		propName: 'saves',
		propType: 'number',
		headerText: 'SV',
		tooltip: 'Saves'
	},
	{
		propName: 'innings_pitched',
		propType: 'number',
		headerText: 'IP',
		tooltip: 'Innings Pitched',
		colValue: formatInningsPitched
	},
	{
		propName: 'era',
		propType: 'number',
		headerText: 'ERA',
		tooltip: 'ERA',
		colValue: formatEra
	},
	{
		propName: 'whip',
		propType: 'number',
		headerText: 'WHIP',
		tooltip: 'WHIP',
		colValue: formatWhip
	},
	{
		propName: 'hits',
		propType: 'number',
		headerText: 'H',
		tooltip: 'Hits',
		colValue: formatHits
	},
	{
		propName: 'runs_allowed',
		propType: 'number',
		headerText: 'R',
		tooltip: 'Runs Allowed',
		colValue: formatRuns
	},
	{
		propName: 'earned_runs',
		propType: 'number',
		headerText: 'ER',
		tooltip: 'Earned Runs',
		colValue: formatEarnedRuns
	},
	{
		propName: 'strikeouts',
		propType: 'number',
		headerText: 'K',
		tooltip: 'Strikeouts',
		colValue: formatStrikeouts
	},
	{
		propName: 'bases_on_balls',
		propType: 'number',
		headerText: 'BB',
		tooltip: 'Walks',
		colValue: formatWalks
	},
	{
		propName: 'homeruns',
		propType: 'number',
		headerText: 'HR',
		tooltip: 'Homeruns'
	},
	{
		propName: 'batters_faced',
		propType: 'number',
		headerText: 'BF',
		tooltip: 'Batters Faced',
		colValue: formatBattersFaced
	},
	{
		propName: 'k_per_nine',
		propType: 'number',
		headerText: 'K/9',
		tooltip: 'K/9',
		colValue: formatKPerNine
	},
	{
		propName: 'bb_per_nine',
		propType: 'number',
		headerText: 'BB/9',
		tooltip: 'BB/9',
		colValue: formatBBPerNine
	},
	{
		propName: 'hr_per_nine',
		propType: 'number',
		headerText: 'HR/9',
		tooltip: 'HR/9',
		colValue: formatHRPerNine
	},
	{
		propName: 'k_per_bb',
		propType: 'number',
		headerText: 'K/BB',
		tooltip: 'K/BB',
		colValue: formatKPerBB
	},
	{
		propName: 'k_rate',
		propType: 'number',
		headerText: 'K%',
		tooltip: 'K%',
		colValue: formatKRate
	},
	{
		propName: 'bb_rate',
		propType: 'number',
		headerText: 'BB%',
		tooltip: 'BB%',
		colValue: formatBBRate
	},
	{
		propName: 'k_minus_bb',
		propType: 'number',
		headerText: 'K%-BB%',
		tooltip: 'K%-BB%',
		colValue: formatKMinusBB
	},
	{
		propName: 'hr_per_fb',
		propType: 'number',
		headerText: 'HR/FB',
		tooltip: 'HR/FB',
		colValue: formatHRPerFB
	},
	{
		propName: 'inherited_runners',
		propType: 'number',
		headerText: 'IR',
		tooltip: 'Inherited Runners'
	},
	{
		propName: 'inherited_scored',
		propType: 'number',
		headerText: 'IS',
		tooltip: 'Inherited Runners that Scored'
	},
	{
		propName: 'wpa_pitch',
		propType: 'number',
		headerText: 'WPA',
		tooltip: 'Win Probability Added by Pitcher',
		colValue: formatWpa
	},
	{
		propName: 're24_pitch',
		propType: 'number',
		headerText: 'RE24',
		tooltip: 'Run Expectancy Based on 24 Base Outs',
		colValue: formatRe24
	}
];
