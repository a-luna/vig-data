import type { PlayerPitchStats } from '$lib/api/types';
import { formatPosNegValue, getHomeTeamIdFromBBrefGameId } from '$lib/util';
import type { ColumnSettings } from '@a-luna/svelte-simple-tables/types';

function isHomeTeam(stats: PlayerPitchStats): boolean {
	const result = getHomeTeamIdFromBBrefGameId(stats.bbref_game_id);
	if (result.success) {
		const homeTeamId = result.value;
		return stats.player_team_id_bbref === homeTeamId;
	}
}

function getOppTeamId(stats: PlayerPitchStats): string {
	return isHomeTeam(stats) ? `vs${stats.opponent_team_id_bbref}` : `@${stats.opponent_team_id_bbref}`;
}

const playerNameLink = (p: PlayerPitchStats): string =>
	`<a sveltekit:prefetch href="/player/${p.player_id_mlb}/pitching">${p.player_name} (${p.player_team_id_bbref})</a>`;

const oppTeamLink = (p: PlayerPitchStats): string =>
	`<a sveltekit:prefetch href="/game?id=${p.bbref_game_id}&show=box">${getOppTeamId(p)}</a>`;

const formatWpa = (p: PlayerPitchStats): string => formatPosNegValue(p.wpa_pitch, 2);

export const columnSettings: ColumnSettings<PlayerPitchStats>[] = [
	{
		propName: 'player_name',
		propType: 'string',
		headerText: 'Player',
		tooltip: 'Player Name',
		classList: ['text-left'],
		colValue: playerNameLink
	},
	{
		propName: 'opponent_team_id_bbref',
		propType: 'string',
		headerText: 'Opp',
		tooltip: 'Opponent',
		classList: ['text-center'],
		colValue: oppTeamLink
	},
	{
		propName: 'innings_pitched',
		propType: 'number',
		headerText: 'IP',
		tooltip: 'Innings Pitched'
	},
	{
		propName: 'hits',
		propType: 'number',
		headerText: 'H',
		tooltip: 'Hits'
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
		propName: 'strikes_swinging',
		propType: 'number',
		headerText: 'StS',
		tooltip: 'Strikes (Swinging)'
	},
	{
		propName: 'csw',
		propType: 'number',
		headerText: 'CSW',
		tooltip: 'Called Strikes + Swinging'
	},
	{
		propName: 'game_score',
		propType: 'number',
		headerText: 'GS',
		tooltip: 'Game Score'
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
		tooltip: 'Inherited Scored'
	},
	{
		propName: 'avg_lvg_index',
		propType: 'number',
		headerText: 'aLI',
		tooltip: 'Average Leverage Index'
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
		tooltip: 'Run Expectancy Based on 24 Base Outs'
	},
	{
		propName: 'summary_stat_line',
		propType: 'number',
		headerText: 'Stat Line',
		tooltip: 'Stat Line',
		classList: ['tracking-wider']
	}
];
