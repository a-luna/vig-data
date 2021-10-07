<script lang="ts">
	import type { PlayerDetails } from '$lib/api/types';
	import { DEF_POS_ABBREV_TO_NUM_MAP } from '$lib/constants';
	import type { PlayerCardLink } from '$lib/types';
	let role: 'pitching' | 'batting';
	let defPos: string = '';
	let pitchingRole: string = '';

	export let details: PlayerDetails;
	export let links: PlayerCardLink[];
	$: currentTeam = details.all_teams.slice(-1)?.[0];
	$: if (currentTeam) role = currentTeam.role;
	$: if (currentTeam)
		defPos = currentTeam.def_pos_list
			.map((def) => def.def_pos)
			.filter((def) => def != 'BN')
			.sort((a, b) => DEF_POS_ABBREV_TO_NUM_MAP[a] - DEF_POS_ABBREV_TO_NUM_MAP[b])
			.join('/');
	$: if (currentTeam)
		pitchingRole =
			currentTeam.percent_sp === 100
				? 'SP'
				: currentTeam.percent_rp === 100
				? 'RP'
				: currentTeam.percent_sp > 0 && currentTeam.percent_rp > 0
				? 'SP/RP'
				: '';
	$: pos = role === 'pitching' ? pitchingRole : defPos ? defPos : 'BN';
	$: playerName = `${details.name_first} ${details.name_last}`;
	$: teamInfo = `${currentTeam.team_id} (${currentTeam.year})`;
	$: playerLinks = role === 'pitching' ? [links[0]] : [links[1]];
</script>

<div
	class="m-2 transition-transform duration-200 transform rounded card hover:shadow-md hover:border-opacity-0 hover:-translate-y-1"
>
	<div class="flex flex-col justify-between m-2 leading-none flex-nowrap h-5/6">
		<div class="player-card-heading flex flex-row items-center justify-between flex-grow-0 mb-1 flex-nowrap">
			<span class="text-lg">{playerName}</span>
			<span class="text-base">{pos}</span>
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
		border: 1px dotted var(--player-card-border-color);
	}

	.player-card-heading {
		color: var(--player-card-heading-text-color);
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
