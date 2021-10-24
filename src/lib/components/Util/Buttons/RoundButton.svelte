<script lang="ts">
	import type { ButtonColor } from '$lib/types';

	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: ButtonColor = 'blue';
	export let selected: boolean = false;
	const bgColorCssPropName = `--bg-color-${color}`;
	const fgColorCssPropName = `--fg-color-on-${color}`;
	const disabledBgColorCssPropName = '--button-disabled-bg-color';
	const disabledFgColorCssPropName = '--button-disabled-text-color';

	$: buttonFgColor = selected ? fgColorCssPropName : disabledFgColorCssPropName;
	$: buttonBgColor = selected ? bgColorCssPropName : disabledBgColorCssPropName;
	$: buttonSize = size === 'sm' ? 36 : size === 'md' ? 48 : 72;
	$: iconSize = size === 'sm' ? 16 : size === 'md' ? 24 : 36;
	$: padding = size === 'sm' ? 10 : size === 'md' ? 12 : 18;
	$: padAdjust = size === 'sm' ? 0 : size === 'md' ? 2 : 0;
</script>

<button
	on:click={() => (selected = !selected)}
	class="btn btn-round btn-{color}"
	style="color: var({buttonFgColor}); background: var({buttonBgColor}); width: {buttonSize}px; height: {buttonSize}px; padding: {padding +
		padAdjust}px {padding}px {padding - padAdjust}px"
>
	<div class="font-bold leading-none tracking-wider" style="width: {iconSize}px; height: {iconSize}px; margin: auto">
		<slot />
	</div>
</button>
