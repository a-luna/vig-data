<script lang="ts">
	import { siteTheme } from '$lib/stores/singleValueStores';
	import type { ThemeColor } from '$lib/types';
	import { getCSSPropNumber } from '$lib/util';

	export let color: ThemeColor = 'primary';
	const hueCustomProperty = color === 'primary' ? '--pri-color-hue' : '--sec-color-hue';
	let hue: number;
	let edgeGradient: string;

	$: if ($siteTheme) hue = getCSSPropNumber(document.body, hueCustomProperty);
	$: if (hue)
		edgeGradient = `linear-gradient(to left, hsl(${hue}deg 100% 16%) 0%, hsl(${hue}deg 100% 32%) 8%, hsl(${hue}deg 100% 32%) 92%, hsl(${hue}deg 100% 16%) 100%)`;

	$: console.log(`hue: ${hue}`);
	$: console.log(`edgeGradient: ${edgeGradient}`);
</script>

<button class="pushable" on:click>
	<span class="shadow" />
	<span class="edge edge-{color}" style="background: {edgeGradient}" />
	<span class="front front-{color} leading-none tracking-wider font-medium">
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
		filter: blur(4px);
		-webkit-tap-highlight-color: transparent;
	}
	.edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 0.75rem;
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
