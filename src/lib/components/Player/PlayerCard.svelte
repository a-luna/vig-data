<script lang="ts">
	import type { PlayerCardLink } from '$lib/types';

	export let name: string;
	export let description: string = null;
	export let links: PlayerCardLink[];
</script>

<div
	class="m-2 transition-transform duration-200 transform rounded card hover:shadow-md hover:border-opacity-0 hover:-translate-y-1"
>
	<div class="m-3">
		<h2 class="mb-2 text-lg">{name}</h2>
		{#if description}
			<p class="font-mono text-sm font-light">{description}</p>
		{/if}
		<ul class="font-mono text-sm font-light list-none">
			{#each links as { text, url }}
				<li><a sveltekit:prefetch href={url}>{text}</a></li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	.card {
		background-color: var(--player-card-bg-color);
		border: 1px solid var(--player-card-border-color);
	}

	h2 {
		color: var(--player-card-heading-text-color);
	}

	li,
	p {
		color: var(--player-card-text-color);
	}

	li:hover,
	p:hover {
		color: var(--player-card-text-color-hov);
	}
</style>
