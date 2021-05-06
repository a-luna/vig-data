<script lang="ts">
	export let stringArray: string[];
</script>

<div class="flex justify-center items-start flex-col flex-nowrap">
	{#each stringArray as str}
		<span>{str}</span>
	{/each}
</div>
