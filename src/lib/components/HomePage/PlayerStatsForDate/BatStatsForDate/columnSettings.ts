import type { PlayerBatStats } from '$lib/api/types';
import { formatPosNegValue, getHomeTeamIdFromBBrefGameId } from '$lib/util';
import type { ColumnSettings } from '@a-luna/svelte-simple-tables/types';

function isHomeTeam(stats: PlayerBatStats): boolean {
	const result = getHomeTeamIdFromBBrefGameId(stats.bbref_game_id);
	if (result.success) {
		const homeTeamId = result.value;
		return stats.player_team_id_bbref === homeTeamId;
	}
}

function getOppTeamId(stats: PlayerBatStats): string {
	return isHomeTeam(stats) ? `vs${stats.opponent_team_id_bbref}` : `@${stats.opponent_team_id_bbref}`;
}

const playerNameLink = (b: PlayerBatStats) =>
	`<a sveltekit:prefetch href="/player/${b.player_id_mlb}/batting">{b.player_name} (${b.player_team_id_bbref})</a>`;

const opponentTeamLink = (b: PlayerBatStats) =>
	`<a sveltekit:prefetch href="/game?id=${b.bbref_game_id}&show=box">${getOppTeamId(b)}</a>`;

const formatWpa = (b: PlayerBatStats) => formatPosNegValue(b.wpa_bat, 2);

export const columnSettings: ColumnSettings<PlayerBatStats>[] = [
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
		headerText: 'Opponent',
		tooltip: 'Opponent',
		classList: ['text-center'],
		colValue: opponentTeamLink
	},
	{
		propName: 'at_bats',
		propType: 'number',
		headerText: 'At Bats',
		tooltip: 'At Bats',
		classList: ['']
	},
	{
		propName: 'hits',
		propType: 'number',
		headerText: 'Hits',
		tooltip: 'Hits',
		classList: ['']
	},
	{
		propName: 'bases_on_balls',
		propType: 'number',
		headerText: 'BB',
		tooltip: 'Walks',
		classList: ['']
	},
	{
		propName: 'runs_scored',
		propType: 'number',
		headerText: 'R',
		tooltip: 'Runs Scored',
		classList: ['']
	},
	{
		propName: 'rbis',
		propType: 'number',
		headerText: 'RBI',
		tooltip: 'RBIs',
		classList: ['']
	},
	{
		propName: 'extra_base_hits',
		propType: 'number',
		headerText: 'XBH',
		tooltip: 'Extra Base Hits',
		classList: ['']
	},
	{
		propName: 'homeruns',
		propType: 'number',
		headerText: 'HR',
		tooltip: 'Homeruns',
		classList: ['']
	},
	{
		propName: 'total_bases',
		propType: 'number',
		headerText: 'TB',
		tooltip: 'Total Bases',
		classList: ['']
	},
	{
		propName: 'stolen_bases',
		propType: 'number',
		headerText: 'SB',
		tooltip: 'Stolen Bases',
		classList: ['']
	},
	{
		propName: 'wpa_bat',
		propType: 'number',
		headerText: 'WPA',
		tooltip: 'Win Probability Added by Hitter',
		classList: [''],
		colValue: formatWpa
	},
	{
		propName: 're24_bat',
		propType: 'number',
		headerText: 'RE24',
		tooltip: 'Run Expectancy Based on 24 Base Outs',
		classList: ['']
	}
];
