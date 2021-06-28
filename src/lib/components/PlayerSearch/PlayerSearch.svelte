<script lang="ts">
	import { goto } from '$app/navigation';
	import { playerNameSearch } from '$lib/api/player';
	import SearchForm from '$lib/components/PlayerSearch/SearchForm.svelte';
	import { searchResults } from '$lib/stores/searchResults';
	import ErrorMessageModal from '../Modals/ErrorMessageModal.svelte';
	import LoadingScreen from '../Util/LoadingScreen.svelte';

	let searching: boolean = false;
	let errorModal: ErrorMessageModal;
	let loadingComponent: LoadingScreen;

	async function performSearch(query) {
		searching = true;
		loadingComponent.toggleLoading();
		const result = await playerNameSearch(query);
		loadingComponent.toggleLoading();
		searching = false;
		if (!result.success) {
			errorModal.toggleModal(result.message);
		} else {
			searchResults.changeSearchResults(result.value);
			goto(`/search?q=${query}`);
		}
	}
</script>

<ErrorMessageModal bind:this={errorModal} />
<LoadingScreen bind:this={loadingComponent} />
<SearchForm bind:disabled={searching} on:searchRequest={(e) => performSearch(e.detail)} />
