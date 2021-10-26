<script lang="ts">
	import type { PlayerDetails } from '$lib/api/types';
	import { DEF_POS_ABBREV_TO_NUM_MAP } from '$lib/constants';
	import type { DefPositionNumber, PlayerCardLink } from '$lib/types';
	let role: 'pitching' | 'batting' | 'both';
	let defPosList: DefPositionNumber[];
	let pitchingRole: string = '';

	export let details: PlayerDetails;
	export let links: PlayerCardLink[];
	$: currentTeam = details.all_teams.slice(-1)?.[0];
	$: if (currentTeam) {
		defPosList = currentTeam.def_pos_list
			.map((def) => def.def_pos)
			.filter((def) => def != 'BN')
			.map((def) => DEF_POS_ABBREV_TO_NUM_MAP[def])
			.sort((a, b) => a - b);
		pitchingRole =
			currentTeam.percent_sp === 100
				? 'SP'
				: currentTeam.percent_rp === 100
				? 'RP'
				: currentTeam.percent_sp > 0 && currentTeam.percent_rp > 0
				? 'SP/RP'
				: '';
		role = currentTeam.role === 'pitching' && defPosList.some((defPos) => defPos !== 1) ? 'both' : currentTeam.role;
	}
	$: pos = role === 'pitching' ? pitchingRole : getDefPosForPlayer(defPosList);
	$: playerName = `${details.name_first} ${details.name_last}`;
	$: teamInfo = `${currentTeam.team_id} (${currentTeam.year})`;
	$: playerLinks = role === 'both' ? links : role === 'pitching' ? [links[0]] : [links[1]];

	const getDefPosForPlayer = (defPosList: DefPositionNumber[]): string => {
		if (defPosList.length === 0) {
			return 'BN';
		}
		const hasC = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['C']);
		const has1B = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['1B']);
		const has2B = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['2B']);
		const has3B = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['3B']);
		const hasSS = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['SS']);
		const hasLF = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['LF']);
		const hasCF = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['CF']);
		const hasRF = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['RF']);
		const hasDH = defPosList.includes(DEF_POS_ABBREV_TO_NUM_MAP['DH']);

		let defPos: string[] = [];
		if (hasC) {
			defPos.push('C');
		}

		if (has1B && has3B) {
			defPos.push('CI');
		} else if (has1B) {
			defPos.push('1B');
		} else if (has3B) {
			defPos.push('3B');
		}

		if (has2B && hasSS) {
			defPos.push('MI');
		} else if (has2B) {
			defPos.push('2B');
		} else if (hasSS) {
			defPos.push('SS');
		}

		const outfieldPosCount = [hasLF, hasCF, hasRF].filter((hasOF) => hasOF === true).length;
		if (outfieldPosCount > 1) {
			defPos.push('OF');
		} else if (hasLF) {
			defPos.push('LF');
		} else if (hasCF) {
			defPos.push('CF');
		} else if (hasRF) {
			defPos.push('RF');
		}

		if (hasDH) {
			defPos.push('DH');
		}

		return defPos.join('/');
	};
</script>

<div
	class="m-2 transition-transform duration-200 transform rounded card hover:shadow-md hover:border-opacity-0 hover:-translate-y-1"
>
	<div class="flex flex-col justify-between m-2 leading-none flex-nowrap h-5/6">
		<div class="flex flex-row items-center justify-between flex-grow-0 mb-1 player-card-heading flex-nowrap">
			<span class="text-lg whitespace-nowrap">{playerName}</span>
			<span class="def-pos">{pos}</span>
		</div>
		<div class="flex flex-row mb-1">
			<strong class="mr-1 text-sm">Most Recent Team:</strong><span class="text-sm">{teamInfo}</span>
		</div>
		<ul class="grid flex-grow grid-cols-2 gap-3 text-sm">
			{#each playerLinks as { text, url }}
				<a sveltekit:prefetch href={url}>{text}</a>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	.card {
		background-color: var(--player-card-bg-color);
		border: 2px dotted var(--player-card-border-color);
	}

	.player-card-heading {
		color: var(--player-card-heading-text-color);
	}

	.def-pos {
		font-size: 0.9rem;
	}

	span {
		color: var(--player-card-text-color);
	}

	span:hover {
		color: var(--player-card-text-color-hov);
	}
</style>
