<script lang="ts">
	import Icon, { ArrowUp, ArrowDown } from 'svelte-hero-icons';

	export let inning: string;
</script>

<div class="flex flex-row flex-nowrap justify-start items-center">
	{#if inning.startsWith('t')}
		<Icon src={ArrowUp} solid size="12px" />
	{:else}
		<Icon src={ArrowDown} solid size="12px" />
	{/if}
	<span>{inning.slice(1)}</span>
</div>
