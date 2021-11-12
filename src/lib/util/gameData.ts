import type { AtBatPitchDescription, PitchFx, Result, StrikeZoneCorner, StrikeZoneDimensions } from '$lib/api/types';
import { PITCH_TYPE_ABBREV_TO_NAME_MAP, PITCH_TYPE_MAP, PITCH_TYPE_NAME_TO_ABBREV_MAP } from '$lib/constants';
import { GAME_ID_REGEX, PITCH_SEQ_NUMS_REGEX } from '$lib/regex';
import type { TeamID } from '$lib/types';
import { getCSSPropNumber, getCSSPropNumberOfPixels } from '$lib/util/cssCustomProps';
import { getDummyObject } from '$lib/util/dummy';

export function getPitchTypeNameFromInt(pitchTypeInt: number): string {
	return PITCH_TYPE_ABBREV_TO_NAME_MAP[PITCH_TYPE_MAP[pitchTypeInt]];
}

export function getHomeTeamIdFromGameId(game_id: string): Result<TeamID> {
	const match = GAME_ID_REGEX.exec(game_id);
	if (!match)
		return {
			success: false,
			message: 'BBRef Game ID was not in the expected format!'
		};
	return {
		success: true,
		value: match.groups.home_team_id as TeamID
	};
}

export function getTeamColdColor(teamId: TeamID): string {
	return `var(--${teamId.toLowerCase()}-cold)`;
}

export function getTeamWarmColor(teamId: TeamID): string {
	return `var(--${teamId.toLowerCase()}-warm)`;
}

export function getTeamPrimaryColor(teamId: TeamID): string {
	return `var(--${teamId.toLowerCase()}-pri)`;
}

export function formatAtBatResult(atBatResult: string): string[] {
	const split = atBatResult.split(';');
	return split.length > 1 ? split : [atBatResult];
}

export function createPitchDescriptionList(pitchSequence: string[][], pfx: PitchFx[]): AtBatPitchDescription[] {
	const validPfx = pfx.filter((pfx) => pfx.basic_type !== 'Z');
	const pitchDescriptions = pitchSequence.map((p) => formatPitchDescription(p, validPfx));
	return pitchDescriptions.slice(0, -1);
}

function formatPitchDescription(pitch_des: string[], pfx: PitchFx[]): AtBatPitchDescription {
	const pitch: AtBatPitchDescription = {
		number: '',
		description: '',
		type: '',
		blocked_by_c: false,
		out_of_boundary: false,
		barreled: false,
		non_pitch_event: false
	};
	if (pitch_des.length === 3) {
		const match = PITCH_SEQ_NUMS_REGEX.exec(pitch_des[0]);
		pitch.number = match ? match.groups.num : '';
		pitch.description = pitch_des[1];
		pitch.type = pitch_des[2];
		pitch.non_pitch_event = pitch.number === '';

		if (pitch.description.includes('pitch was blocked by catcher')) {
			pitch.description = pitch.description.split('\n')[0];
			pitch.blocked_by_c = true;
		}

		if (pitch.number !== '') {
			const pitchNumber = parseInt(pitch.number);
			const matches = pfx.filter((pfx) => pfx.ab_count === pitchNumber);
			if (matches.length === 1) {
				pitch.out_of_boundary = matches[0].is_out_of_boundary;
				pitch.barreled = matches[0].is_barreled === 1;
			}
		}
	}
	return pitch;
}

export function getPitchTypeAbbrevFromName(pitchType: string): string {
	return PITCH_TYPE_NAME_TO_ABBREV_MAP?.[pitchType.toLowerCase()] ?? PITCH_TYPE_NAME_TO_ABBREV_MAP.unknown;
}

export function getXAxisMinMax(): [number, number] {
	const xMin = getCSSPropNumber(document.documentElement, '--ploc-x-min');
	const xMax = getCSSPropNumber(document.documentElement, '--ploc-x-max');
	return [xMin, xMax];
}

export function getYAxisMinMax(): [number, number] {
	const yMin = getCSSPropNumber(document.documentElement, '--ploc-y-min');
	const yMax = getCSSPropNumber(document.documentElement, '--ploc-y-max');
	return [yMin, yMax];
}

export function identifyPfxDataBeyondBoundary(pfx: PitchFx[]): PitchFx[] {
	const [xMin, xMax] = getXAxisMinMax();
	const [yMin, yMax] = getYAxisMinMax();
	pfx.map((pfx) => (pfx.is_out_of_boundary = pfx.px > xMax || pfx.px < xMin || pfx.pz > yMax || pfx.pz < yMin));
	return pfx;
}

