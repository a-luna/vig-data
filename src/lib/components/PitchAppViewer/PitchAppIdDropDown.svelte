<script lang="ts">
	import type { Boxscore, PitchStats } from '$lib/api/types';
	import Select from '$lib/components/Util/Select/Select.svelte';
	import type { SelectMenuOption } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let width = 'auto';
	export let boxscore: Boxscore;
	let options: SelectMenuOption[];
	let selectedOption: SelectMenuOption;
	const menuId = 'pitch-app-id';
	const dispatch = createEventDispatcher();

	$: if (boxscore) options = createMenuOptions();
	$: menuLabel = selectedOption?.text || 'Select Pitcher';

	function createMenuOptions(): SelectMenuOption[] {
		const away_team_id = boxscore.away_team.team_id;
		const away_team_options = boxscore.away_team.pitching.map((p, i) => createMenuOption(away_team_id, p, i));
		const home_team_id = boxscore.home_team.team_id;
		const home_team_options = boxscore.home_team.pitching.map((p, i) =>
			createMenuOption(home_team_id, p, i + away_team_options.length),
		);
		return away_team_options.concat(home_team_options);
	}

	function createMenuOption(teamId: string, pitchStats: PitchStats, index: number): SelectMenuOption {
		return {
			text: `${pitchStats.name} ${teamId} (${pitchStats.pitch_app_type})`,
			value: pitchStats.pitch_app_id,
			optionNumber: index + 1,
			active: false,
		};
	}

	function handlePitchAppSelected(pitchAppId: string) {
		const match = options.filter((op) => op.value === pitchAppId);
		if (match.length > 0) {
			selectedOption = match[0];
		}
		dispatch('pitchAppSelected', pitchAppId);
	}
</script>

<Select {menuLabel} {options} {menuId} {width} on:changed={(e) => handlePitchAppSelected(e.detail)} />
