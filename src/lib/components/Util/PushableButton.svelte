<script lang="ts">
	import type { ThemeColor } from '$lib/types';

	export let color: ThemeColor = 'primary';
</script>

<button class="pushable" on:click>
	<span class="shadow" />
	<span class="edge edge-{color}" />
	<span class="front front-{color} leading-none tracking-wider font-bold">
		<slot />
	</span>
</button>

<style lang="postcss">
	.pushable {
		position: relative;
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
		transition: filter 250ms;
	}
	.shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 0.75rem;
		background: hsl(0deg 0% 0% / 0.25);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	.edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 0.75rem;
	}
	.edge-primary {
		background: linear-gradient(
			to left,
			var(--pri-color) 0%,
			var(--pri-color) 8%,
			var(--pri-color) 92%,
			var(--pri-color) 100%
		);
	}
	.edge-secondary {
		background: linear-gradient(
			to left,
			var(--sec-color) 0%,
			var(--sec-color) 8%,
			var(--sec-color) 92%,
			var(--sec-color) 100%
		);
	}
	.front {
		display: block;
		position: relative;
		padding: 0.75rem 2.5rem;
		border-radius: 0.75rem;
		font-size: 1.3rem;
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 400ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}
	.front-primary {
		color: var(--color-on-pri);
		background: var(--pri-color);
	}
	.front-secondary {
		color: var(--color-on-sec);
		background: var(--sec-color);
	}
	.pushable:hover {
		filter: brightness(110%);
	}
	.pushable:hover .front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:active .front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}
	.pushable:hover .shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}
	.pushable:active .shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}
	.pushable:focus:not(:focus-visible) {
		outline: none;
	}
</style>
