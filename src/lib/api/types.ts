import type { BatterStance } from '$lib/types';

export interface GameDate {
	year: number;
	month: number;
	month_name: string;
	day: number;
}

export interface Result<T> {
	success: boolean;
	message?: string;
	value?: T;
}

export interface ApiResponse<T> extends Result<T> {
	status: number;
	response?: Response;
}

export interface PlayerSearchResult {
	match: string;
	score: number;
	result: number;
}

export interface PlayerDetails {
	name_first: string;
	name_last: string;
	name_given: string;
	bats: string;
	throws: string;
	weight: number;
	height: number;
	debut: string;
	birth_year: number;
	birth_month: number;
	birth_day: number;
	birth_country: string;
	birth_state: string;
	birth_city: string;
	bbref_id: string;
	mlb_id: number;
}

export interface MlbSeason {
	year: number;
	start_date: string;
	end_date: string;
	asg_date: string;
}

export interface TeamSeasonData {
	year: number;
	league: string;
	team_id: string;
	franch_id: string;
	division: string;
	games: number;
	games_at_home: number;
	wins: number;
	losses: number;
	runs: number;
	at_bats: number;
	hits: number;
	doubles: number;
	triples: number;
	homeruns: number;
	base_on_balls: number;
	strikeouts: number;
	stolen_bases: number;
	caught_stealing: number;
	runs_against: number;
	earned_runs: number;
	saves: number;
	ip_outs: number;
	errors: number;
	name: string;
	park: string;
	batting_park_factor: number;
	pitching_park_factor: number;
	team_id_br: string;
	team_id_retro: string;
}

export interface LeagueSeasonData {
	e: TeamSeasonData[];
	c: TeamSeasonData[];
	w: TeamSeasonData[];
}

export interface SeasonData {
	al: LeagueSeasonData;
	nl: LeagueSeasonData;
}

export interface AtBatEvent {
	inning_id: string;
	inning_label: string;
	pbp_table_row_number: number;
	at_bat_id: string;
	event_type: string;
}

export interface PlayByPlayEvent extends AtBatEvent {
	event_id: string;
	score: string;
	outs_before_play: number;
	runners_on_base: string;
	pitch_sequence: string;
	runs_outs_result: string;
	team_batting_id_br: string;
	team_pitching_id_br: string;
	play_description: string;
	pitcher_id_br: string;
	batter_id_br: string;
	is_complete_at_bat: boolean;
}

export interface PlayerSubEvent extends AtBatEvent {
	sub_type: string;
	team_id: string;
	sub_description: string;
	outgoing_player_id_br: string;
	outgoing_player_pos: string;
	incoming_player_id_br: string;
	incoming_player_pos: string;
	lineup_slot: number;
}

export interface MiscGameEvent extends AtBatEvent {
	description: string;
}

export interface BatStatDetail {
	count: number;
	stat: string;
}

export interface AtBatSummary {
	at_bat_id: string;
	pbp_table_row_number: number;
	batter_name: string;
	pitcher_name: string;
	inning: string;
	runners_on_base: string;
	outs: number;
	play_description: string;
	pitch_sequence: string;
}

export interface InningTotals {
	outs: number;
	hits: number;
	runs: number;
	bb: number;
	so: number;
	bf: number;
	pitch_count: number;
	strikes: number;
}

export type InningTotalsMap = { [key: string]: InningTotals };

export interface BatStats {
	row_id: number;
	name: string;
	mlb_id: number;
	is_starter: boolean;
	bat_order: number;
	def_position: number;
	position_start: string;
	position_changes: string;
	stat_line: string;
	plate_appearances: number;
	at_bats: number;
	hits: number;
	runs_scored: number;
	rbis: number;
	bases_on_balls: number;
	strikeouts: number;
	avg_to_date: number;
	obp_to_date: number;
	slg_to_date: number;
	ops_to_date: number;
	total_pitches: number;
	total_strikes: number;
	wpa_bat: number;
	avg_lvg_index: number;
	wpa_bat_pos: number;
	wpa_bat_neg: number;
	re24_bat: number;
	details?: BatStatDetail[];
	at_bat_results: AtBatSummary[];
	incomplete_at_bat_ids: string[];
	substitutions?: PlayerSubEvent[];
}

