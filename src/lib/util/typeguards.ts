import { TeamID, TEAM_IDS } from '$lib/types';

export function isTeamID(teamId: string): teamId is TeamID {
	return TEAM_IDS.includes(teamId as TeamID);
}
