import { scoreboardForDateMockData } from '$lib/api/mock/game/getScoreboardForDate';
import { careerPfxMockData } from '$lib/api/mock/pitchfx/getCareerPfxDataForPitcher';
import { careerBatStatsMockData } from '$lib/api/mock/player/getCareerBatStatsForPlayer';
import { careerPitchStatsMockData } from '$lib/api/mock/player/getCareerPitchStatsForPlayer';
import { allSeasonsMockData } from '$lib/api/mock/season/getAllValidSeasons';
import { barrelsForDateMockData } from '$lib/api/mock/season/getBarrelsForDate';
import { mostRecentScrapedDateMockData } from '$lib/api/mock/season/getMostRecentScrapedDate';
import { PlayerBatStatsForDateMockData } from '$lib/api/mock/season/getPlayerBatStatsForDate';
import { PlayerPitchStatsForDateMockData } from '$lib/api/mock/season/getPlayerPitchStatsForDate';
import { standingsOnDateMockData } from '$lib/api/mock/season/getStandingsOnDate';
import { allTeamsBatStatsMockData } from '$lib/api/mock/team/getBatStatsForAllTeams';
import { allTeamsPitchStatsMockData } from '$lib/api/mock/team/getPitchStatsForAllTeams';
import type {
	ApiResponse,
	CareerBatStats,
	CareerPfxMetricsForPitcher,
	CareerPitchStats,
	MlbSeason,
	PitchFx,
	PlayerBatStats,
	PlayerPitchStats,
	Scoreboard,
	SeasonData,
	TeamBatStatsMap,
	TeamPitchStatsMap
} from '$lib/api/types';
import { getSeasonDates } from '$lib/util';

export async function getScoreboardForDateMock(_date: string): Promise<ApiResponse<Scoreboard>> {
	const { season, games_for_date } = scoreboardForDateMockData;
	return {
		status: 200,
		success: true,
		value: { season: getSeasonDates(season).value, games_for_date }
	};
}
export async function getCareerPfxDataForPitcherMock(
	_mlb_id: number
): Promise<ApiResponse<CareerPfxMetricsForPitcher>> {
	return {
		status: 200,
		success: true,
		value: careerPfxMockData
	};
}

export async function getCareerBatStatsForPlayerMock(_mlb_id: number): Promise<ApiResponse<CareerBatStats>> {
	return {
		status: 200,
		success: true,
		value: careerBatStatsMockData
	};
}

export async function getCareerPitchStatsForPlayerMock(_mlb_id: number): Promise<ApiResponse<CareerPitchStats>> {
	return {
		status: 200,
		success: true,
		value: careerPitchStatsMockData
	};
}

export async function getAllValidSeasonsMock(): Promise<ApiResponse<MlbSeason[]>> {
	const allSeasons = allSeasonsMockData;
	return {
		status: 200,
		success: true,
		value: allSeasons.map((s) => getSeasonDates(s as MlbSeason).value)
	};
}

export async function getStandingsOnDateMock(_date: Date): Promise<ApiResponse<SeasonData>> {
	return {
		status: 200,
		success: true,
		value: standingsOnDateMockData
	};
}

export async function getMostRecentScrapedDateMock(): Promise<Date> {
	return mostRecentScrapedDateMockData;
}

export async function getPlayerPitchStatsForDateMock(_date: string): Promise<ApiResponse<PlayerPitchStats[]>> {
	return {
		status: 200,
		success: true,
		value: PlayerPitchStatsForDateMockData
	};
}

export async function getPlayerBatStatsForDateMock(_date: string): Promise<ApiResponse<PlayerBatStats[]>> {
	return {
		status: 200,
		success: true,
		value: PlayerBatStatsForDateMockData
	};
}

export async function getBarrelsForDateMock(_date: string): Promise<ApiResponse<PitchFx[]>> {
	return {
		status: 200,
		success: true,
		value: barrelsForDateMockData
	};
}

export async function getBatStatsForAllTeamsMock(_year: number): Promise<ApiResponse<TeamBatStatsMap>> {
	return {
		status: 200,
		success: true,
		value: allTeamsBatStatsMockData
	};
}

export async function getPitchStatsForAllTeamsMock(_year: number): Promise<ApiResponse<TeamPitchStatsMap>> {
	return {
		status: 200,
		success: true,
		value: allTeamsPitchStatsMockData
	};
}
