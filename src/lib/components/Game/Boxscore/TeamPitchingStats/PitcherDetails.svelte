<script lang="ts">
	import type { PitchStats } from '$lib/api/types';

	export let pitchStats: PitchStats;
</script>

<div class="flex flex-row items-center justify-start player-details flex-nowrap">
	<span class="pitch-app-type">{pitchStats.pitch_app_type}</span>
	<a class="player-name" sveltekit:prefetch href="/player/{pitchStats.mlb_id}/pitching">
		{pitchStats.name}
	</a>
</div>

<style lang="postcss">
	.player-details > * {
		line-height: 1;
	}

	.pitch-app-type {
		font-size: 0.7rem;
		width: 18px;
	}
</style>
