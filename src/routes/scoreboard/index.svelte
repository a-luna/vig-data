<script lang="ts">
	import Scoreboard from '$lib/components/Scoreboard/Scoreboard.svelte';

	let game_date: Date;

	function formatDateString(date: Date): string {
		if (date) {
			return date.toDateString().slice(3);
		}
	}

	$: date_str = formatDateString(game_date);
</script>

<svelte:head>
	<title>MLB Scoreboard for {date_str} | Vigorish</title>
</svelte:head>

<Scoreboard bind:game_date />
