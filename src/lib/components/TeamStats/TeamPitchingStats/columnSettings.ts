import type { TeamPitchStats } from '$lib/api/types';
import { TEAM_ID_TO_CITY_MAP } from '$lib/constants';
import { formatNumber, formatPercentStat, formatPosNegValue } from '$lib/util';
import type { ColumnSettings } from '@a-luna/svelte-simple-tables/types';

const teamIdLink = (stats: TeamPitchStats): string =>
	`<a sveltekit:prefetch href="/team/${stats.player_team_id_bbref}/${stats.year}">${
		TEAM_ID_TO_CITY_MAP[stats.player_team_id_bbref]
	}</a>`;
const playerNameLink = (stats: TeamPitchStats): string =>
	`<a sveltekit:prefetch href="/player/${stats.mlb_id}/pitching">${stats.player_name}</a>`;

const formatInningsPitched = (stats: TeamPitchStats): string => formatNumber(stats.innings_pitched, 1);
const formatTotalOuts = (stats: TeamPitchStats): string => formatNumber(stats.total_outs);
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
const formatPitchCount = (stats: TeamPitchStats): string => formatNumber(stats.pitch_count);
const formatStrikes = (stats: TeamPitchStats): string => formatNumber(stats.strikes);
const formatStrikesContact = (stats: TeamPitchStats): string => formatNumber(stats.strikes_contact);
const formatStrikesSwinging = (stats: TeamPitchStats): string => formatNumber(stats.strikes_swinging);
const formatStrikesLooking = (stats: TeamPitchStats): string => formatNumber(stats.strikes_looking);
const formatLineDrives = (stats: TeamPitchStats): string => formatNumber(stats.line_drives);
const formatGroundBalls = (stats: TeamPitchStats): string => formatNumber(stats.ground_balls);
const formatFlyBalls = (stats: TeamPitchStats): string => formatNumber(stats.fly_balls);
const formatWpa = (stats: TeamPitchStats): string => formatPosNegValue(stats.wpa_pitch, 2);
const formatRe24 = (stats: TeamPitchStats): string => formatPosNegValue(stats.re24_pitch, 1);

const columnSettings: ColumnSettings<TeamPitchStats>[] = [
	{
		propName: 'player_team_id_bbref',
		propType: 'string',
		headerText: 'Team',
		tooltip: 'Team',
		colValue: teamIdLink
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
		propName: 'total_outs',
		propType: 'number',
		headerText: 'Outs',
		tooltip: 'Total Outs',
		colValue: formatTotalOuts
	},
	{
		propName: 'batters_faced',
		propType: 'number',
		headerText: 'BF',
		tooltip: 'Batters Faced',
		colValue: formatBattersFaced
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
		propName: 'hits',
		propType: 'number',
		headerText: 'H',
		tooltip: 'Hits',
		colValue: formatHits
	},
	{
		propName: 'homeruns',
		propType: 'number',
		headerText: 'HR',
		tooltip: 'Homeruns'
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
		propName: 'pitch_count',
		propType: 'number',
		headerText: 'Pit',
		tooltip: 'Pitch Count',
		colValue: formatPitchCount
	},
	{
		propName: 'strikes',
		propType: 'number',
		headerText: 'Str',
		tooltip: 'Strikes',
		colValue: formatStrikes
	},
	{
		propName: 'strikes_contact',
		propType: 'number',
		headerText: 'StC',
		tooltip: 'Strikes (Contact)',
		colValue: formatStrikesContact
	},
	{
		propName: 'strikes_swinging',
		propType: 'number',
		headerText: 'StS',
		tooltip: 'Strikes (Swinging)',
		colValue: formatStrikesSwinging
	},
	{
		propName: 'strikes_looking',
		propType: 'number',
		headerText: 'StL',
		tooltip: 'Strikes (Looking)',
		colValue: formatStrikesLooking
	},
	{
		propName: 'line_drives',
		propType: 'number',
		headerText: 'LD',
		tooltip: 'Line Drives',
		colValue: formatLineDrives
	},
	{
		propName: 'ground_balls',
		propType: 'number',
		headerText: 'GB',
		tooltip: 'Ground Balls',
		colValue: formatGroundBalls
	},
	{
		propName: 'fly_balls',
		propType: 'number',
		headerText: 'FB',
		tooltip: 'Fly Balls',
		colValue: formatFlyBalls
	},
	{
		propName: 'unknown_type',
		propType: 'number',
		headerText: 'Unk',
		tooltip: 'Unknown Batted Ball Type'
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

export const teamColumnSettings: ColumnSettings<TeamPitchStats>[] = [
	{
		propName: 'player_team_id_bbref',
		propType: 'string',
		headerText: 'Team',
		tooltip: 'Team',
		colValue: teamIdLink
	},
	...columnSettings
];

export const playerColumnSettings: ColumnSettings<TeamPitchStats>[] = [
	{
		propName: 'player_name',
		propType: 'string',
		headerText: 'Player',
		tooltip: 'Player Name',
		colValue: playerNameLink
	},
	...columnSettings
];
