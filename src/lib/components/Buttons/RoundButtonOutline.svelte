<script lang="ts">
	import type { ThemeColor } from '../../types';

	export let color: ThemeColor = 'indigo';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	$: buttonSize = size === 'sm' ? 36 : size === 'md' ? 48 : 72;
	$: iconSize = size === 'sm' ? 28 : size === 'md' ? 36 : 60;
	$: padding = size === 'sm' ? 8 : size === 'md' ? 12 : 12;

</script>

<button
	on:click
	class="btn btn-round btn-outline-{color}"
	style="width: {buttonSize}px; height: {buttonSize}px; padding: {padding}px; border-width: 2px"
>
	<div style="width: {iconSize}px; height: {iconSize}px; margin: auto">
		<slot />
	</div>
</button>
