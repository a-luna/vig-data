<script lang="ts">
	import { columns } from './stores/columns';
	import { options } from './stores/options';
	import type { RowData } from './types';

	function colFilterChanged(event: Event, key: (x: RowData) => string) {
		const eventTarget = event.target as HTMLInputElement;
		columns.filter(key, eventTarget.value);
	}

</script>

<tr>
	{#each $columns as column}
		{#if column.key}
			<th class="filter" class:css={$options.css}>
				<input
					type="text"
					placeholder={$options.labels.filter}
					class="browser-default"
					on:input={(e) => colFilterChanged(e, column.key)}
				/>
			</th>
		{:else}
			<th class="filter" />
		{/if}
	{/each}
</tr>

<style>
	.css {
		padding: 0;
		margin: 0;
		background-image: none;
		border: 1px solid #fafafa;
	}
	th.filter input {
		margin: 0;
		padding: 0;
		width: 100%;
	}
	.css input {
		background: #fff;
		height: 24px;
		border: none;
		border-bottom: 1px solid #eee;
		text-align: center;
		outline: none;
		border-radius: 0;
		font-size: 14px;
	}
	.css input::placeholder {
		color: #bdbdbd;
		font-style: italic;
		font-size: 13px;
	}

</style>
