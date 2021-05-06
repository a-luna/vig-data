<script lang="ts">
	import type { ThemeColor } from '../../types';

	export let color: ThemeColor = 'indigo';
</script>

<button on:click class="btn-round btn-outline-{color}">
	<slot />
</button>
