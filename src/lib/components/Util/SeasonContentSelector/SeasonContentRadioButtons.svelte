<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { seasonSettings } from '$lib/stores/seasonSettings';

	export let color: ThemeColor = 'secondary';

	$: scoreboardSelected = $seasonSettings.show === 'scoreboard';
	$: standingsSelected = $seasonSettings.show === 'standings';
	$: teamBatSelected = $seasonSettings.show === 'team-bat';
	$: teamPitchSelected = $seasonSettings.show === 'team-pitch';

</script>

<div class="btn-group text-base ml-4">
	<button
		type="button"
		class={scoreboardSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeContent('scoreboard')}>Scoreboard</button
	>
	<button
		type="button"
		class={standingsSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeContent('standings')}>Standings</button
	>
	<button
		type="button"
		class={teamBatSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeContent('team-bat')}>Team Batting Stats</button
	>
	<button
		type="button"
		class={teamPitchSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => seasonSettings.changeContent('team-pitch')}>Team Pitching Stats</button
	>
</div>
