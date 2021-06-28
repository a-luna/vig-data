<script lang="ts">
	import { columns } from './stores/columns';
	import { globalFilter } from './stores/filters';
	import { options } from './stores/options';
	import { pageNumber } from './stores/state';

	export let ref = '';
	export let classList = '';
	const search = (event: Event) => {
		const eventTarget = event.target as HTMLInputElement;
		pageNumber.set(1);
		globalFilter.set(eventTarget.value);
		columns.redraw();
	};

</script>

<input
	class={classList}
	class:css={$options.css}
	type="text"
	placeholder={$options.labels.search}
	on:input={search}
	{ref}
/>

<style>
	input.css {
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		outline: none;
		padding: 0 8px;
		line-height: 24px;
		margin: 0;
		height: 24px;
		background: transparent;
		width: 176px;
		transition: all, 0.1s;
	}
	input.css:focus {
		border: 2px solid #e0e0e0;
	}
	input.css::placeholder {
		color: #9e9e9e;
		line-height: 24px;
	}

</style>
