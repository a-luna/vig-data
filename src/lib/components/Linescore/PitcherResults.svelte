<script lang="ts">
	import type { PlayerId } from '$lib/api/types';

	export let wp: PlayerId;
	export let lp: PlayerId;
	export let sv: PlayerId = null;

	function formatName(name: string): string {
		if (name === '') return '';
		const [fname, lname] = name.split(' ', 2);
		return `${fname.slice(0, 1)} ${lname}`;
	}

	const wp_name = formatName(wp.name);
	const lp_name = formatName(lp.name);
	const sv_name = sv ? formatName(sv.name) : '';

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
