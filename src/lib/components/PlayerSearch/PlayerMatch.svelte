<script lang="ts">
	export let result: number;
	export let match: string;
</script>

<div>
	<a sveltekit:prefetch href="/player/{result}">{match}</a>
</div>

<style>
	div {
		margin: 0;
		padding: 3px;
		line-height: 1;
		background-color: hsl(0, 0%, 70%);
		border: 1px solid hsl(240, 4%, 14%);
	}
	a {
		font-size: 0.8rem;
	}
</style>
