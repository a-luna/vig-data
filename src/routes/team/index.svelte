<script lang="ts">
	import TeamBattingStats from '$lib/components/TeamStats/TeamBattingStats/TeamBattingStats.svelte';
	import TeamPitchingStats from '$lib/components/TeamStats/TeamPitchingStats/TeamPitchingStats.svelte';
</script>

<svelte:head>
	<title>Sortable Team Stats | Vigorish</title>
</svelte:head>

<div class="section p-4 mb-5">
	<TeamBattingStats />
</div>
<div class="section p-4">
	<TeamPitchingStats />
</div>
