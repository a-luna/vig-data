<script lang="ts">
	import { seasonContentShown } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'secondary';

	$: standingsSelected = $seasonContentShown === 'standings';
	$: teamBatSelected = $seasonContentShown === 'team-bat';
	$: teamPitchSelected = $seasonContentShown === 'team-pitch';
</script>

<div class="btn-group text-base ml-4">
	<button
		type="button"
		class={standingsSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($seasonContentShown = 'standings')}>Standings</button
	>
	<button
		type="button"
		class={teamBatSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($seasonContentShown = 'team-bat')}>Team Batting Stats</button
	>
	<button
		type="button"
		class={teamPitchSelected ? `btn btn-${color}` : `btn btn-outline-${color}`}
		on:click={() => ($seasonContentShown = 'team-pitch')}>Team Pitching Stats</button
	>
</div>
