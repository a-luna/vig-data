import type { TeamBatStats } from '$lib/api/types';
import { TEAM_ID_TO_CITY_MAP } from '$lib/constants';
import { formatNumber, formatPercentStat, formatPosNegValue, formatRateStat } from '$lib/util';
import type { ColumnSettings } from '@a-luna/svelte-simple-tables/types';

const teamIdLink = (stats: TeamBatStats): string =>
	`<a sveltekit:prefetch href="/team/${stats.player_team_id_bbref}/${stats.year}">${
		TEAM_ID_TO_CITY_MAP[stats.player_team_id_bbref]
	}</a>`;

const playerNameLink = (stats: TeamBatStats): string =>
	`<a sveltekit:prefetch href="/player/${stats.mlb_id}/batting">${stats.player_name}</a>`;

const formatAvg = (stats: TeamBatStats): string => formatRateStat(stats.avg.toString(), 3);
const formatObp = (stats: TeamBatStats): string => formatRateStat(stats.obp.toString(), 3);
const formatSlg = (stats: TeamBatStats): string => formatRateStat(stats.slg.toString(), 3);
const formatOps = (stats: TeamBatStats): string => formatRateStat(stats.ops.toString(), 3);
const formatBBRate = (stats: TeamBatStats): string => formatPercentStat(stats.bb_rate.toString(), 1);
const formatKRate = (stats: TeamBatStats): string => formatPercentStat(stats.k_rate.toString(), 1);
const formatAtBats = (stats: TeamBatStats): string => formatNumber(stats.at_bats);
const formatWpa = (stats: TeamBatStats): string => formatPosNegValue(stats.wpa_bat, 2);
const formatRE24 = (stats: TeamBatStats): string => formatPosNegValue(stats.re24_bat, 1);

const columnSettings: ColumnSettings<TeamBatStats>[] = [
	{
		propName: 'avg',
		propType: 'number',
		headerText: 'AVG',
		tooltip: 'Batting Average',
		colValue: formatAvg
	},
	{
		propName: 'obp',
		propType: 'number',
		headerText: 'OBP',
		tooltip: 'On Base Percentage',
		colValue: formatObp
	},
	{
		propName: 'slg',
		propType: 'number',
		headerText: 'SLG',
		tooltip: 'Slugging Percentage',
		colValue: formatSlg
	},
	{
		propName: 'ops',
		propType: 'number',
		headerText: 'OPS',
		tooltip: 'On Base Plus Slugging Percentage',
		colValue: formatOps
	},
	{
		propName: 'bb_rate',
		propType: 'number',
		headerText: 'BB%',
		tooltip: 'Walk Rate',
		colValue: formatBBRate
	},
	{
		propName: 'k_rate',
		propType: 'number',
		headerText: 'K%',
		tooltip: 'Strikeout Rate',
		colValue: formatKRate
	},
	{
		propName: 'at_bats',
		propType: 'number',
		headerText: 'AB',
		tooltip: 'At Bats',
		colValue: formatAtBats
	},
	{
		propName: 'hits',
		propType: 'number',
		headerText: 'H',
		tooltip: 'Hits'
	},
	{
		propName: 'runs_scored',
		propType: 'number',
		headerText: 'R',
		tooltip: 'Runs Scored'
	},
	{
		propName: 'rbis',
		propType: 'number',
		headerText: 'RBI',
		tooltip: 'RBIs'
	},
	{
		propName: 'bases_on_balls',
		propType: 'number',
		headerText: 'BB',
		tooltip: 'Walks'
	},
	{
		propName: 'strikeouts',
		propType: 'number',
		headerText: 'K',
		tooltip: 'Strikeouts'
	},
	{
		propName: 'doubles',
		propType: 'number',
		headerText: '2B',
		tooltip: 'Doubles'
	},
	{
		propName: 'triples',
		propType: 'number',
		headerText: '3B',
		tooltip: 'Triples'
	},
	{
		propName: 'homeruns',
		propType: 'number',
		headerText: 'HR',
		tooltip: 'Homeruns'
	},
	{
		propName: 'stolen_bases',
		propType: 'number',
		headerText: 'SB',
		tooltip: 'Stolen Bases'
	},
	{
		propName: 'caught_stealing',
		propType: 'number',
		headerText: 'CS',
		tooltip: 'Caught Stealing'
	},
	{
		propName: 'wpa_bat',
		propType: 'number',
		headerText: 'WPA',
		tooltip: 'Win Probability Added by Hitter',
		colValue: formatWpa
	},
	{
		propName: 're24_bat',
		propType: 'number',
		headerText: 'RE24',
		tooltip: 'Run Expectancy Based on 24 Base Outs',
		colValue: formatRE24
	}
];

export const teamColumnSettings: ColumnSettings<TeamBatStats>[] = [
	{
		propName: 'player_team_id_bbref',
		propType: 'string',
		headerText: 'Team',
		tooltip: 'Team',
		colValue: teamIdLink
	},
	...columnSettings
];

export const playerColumnSettings: ColumnSettings<TeamBatStats>[] = [
	{
		propName: 'player_name',
		propType: 'string',
		headerText: 'Player ',
		tooltip: 'Player Name',
		colValue: playerNameLink
	},
	...columnSettings
];
