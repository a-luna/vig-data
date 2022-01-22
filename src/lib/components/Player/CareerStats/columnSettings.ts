import type { TeamBatStats, TeamPitchStats } from '$lib/api/types';
import { isTeamID } from '$lib/util/typeguards';

export function formatYear(stats: TeamBatStats | TeamPitchStats): string {
	if (stats.career_stats_all_teams) {
		return `${stats.total_seasons} seasons`;
	}
	if (stats.career_stats_for_team) {
		return `${stats.player_team_id_bbref} (${stats.total_seasons} yrs)`;
	}
	if (stats.changed_teams_midseason && stats.all_stats_for_season) {
		return `<div class="flex flex-row justify-end flex-nowrap gap-x-1.5 leading-none">
    <div
      class="show-separate-season-stats-button asc"
      title="Click to toggle display of separate team stats in same season"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512">
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" />
      </svg>
    </div>
    <span>${stats.year}</span>
  </div>`;
	}
	return stats.year.toString();
}

export const formatAge = (stats: TeamBatStats | TeamPitchStats): string =>
	stats.career_stats_all_teams || stats.career_stats_for_team ? '' : stats.age.toString();

export const formatTeamId = (stats: TeamBatStats | TeamPitchStats): string =>
	stats.career_stats_all_teams || stats.career_stats_for_team
		? ''
		: isTeamID(stats.player_team_id_bbref)
		? `<a sveltekit:prefetch href="/team/${stats.player_team_id_bbref}/${stats.year}">${stats.player_team_id_bbref}</a>`
		: stats.player_team_id_bbref;