export interface PitchStats {
	row_id: number;
	name: string;
	mlb_id: number;
	pitch_app_type: string;
	stat_line: string;
	pitch_app_id: string;
	innings_pitched: number;
	hits: number;
	runs: number;
	earned_runs: number;
	bases_on_balls: number;
	strikeouts: number;
	homeruns: number;
	batters_faced: number;
	pitch_count: number;
	strikes: number;
	strikes_contact: number;
	strikes_swinging: number;
	strikes_looking: number;
	ground_balls: number;
	fly_balls: number;
	line_drives: number;
	unknown_type: number;
	game_score: number;
	inherited_runners: number;
	inherited_scored: number;
	wpa_pitch: number;
	avg_lvg_index: number;
	re24_pitch: number;
	at_bat_ids: string[];
	inning_totals: InningTotalsMap;
	substitutions?: PlayerSubEvent[];
}

export interface TeamData {
	team_id: string;
	team_name: string;
	total_wins: number;
	total_losses: number;
	runs_scored_by_team: number;
	runs_scored_by_opponent: number;
	team_won: boolean;
	pitcher_of_record: string;
	pitcher_earned_save: string;
	batting: BatStats[];
	pitching: PitchStats[];
}

export interface TeamBatStats {
	year: number;
	team_id_bbref: string;
	is_starter: boolean;
	bat_order: number;
	def_position: number;
	mlb_id: number;
	bbref_id: string;
	stint_number: number;
	total_games: number;
	avg: number;
	obp: number;
	slg: number;
	ops: number;
	iso: number;
	bb_rate: number;
	k_rate: number;
	contact_rate: number;
	plate_appearances: number;
	at_bats: number;
	hits: number;
	runs_scored: number;
	rbis: number;
	bases_on_balls: number;
	strikeouts: number;
	doubles: number;
	triples: number;
	homeruns: number;
	stolen_bases: number;
	caught_stealing: number;
	hit_by_pitch: number;
	intentional_bb: number;
	gdp: number;
	sac_fly: number;
	sac_hit: number;
	total_pitches: number;
	total_strikes: number;
	wpa_bat: number;
	wpa_bat_pos: number;
	wpa_bat_neg: number;
	re24_bat: number;
	league: 'AL' | 'NL';
	division: 'C' | 'E' | 'W';
}

export interface TeamPitchStats {
	year: number;
	team_id_bbref: string;
	opponent_team_id_bbref: string;
	mlb_id: number;
	bbref_id: string;
	player_name?: string;
	stint_number: number;
	total_games: number;
	games_as_sp: number;
	games_as_rp: number;
	wins: number;
	losses: number;
	saves: number;
	innings_pitched: number;
	total_outs: number;
	batters_faced: number;
	runs: number;
	earned_runs: number;
	hits: number;
	homeruns: number;
	strikeouts: number;
	bases_on_balls: number;
	era: number;
	whip: number;
	k_per_nine: number;
	bb_per_nine: number;
	hr_per_nine: number;
	k_per_bb: number;
	k_rate: number;
	bb_rate: number;
	k_minus_bb: number;
	hr_per_fb: number;
	pitch_count: number;
	strikes: number;
	strikes_contact: number;
	strikes_swinging: number;
	strikes_looking: number;
	ground_balls: number;
	fly_balls: number;
	line_drives: number;
	unknown_type: number;
	inherited_runners: number;
	inherited_scored: number;
	wpa_pitch: number;
	re24_pitch: number;
	league: 'AL' | 'NL';
	division: 'C' | 'E' | 'W';
}

export type LinescoreDigit = string | number;

export interface LinescoreColumn {
	col_index: number;
	col_header: string;
	away_team: LinescoreDigit;
	home_team: LinescoreDigit;
	css_class: string;
	removed_inning: boolean;
}

export interface Linescore {
	inning_numbers: number[];
	game_totals: string[];
	away_team_id: string;
	away_team_runs: LinescoreDigit[];
	away_team_totals: number[];
	home_team_id: string;
	home_team_runs: number[];
	home_team_totals: number[];
	extra_innings: boolean;
	removed_innings?: boolean[];
}

export interface PlayerId {
	mlb_id: number;
	name: string;
	team_id: string;
}

export interface PitcherResults {
	wp: PlayerId;
	lp: PlayerId;
	sv?: PlayerId;
}

export interface GameData {
	game_id: string;
	linescore: Linescore;
	pitcher_results: PitcherResults;
	extra_innings: boolean;
}

export interface Umpire {
	field_location: string;
	umpire_name: string;
}

