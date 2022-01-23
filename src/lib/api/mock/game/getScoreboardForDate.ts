import type { ScoreboardApiResponse } from '$lib/api/types';

export const scoreboardForDateMockData: ScoreboardApiResponse = {
	season: { year: 2021, start_date: '2021-04-01', end_date: '2021-10-03', asg_date: '2021-07-13' },
	games_for_date: [
		{
			game_id: 'ATL202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'NYM',
				away_team_runs: [0, 0, 0, 0, 0, 0, 0, 0, 0],
				away_team_totals: [0, 3, 0],
				home_team_id: 'ATL',
				home_team_runs: [2, 0, 3, 0, 0, 0, 0, 0, 'X'],
				home_team_totals: [5, 7, 0],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 675911, name: 'Spencer Strider', team_id: 'ATL' },
				lp: { mlb_id: 592789, name: 'Noah Syndergaard', team_id: 'NYM' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'NYA202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'TBR',
				away_team_runs: [0, 0, 0, 0, 0, 0, 0, 0, 0],
				away_team_totals: [0, 5, 0],
				home_team_id: 'NYY',
				home_team_runs: [0, 0, 0, 0, 0, 0, 0, 0, 1],
				home_team_totals: [1, 4, 0],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 547973, name: 'Aroldis Chapman', team_id: 'NYY' },
				lp: { mlb_id: 676596, name: 'Josh Fleming', team_id: 'TBR' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'PIT202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'CIN',
				away_team_runs: [0, 0, 1, 0, 4, 1, 0, 0, 0],
				away_team_totals: [6, 11, 0],
				home_team_id: 'PIT',
				home_team_runs: [1, 0, 0, 0, 0, 0, 0, 0, 2],
				home_team_totals: [3, 9, 0],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 665665, name: 'Reiver Sanmartin', team_id: 'CIN' },
				lp: { mlb_id: 664074, name: 'Cody Ponce', team_id: 'PIT' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'SFN202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'SDP',
				away_team_runs: [0, 0, 0, 1, 0, 0, 0, 3, 0],
				away_team_totals: [4, 7, 0],
				home_team_id: 'SFG',
				home_team_runs: [0, 0, 2, 5, 2, 0, 2, 0, 'X'],
				home_team_totals: [11, 10, 0],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 657277, name: 'Logan Webb', team_id: 'SFG' },
				lp: { mlb_id: 663753, name: 'Reiss Knehr', team_id: 'SDP' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'TEX202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'CLE',
				away_team_runs: [1, 0, 3, 0, 2, 0, 0, 0, 0],
				away_team_totals: [6, 7, 0],
				home_team_id: 'TEX',
				home_team_runs: [0, 0, 0, 0, 0, 0, 0, 0, 0],
				home_team_totals: [0, 4, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 650644, name: 'Aaron Civale', team_id: 'CLE' },
				lp: { mlb_id: 641540, name: 'Dane Dunning', team_id: 'TEX' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'WAS202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'BOS',
				away_team_runs: [0, 0, 0, 1, 0, 1, 3, 0, 2],
				away_team_totals: [7, 13, 0],
				home_team_id: 'WSN',
				home_team_runs: [0, 1, 1, 0, 3, 0, 0, 0, 0],
				home_team_totals: [5, 7, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 593958, name: 'Eduardo Rodriguez', team_id: 'BOS' },
				lp: { mlb_id: 640448, name: 'Kyle Finnegan', team_id: 'WSN' },
				sv: { mlb_id: 601713, name: 'Nick Pivetta', team_id: 'BOS' }
			},
			extra_innings: false
		},
		{
			game_id: 'TOR202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'BAL',
				away_team_runs: [0, 0, 1, 0, 1, 0, 1, 1, 0],
				away_team_totals: [4, 13, 0],
				home_team_id: 'TOR',
				home_team_runs: [3, 2, 4, 2, 1, 0, 0, 0, 'X'],
				home_team_totals: [12, 12, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 547943, name: 'Hyun Jin Ryu', team_id: 'TOR' },
				lp: { mlb_id: 669145, name: 'Bruce Zimmermann', team_id: 'BAL' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'ARI202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'COL',
				away_team_runs: [0, 3, 0, 0, 1, 0, 0, 0, 0],
				away_team_totals: [4, 9, 1],
				home_team_id: 'ARI',
				home_team_runs: [0, 0, 0, 0, 1, 0, 1, 2, 1],
				home_team_totals: [5, 8, 2],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 605525, name: 'J.B. Wendelken', team_id: 'ARI' },
				lp: { mlb_id: 608032, name: 'Carlos Estevez', team_id: 'COL' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'CHA202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'DET',
				away_team_runs: [1, 0, 0, 0, 1, 0, 0, 0, 3],
				away_team_totals: [5, 9, 1],
				home_team_id: 'CHW',
				home_team_runs: [1, 0, 0, 0, 0, 0, 1, 0, 0],
				home_team_totals: [2, 8, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 641729, name: 'Joe Jimenez', team_id: 'DET' },
				lp: { mlb_id: 625643, name: 'Reynaldo Lopez', team_id: 'CHW' },
				sv: { mlb_id: 605242, name: 'Michael Fulmer', team_id: 'DET' }
			},
			extra_innings: false
		},
		{
			game_id: 'HOU202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'OAK',
				away_team_runs: [0, 1, 1, 0, 1, 0, 0, 0, 3],
				away_team_totals: [6, 7, 0],
				home_team_id: 'HOU',
				home_team_runs: [0, 1, 1, 0, 0, 2, 1, 1, 1],
				home_team_totals: [7, 12, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 642130, name: 'Blake Taylor', team_id: 'HOU' },
				lp: { mlb_id: 642152, name: 'Lou Trivino', team_id: 'OAK' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'KCA202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'MIN',
				away_team_runs: [5, 0, 0, 0, 2, 0, 0, 0, 0],
				away_team_totals: [7, 9, 1],
				home_team_id: 'KCR',
				home_team_runs: [0, 0, 3, 0, 0, 0, 0, 0, 0],
				home_team_totals: [3, 9, 0],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 543883, name: 'Nick Vincent', team_id: 'MIN' },
				lp: { mlb_id: 663804, name: 'Jackson Kowar', team_id: 'KCR' },
				sv: { mlb_id: 660896, name: 'Jorge Alcala', team_id: 'MIN' }
			},
			extra_innings: false
		},
		{
			game_id: 'LAN202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'MIL',
				away_team_runs: [0, 0, 0, 1, 0, 0, 0, 2, 0],
				away_team_totals: [3, 7, 0],
				home_team_id: 'LAD',
				home_team_runs: [0, 0, 0, 0, 6, 1, 0, 3, 'X'],
				home_team_totals: [10, 10, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 621111, name: 'Walker Buehler', team_id: 'LAD' },
				lp: { mlb_id: 676879, name: 'Aaron Ashby', team_id: 'MIL' },
				sv: { mlb_id: 656578, name: 'Andre Jackson', team_id: 'LAD' }
			},
			extra_innings: false
		},
		{
			game_id: 'MIA202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'PHI',
				away_team_runs: [0, 1, 2, 0, 0, 0, 0, 1, 0],
				away_team_totals: [4, 8, 0],
				home_team_id: 'MIA',
				home_team_runs: [2, 1, 0, 2, 0, 0, 0, 0, 'X'],
				home_team_totals: [5, 7, 0],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 605507, name: 'Zach Thompson', team_id: 'MIA' },
				lp: { mlb_id: 593576, name: 'Hector Neris', team_id: 'PHI' },
				sv: { mlb_id: 571670, name: 'Dylan Floro', team_id: 'MIA' }
			},
			extra_innings: false
		},
		{
			game_id: 'SEA202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'LAA',
				away_team_runs: [2, 2, 0, 2, 1, 0, 0, 0, 0],
				away_team_totals: [7, 10, 0],
				home_team_id: 'SEA',
				home_team_runs: [0, 2, 0, 0, 0, 1, 0, 0, 0],
				home_team_totals: [3, 9, 2],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 661383, name: 'Oliver Ortega', team_id: 'LAA' },
				lp: { mlb_id: 542881, name: 'Tyler Anderson', team_id: 'SEA' },
				sv: null
			},
			extra_innings: false
		},
		{
			game_id: 'SLN202110030',
			linescore: {
				inning_numbers: [1, 2, 3, 4, 5, 6, 7],
				game_totals: ['R', 'H', 'E'],
				away_team_id: 'CHC',
				away_team_runs: [1, 0, 0, 0, 2, 0, 0],
				away_team_totals: [3, 6, 0],
				home_team_id: 'STL',
				home_team_runs: [1, 1, 0, 0, 0, 0, 0],
				home_team_totals: [2, 6, 1],
				extra_innings: false,
				removed_innings: null
			},
			pitcher_results: {
				wp: { mlb_id: 607352, name: 'Joe Biagini', team_id: 'CHC' },
				lp: { mlb_id: 663765, name: 'Jake Woodford', team_id: 'STL' },
				sv: null
			},
			extra_innings: false
		}
	]
};
