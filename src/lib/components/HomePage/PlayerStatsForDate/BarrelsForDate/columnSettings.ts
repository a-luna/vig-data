import type { PitchFx } from '$lib/api/types';
import { BROOKS_BBREF_TEAM_ID_MAP, PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/constants';
import { capitalize, formatNumber, getHomeTeamIdFromBrooksGameId } from '$lib/util';
import type { ColumnSettings } from '@a-luna/svelte-simple-tables/types';

const batterNameLink = (pfx: PitchFx): string =>
	`<a sveltekit:prefetch href="/player/${pfx.batter_id_mlb}/batting">${pfx.batter_name} (${getBatterTeamId(pfx)})</a>`;

const pitcherTeamLink = (pfx: PitchFx): string =>
	`<a sveltekit:prefetch href="/game?id=${pfx.bbref_game_id}&show=box">${getPitcherTeamId(pfx)}</a>`;

const pitcherNameLink = (pfx: PitchFx): string =>
	`<a sveltekit:prefetch href="/player/${pfx.pitcher_id_mlb}/pitching">${pfx.pitcher_name}</a>`;

const formatLaunchSpeed = (pfx: PitchFx): string => formatNumber(pfx.launch_speed, 1);
const formatLaunchAngle = (pfx: PitchFx): string => `${formatNumber(pfx.launch_angle, 0)}&deg;`;
const formatLaunchDistance = (pfx: PitchFx): string => formatNumber(pfx.total_distance, 0);
const formatPitchType = (pfx: PitchFx): string => capitalize(PITCH_TYPE_ABBREV_TO_NAME_MAP[pfx.mlbam_pitch_name]);
const formatPitchSpeed = (pfx: PitchFx): string => formatNumber(pfx.start_speed, 1);
const formatInOutZone = (pfx: PitchFx): string => (pfx.inside_strike_zone === 1 ? 'Inside' : 'Outside');
const formatTwoStrikeCount = (pfx: PitchFx): string => (pfx.two_strike_count ? 'Yes' : 'No');

function getBatterTeamId(pfx: PitchFx): string {
	const brooksTeamId = pfx.opponent_team_id_bb.toUpperCase();
	return BROOKS_BBREF_TEAM_ID_MAP[brooksTeamId] ?? brooksTeamId;
}

function getPitcherTeamId(pfx: PitchFx): string {
	const brooksTeamId = pfx.pitcher_team_id_bb.toUpperCase();
	const pitcherTeamId = BROOKS_BBREF_TEAM_ID_MAP?.[brooksTeamId] ?? brooksTeamId;
	return isHomeTeam(pfx) ? `vs${pitcherTeamId}` : `@${pitcherTeamId}`;
}

function isHomeTeam(pfx: PitchFx): boolean {
	const result = getHomeTeamIdFromBrooksGameId(pfx.bb_game_id);
	if (result.success) {
		const homeTeamId = result.value.toUpperCase();
		return pfx.opponent_team_id_bb === homeTeamId;
	}
}

export const columnSettings: ColumnSettings<PitchFx>[] = [
	{
		propName: 'batter_name',
		propType: 'string',
		headerText: 'Player',
		tooltip: 'Batter Name',
		classList: ['text-left'],
		colValue: batterNameLink
	},
	{
		propName: 'opponent_team_id_bb',
		propType: 'string',
		headerText: 'Opp',
		tooltip: 'Opponent',
		classList: ['text-center'],
		colValue: pitcherTeamLink
	},
	{
		propName: 'launch_speed',
		propType: 'number',
		headerText: 'Speed',
		tooltip: 'Launch Speed (mph)',
		colValue: formatLaunchSpeed
	},
	{
		propName: 'launch_angle',
		propType: 'number',
		headerText: 'Angle',
		tooltip: 'Launch Angle',
		colValue: formatLaunchAngle
	},
	{
		propName: 'total_distance',
		propType: 'number',
		headerText: 'Distance',
		tooltip: 'Total Distance',
		colValue: formatLaunchDistance
	},
	{
		propName: 'ab_outcome',
		propType: 'string',
		headerText: 'Outcome',
		tooltip: 'Play Description'
	},
	{
		propName: 'pitcher_name',
		propType: 'string',
		headerText: 'Pitcher',
		tooltip: 'Pitcher Name',
		colValue: pitcherNameLink
	},
	{
		propName: 'mlbam_pitch_name',
		propType: 'string',
		headerText: 'Pitch Type',
		tooltip: 'Pitch Type',
		colValue: formatPitchType
	},
	{
		propName: 'start_speed',
		propType: 'number',
		headerText: 'Speed',
		tooltip: 'Pitch Speed',
		colValue: formatPitchSpeed
	},
	{
		propName: 'inning',
		propType: 'number',
		headerText: 'Inn',
		tooltip: 'Inning'
	},
	{
		propName: 'count',
		propType: 'string',
		headerText: 'Count',
		tooltip: 'Count'
	},
	{
		propName: 'two_strike_count',
		propType: 'boolean',
		headerText: 'Two Strikes?',
		tooltip: 'Two-Strike Count',
		colValue: formatTwoStrikeCount
	},
	{
		propName: 'inside_strike_zone',
		propType: 'number',
		headerText: 'In/Out',
		tooltip: 'Inside/Outside Strike Zone',
		colValue: formatInOutZone
	}
];
