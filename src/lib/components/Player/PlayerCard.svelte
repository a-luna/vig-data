<script lang="ts">
	import type { PlayerDetails } from '$lib/api/types';
	import { DEF_POS_ABBREV_TO_NUM_MAP, DEF_POS_NUM_TO_ABBREV_MAP } from '$lib/constants';
	import type { DefPositionNumber, PlayerCardLink } from '$lib/types';
	let role: 'pitching' | 'batting' | 'both';
	let defPosList: DefPositionNumber[];
	let defPos: string = '';
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
		defPos = defPosList.map((def) => DEF_POS_NUM_TO_ABBREV_MAP[def]).join('/');
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
	$: pos = role === 'pitching' ? pitchingRole : defPos ? defPos : 'BN';
	$: playerName = `${details.name_first} ${details.name_last}`;
	$: teamInfo = `${currentTeam.team_id} (${currentTeam.year})`;
	$: playerLinks = role === 'both' ? links : role === 'pitching' ? [links[0]] : [links[1]];
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
		<ul class="flex-grow font-mono text-sm font-light list-none items-bottom">
			{#each playerLinks as { text, url }}
				<li><a sveltekit:prefetch href={url}>{text}</a></li>
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

	li,
	span {
		color: var(--player-card-text-color);
	}

	li:hover,
	span:hover {
		color: var(--player-card-text-color-hov);
	}
</style>
