<script lang="ts">
	import type { ThemeColor } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
	import MdFirstPage from 'svelte-icons/md/MdFirstPage.svelte';
	import MdLastPage from 'svelte-icons/md/MdLastPage.svelte';

	export let goToPrevAtBatDisabled: boolean = false;
	export let goToNextAtBatDisabled: boolean = false;
	export let color: ThemeColor = 'secondary';
	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-row flex-nowrap justify-center">
	<div class="btn-group">
		<button
			id="first-at-bat"
			type="button"
			title="Go To First At Bat"
			disabled={goToPrevAtBatDisabled}
			class="btn btn-{color} flex-grow-0"
			on:click={() => dispatch('goToFirstAtBat')}
		>
			<div class="icon">
				<MdFirstPage />
			</div>
		</button>
		<button
			id="prev-at-bat"
			type="button"
			title="Go To Prev At Bat"
			disabled={goToPrevAtBatDisabled}
			class="btn btn-{color} flex-grow-0"
			on:click={() => dispatch('goToPrevAtBat')}
		>
			<div class="icon">
				<MdChevronLeft />
			</div>
		</button>
	</div>
	<div class="btn-group">
		<button
			id="next-at-bat"
			type="button"
			title="Go To Next At Bat"
			disabled={goToNextAtBatDisabled}
			class="btn btn-{color} flex-grow-0"
			on:click={() => dispatch('goToNextAtBat')}
		>
			<div class="icon">
				<MdChevronRight />
			</div>
		</button>
		<button
			id="last-at-bat"
			type="button"
			title="Go To Last At Bat"
			disabled={goToNextAtBatDisabled}
			class="btn btn-{color} flex-grow-0"
			on:click={() => dispatch('goToLastAtBat')}
		>
			<div class="icon">
				<MdLastPage />
			</div>
		</button>
	</div>
</div>

<style lang="postcss">
	#prev-at-bat {
		margin: 0 5px 0 0;
		padding: 4px 12px 4px 4px;
	}

	#next-at-bat {
		margin: 0 0 0 5px;
		padding: 4px 4px 4px 12px;
	}

	.icon {
		width: 25px;
		height: 25px;
	}
</style>
