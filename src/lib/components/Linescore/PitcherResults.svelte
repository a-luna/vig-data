<script lang="ts">
	import type { PlayerId } from '$lib/api/types';
	import { shortenPlayerName } from '$lib/util';

	export let wp: PlayerId;
	export let lp: PlayerId;
	export let sv: PlayerId = null;

	const wp_name = shortenPlayerName(wp.name);
	const lp_name = shortenPlayerName(lp.name);
	const sv_name = sv ? shortenPlayerName(sv.name) : '';
</script>

<div class="pitcher-results">
	<span class="wp">
		<span class="stat">WP</span>
		<a sveltekit:prefetch href={`/player/${wp.mlb_id}/pitching`}>{wp_name}</a>
		<span class="team-id">({wp.team_id})</span>
	</span>
	<span class="lp">
		<span class="stat">LP</span>
		<a sveltekit:prefetch href={`/player/${lp.mlb_id}/pitching`}>{lp_name}</a>
		<span class="team-id">({lp.team_id})</span>
	</span>
	{#if sv}
		<span class="sv">
			<span class="stat">SV</span>
			<a sveltekit:prefetch href={`/player/${sv.mlb_id}/pitching`}>{sv_name}</a>
			<span class="team-id">({wp.team_id})</span>
		</span>
	{/if}
</div>

<style lang="postcss">
	.pitcher-results {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		margin: 5px 0 0 0;
	}

	.wp,
	.lp,
	.sv {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		margin: 0 0 3px;
	}

	.stat {
		width: 26px;
		margin: 0 2px 0 0;
	}

	a {
		margin: 0 5px 0 0;
	}
</style>
