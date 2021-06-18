<script lang="ts">
	export let stringArray: string[] = [];
	export let runsScored: string = '';

</script>

{#if stringArray.length == 1}
	<div class="flex flex-col justify-center flex-nowrap">
		{#each stringArray as str}
			<span class="leading-normal whitespace-normal at-bat-result">{str}</span>
		{/each}
	</div>
{:else if stringArray.length > 1}
	<div class="flex flex-col flex-nowrap">
		<ul class="m-0 list-none">
			<li class="flex flex-col justify-center whitespace-normal at-bat-result flex-nowrap">
				<span>{stringArray[0]}</span>
				<span class="ml-1">{runsScored}</span>
			</li>
			<li class="ml-2 italic whitespace-normal">{stringArray.slice(1).join(', ')}</li>
		</ul>
	</div>
{/if}