export function addStrikeZoneCornersToPfxData(pfx: PitchFx[]): PitchFx[] {
	const zoneLeft = -0.70833;
	const zoneRight = 0.70833;
	const zoneTop = getZoneTop(pfx);
	const zoneBottom = getZoneBottom(pfx);

	const zoneTopLeft = getDummyObject('pitchFx') as PitchFx;
	zoneTopLeft.px = zoneLeft;
	zoneTopLeft.pz = zoneTop;
	zoneTopLeft.mlbam_pitch_name = 'TL';
	pfx.push(zoneTopLeft);

	const zoneTopRight = getDummyObject('pitchFx') as PitchFx;
	zoneTopRight.px = zoneRight;
	zoneTopRight.pz = zoneTop;
	zoneTopRight.mlbam_pitch_name = 'TR';
	pfx.push(zoneTopRight);

	const zoneBottomLeft = getDummyObject('pitchFx') as PitchFx;
	zoneBottomLeft.px = zoneLeft;
	zoneBottomLeft.pz = zoneBottom;
	zoneBottomLeft.mlbam_pitch_name = 'BL';
	pfx.push(zoneBottomLeft);

	return pfx;
}

function getZoneTop(pfx: PitchFx[]): number {
	const uniqueVals = [...new Set(pfx.map((pfx) => pfx.sz_top))];
	return uniqueVals.length == 1 ? uniqueVals[0] : uniqueVals.reduce((a, b) => a + b) / uniqueVals.length;
}

function getZoneBottom(pfx: PitchFx[]): number {
	const uniqueVals = [...new Set(pfx.map((pfx) => pfx.sz_bot))];
	return uniqueVals.length == 1 ? uniqueVals[0] : uniqueVals.reduce((a, b) => a + b) / uniqueVals.length;
}

export function drawStrikeZoneRect(document: Document, cssId: string): void {
	const strikeZone = document.querySelector<HTMLElement>('.strike-zone') || document.createElement('div');
	const dimensions = getStrikeZoneDimensions(document);
	if (dimensions) {
		strikeZone.className = 'strike-zone';
		strikeZone.style.top = dimensions.top;
		strikeZone.style.left = dimensions.left;
		strikeZone.style.width = dimensions.width;
		strikeZone.style.height = dimensions.height;
		document.querySelector(`#${cssId} .scatter-group`)?.appendChild(strikeZone);
	}
}

function getStrikeZoneDimensions(document: Document): StrikeZoneDimensions {
	const szCornerDivs = document.querySelectorAll<HTMLElement>('.strike-zone-corner');
	const szCorners = Array.from(szCornerDivs).map((pfx) => getZoneCorner(pfx));
	if (szCorners.length == 0) {
		return { top: `0`, left: `0`, width: `0`, height: `0` };
	}
	const topLeftCorner = szCorners.filter((zc) => zc.corner === 'TL')?.[0] || null;
	const topRightCorner = szCorners.filter((zc) => zc.corner === 'TR')?.[0] || null;
	const bottomLeftCorner = szCorners.filter((zc) => zc.corner === 'BL')?.[0] || null;
	if (topLeftCorner === null || topRightCorner === null || bottomLeftCorner === null) {
		return { top: `0`, left: `0`, width: `0`, height: `0` };
	}

	const chartSize = getCSSPropNumberOfPixels(document.documentElement, '--ploc-chart-size');
	const width = chartSize * ((topRightCorner.left - topLeftCorner.left) / 100);
	const height = chartSize * ((bottomLeftCorner.top - topLeftCorner.top) / 100);
	return { top: `${topLeftCorner.top}%`, left: `${topLeftCorner.left}%`, width: `${width}px`, height: `${height}px` };
}

function getZoneCorner(pfx: HTMLElement): StrikeZoneCorner {
	return {
		corner: pfx.dataset.pitchType,
		left: parseFloat(pfx.dataset.leftPosition),
		top: parseFloat(pfx.dataset.topPosition)
	};
}

export function getToolTipPositionForPfxData(x: number, y: number): 'top' | 'right' | 'bottom' | 'left' {
	let angle = getAngleOfPitchLocation(x, y);
	angle = angle >= 0 ? angle : angle + 360;
	if (angle >= 315 || 45 > angle) {
		return 'right';
	} else if (angle >= 45 && 135 > angle) {
		return 'top';
	} else if (angle >= 135 && 225 > angle) {
		return 'left';
	} else if (angle >= 225 && 315 > angle) {
		return 'bottom';
	}
}

export function getAngleOfPitchLocation(x: number, y: number): number {
	return getAngleOfLineBetweenTwoPoints(0, 1.5, x, y);
}

export function getAngleOfLineBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number): number {
	return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}
