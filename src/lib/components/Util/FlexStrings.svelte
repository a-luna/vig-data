<script lang="ts">
	export let stringArray: string[] = [];
	export let runsScored: string = '';

	$: atBatResult = stringArray.length > 0 ? (runsScored != '' ? `, ${runsScored}` : '') : '';
</script>

{#if stringArray.length == 1}
	<div class="flex justify-center flex-col flex-nowrap">
		{#each stringArray as str}
			<span class="at-bat-result">{str}</span>
		{/each}
	</div>
{:else if stringArray.length > 1}
	<div class="flex flex-col flex-nowrap">
		<ul class="list-none m-0">
			<li class="at-bat-result flex flex-col flex-nowrap justify-center">
				<span>{stringArray[0]}</span>
				<span class="ml-1">{runsScored}</span>
			</li>
			<li class="ml-2 italic">{stringArray.slice(1).join(', ')}</li>
		</ul>
	</div>
{/if}
