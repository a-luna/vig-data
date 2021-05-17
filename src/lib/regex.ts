export const GAME_DATE_REGEX = /(?<year>\d{4,4})(?<month>\d{2,2})(?<day>\d{2,2})/;
export const SEASON_DATE_REGEX = /(?<year>\d{4,4})-(?<month>\d{2,2})-(?<day>\d{2,2})/;
export const GAME_ID_REGEX = /(?<home_team_id>[A-Z]{3,3})(?<year>\d{4,4})(?<month>\d{2,2})(?<day>\d{2,2})(?<game_number_this_day>\d)/;
export const AT_BAT_ID_REGEX = /(?<game_id>[A-Z]{3,3}\d{4,4}\d{2,2}\d{2,2}\d)_(?<inning>\d\d)_(?<pitcher_team_id>[A-Z]{3,3})_(?<pitcher_mlb_id>\d{6,6})_(?<batter_team_id>[A-Z]{3,3})_(?<batter_mlb_id>\d{6,6})_(?<at_bat_num_this_inning>\d)/;
export const INNING_ID_REGEX = /(?<game_id>[A-Z]{3,3}\d{4,4}\d{2,2}\d{2,2}\d)_INN_(?<inning_half>TOP|BOT)(?<inning_number>[0-9]{2,2})/;
export const PITCH_SEQ_NUMS_REGEX = /Pitch\s{1,2}(?<num>\d{1,2})\/(?<total>\d{1,2})/;
export const PITCH_SPEED_TYPE_REGEX = /(?<pitch_speed>\d{2,3}mph) (?<pitch_type>[\w\s-()]+)/;

export const HSL_COLOR_REGEX = /hsl\((?<hue>\d{1,3}), (?<saturation>\d{1,3})%, (?<lightness>\d{1,3})%\)/;
export const NUMBER_OF_PIXELS_REGEX = /(?<pixels>\d+)px/;