export interface GameMeta {
	park_name: string;
	field_type: string;
	day_night: string;
	game_start_time: string;
	first_pitch_temperature: number;
	first_pitch_precipitation: string;
	first_pitch_wind: string;
	first_pitch_clouds: string;
	game_duration: string;
	attendance: number;
	umpires: Umpire[];
}

export interface InningTotals {
	inning_total_runs: number;
	inning_total_hits: number;
	inning_total_errors: number;
	inning_total_left_on_base: number;
	away_team_runs_after_inning: number;
	home_team_runs_after_inning: number;
}

export interface InningSummary {
	inning_label: string;
	begin_inning_summary: string;
	end_inning_summary: string;
	inning_totals: InningTotals;
}

export interface Boxscore {
	game_id: string;
	away_team: TeamData;
	home_team: TeamData;
	extra_innings: boolean;
	game_meta: GameMeta;
	linescore: Linescore;
	linescore_complete?: Linescore;
	inning_summaries: { [key: string]: InningSummary };
}

export interface Scoreboard {
	season: MlbSeason;
	games_for_date: GameData[];
}

export type PBPEvent = PlayByPlayEvent | PlayerSubEvent | MiscGameEvent;

export interface AtBatDetails {
	at_bat_id: string;
	pfx_ab_id: number;
	inning_id: string;
	inning_label: string;
	pitch_app_id: string;
	pbp_table_row_number: number;
	pitcher_id_bbref: string;
	pitcher_id_mlb: number;
	pitcher_name: string;
	pitcher_throws: string;
	batter_id_bbref: string;
	batter_id_mlb: number;
	batter_name: string;
	batter_stance: string;
	first_pitch_thrown: string;
	last_pitch_thrown: string;
	since_game_start: number;
	at_bat_duration: number;
	is_complete_at_bat: boolean;
	score: string;
	outs_before_play: number;
	runners_on_base: string;
	runs_outs_result: string;
	play_description: string;
	total_pitches: number;
	pfx_complete: boolean;
	pfx_des: string;
	final_count_balls: number;
	final_count_strikes: number;
	pitch_sequence_description: string[][];
	pbp_events: PBPEvent[];
}

export interface AtBatPitchDescription {
	number: string;
	description: string;
	type: string;
	blocked_by_c: boolean;
	out_of_boundary: boolean;
	non_pitch_event: boolean;
}

export type PitchTypeAbbrev =
	| 'CH'
	| 'CU'
	| 'EP'
	| 'FA'
	| 'FC'
	| 'FF'
	| 'FS'
	| 'FT'
	| 'FO'
	| 'IN'
	| 'KC'
	| 'KN'
	| 'PO'
	| 'SC'
	| 'SI'
	| 'SL'
	| 'UN';
export type PitchType = PitchTypeAbbrev | number;

export interface PitchFx {
	bb_game_id: string;
	bbref_game_id: string;
	pitch_app_id: string;
	inning_id: string;
	at_bat_id: string;
	pitcher_id_mlb: number;
	batter_id_mlb: number;
	pitcher_id_bbref: string;
	batter_id_bbref: string;
	pitcher_team_id_bb: string;
	opponent_team_id_bb: string;
	p_throws: string;
	stand: string;
	pitch_id: number;
	inning: number;
	ab_total: number;
	ab_count: number;
	ab_id: number;
	table_row_number: number;
	des: string;
	strikes: number;
	balls: number;
	basic_type: string;
	pdes: string;
	mlbam_pitch_name: string;
	park_sv_id: string;
	game_start_time_utc: string;
	time_pitch_thrown_utc: string;
	seconds_since_game_start: number;
	has_zone_location: number;
	batter_did_swing: number;
	batter_made_contact: number;
	called_strike: number;
	swinging_strike: number;
	inside_strike_zone: number;
	outside_strike_zone: number;
	swing_inside_zone: number;
	swing_outside_zone: number;
	contact_inside_zone: number;
	contact_outside_zone: number;
	is_batted_ball: number;
	is_ground_ball: number;
	is_fly_ball: number;
	is_line_drive: number;
	is_pop_up: number;
	is_final_pitch_of_ab: number;
	ab_result_out: number;
	ab_result_hit: number;
	ab_result_single: number;
	ab_result_double: number;
	ab_result_triple: number;
	ab_result_homerun: number;
	ab_result_bb: number;
	ab_result_ibb: number;
	ab_result_k: number;
	ab_result_hbp: number;
	ab_result_error: number;
	ab_result_sac_hit: number;
	ab_result_sac_fly: number;
	ab_result_unclear: number;
	pitch_type_int: number;
	pbp_play_result: string;
	pbp_runs_outs_result: string;
	is_sp: number;
	is_rp: number;
	is_patched: number;
	is_invalid_ibb: number;
	is_out_of_sequence: number;
	is_out_of_boundary?: boolean;
	start_speed?: number;
	spin?: number;
	zone_location?: number;
	sz_top?: number;
	sz_bot?: number;
	pfx_x?: number;
	pfx_z?: number;
	px?: number;
	pz?: number;
	pxold?: number;
	pzold?: number;
}

export interface PfxMetrics {
	mlb_id: number;
	avg: number;
	obp: number;
	slg: number;
	ops: number;
	iso: number;
	fly_ball_rate: number;
	ground_ball_rate: number;
	line_drive_rate: number;
	pop_up_rate: number;
	bb_rate: number;
	k_rate: number;
	hr_per_fb: number;
	zone_rate: number;
	called_strike_rate: number;
	swinging_strike_rate: number;
	whiff_rate: number;
	csw_rate: number;
	o_swing_rate: number;
	z_swing_rate: number;
	swing_rate: number;
	o_contact_rate: number;
	z_contact_rate: number;
	contact_rate: number;
	total_pitches: number;
	total_pa: number;
	total_at_bats: number;
	total_outs: number;
	total_hits: number;
	total_bb: number;
	total_k: number;
	total_swings: number;
	total_swings_made_contact: number;
	total_called_strikes: number;
	total_swinging_strikes: number;
	total_inside_strike_zone: number;
	total_outside_strike_zone: number;
	total_swings_inside_zone: number;
	total_swings_outside_zone: number;
	total_contact_inside_zone: number;
	total_contact_outside_zone: number;
	total_batted_balls: number;
	total_ground_balls: number;
	total_line_drives: number;
	total_fly_balls: number;
	total_pop_ups: number;
	total_singles: number;
	total_doubles: number;
	total_triples: number;
	total_homeruns: number;
	total_ibb: number;
	total_hbp: number;
	total_errors: number;
	total_sac_hit: number;
	total_sac_fly: number;
}

export interface PfxPitchingMetrics extends PfxMetrics {
	pitch_type: PitchType;
	avg_speed: number;
	avg_pfx_x: number;
	avg_pfx_z: number;
	avg_px: number;
	avg_pz: number;
	percent: number;
}

export interface PfxPitchingMetricsCollection {
	pitch_types_filtered: PitchType[];
	pitch_types_all: PitchType[];
	total_pitches_filtered: number;
	total_pitches_all: number;
	total_pitches_excluded: number;
	pitch_type_metrics?: Record<PitchType, PfxPitchingMetrics>;
}

export interface PfxPitchTypePercentiles {
	pitch_type: PitchType;
	avg_speed: [number, number];
	ops: [number, number];
	whiff_rate: [number, number];
	zone_rate: [number, number];
	contact_rate: [number, number];
	o_swing_rate: [number, number];
}

export interface PfxPitchingMetricsWithPercentiles {
	metrics: PfxPitchingMetricsCollection;
	percentiles: PfxPitchTypePercentiles[];
}

export interface PfxPitchingMetricsWithPercentilesByYear {
	metrics: { [key: number]: PfxPitchingMetricsCollection };
	percentiles: { [key: number]: PfxPitchTypePercentiles[] };
}

export interface CareerPfxPitchingMetricsWithPercentiles {
	both: PfxPitchingMetricsWithPercentiles;
	rhb: PfxPitchingMetricsWithPercentiles;
	lhb: PfxPitchingMetricsWithPercentiles;
}

export interface CareerPfxPitchingMetricsWithPercentilesByYear {
	both: PfxPitchingMetricsWithPercentilesByYear;
	rhb: PfxPitchingMetricsWithPercentilesByYear;
	lhb: PfxPitchingMetricsWithPercentilesByYear;
}

export type PfxDataForPlayerSeason = Record<
	PitchType,
	{ percentiles: PfxPitchTypePercentiles; metrics: PfxPitchingMetrics }
>;
export type PfxDataForPlayerSeasonByYear = Record<number, PfxDataForPlayerSeason>;
export type AllCareerAndYearlyPfxData = Record<BatterStance, PfxDataForPlayerSeasonByYear>;

export interface StrikeZoneCorner {
	corner: string;
	left: number;
	top: number;
}

export interface StrikeZoneDimensions {
	top: string;
	left: string;
	width: string;
	height: string;
}
