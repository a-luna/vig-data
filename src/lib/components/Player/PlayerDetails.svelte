<script lang="ts">
	import { getTimeDeltaAsString } from '$lib/util/datetime';

	export let name_last: string;
	export let name_given: string;
	export let bats: string;
	export let throws: string;
	export let weight: number;
	export let height: number;
	export let debut: string;
	export let birth_year: number;
	export let birth_month: number;
	export let birth_day: number;
	export let birth_country: string = '';
	export let birth_state: string = '';
	export let birth_city: string = '';
	export let fontSize: string;

	$: debutDate = new Date(debut);
	$: birthDate = new Date(birth_year, birth_month - 1, birth_day);
	$: ageAtDebut = getTimeDeltaAsString(birthDate, debutDate);
	$: playerAge = getTimeDeltaAsString(birthDate);
	$: height_feet = Math.floor(height / 12);
	$: height_inches = height % 12;
	$: birthLocation =
		!birth_state || birth_state === birth_city
			? `${birth_city}, ${birth_country}`
			: `${birth_city}, ${birth_state}, ${birth_country}`;
</script>

<div
	class="grid grid-cols-1 gap-0.5 w-full leading-snug whitespace-nowrap overflow-ellipsis"
	style="font-size: {fontSize}"
>
	<div class="flex">
		<strong class="mr-2">Full Name</strong>
		<span>{name_given} {name_last}</span>
	</div>
	<div class="flex">
		<strong class="mr-2">Bats</strong>
		<span class="mr-2">{bats}</span>
		<strong class="mr-2">Throws</strong>
		<span class="mr-2">{throws}</span>
	</div>
	<div class="flex">
		<strong class="mr-2">Height</strong>
		<span class="mr-2">{height_feet}' {height_inches}''</span>
		<strong class="mr-2">Weight</strong>
		<span>{weight} llb</span>
	</div>
	<div class="flex">
		<strong class="mr-2">Birthplace</strong>
		<span class="mr-1">{birthLocation}</span>
	</div>
	<div class="flex">
		<strong class="mr-2">Birthdate</strong>
		<span class="mr-1">{birthDate.toLocaleDateString()}</span>
	</div>
	<div class="flex">
		<strong class="mr-2">Age</strong><span class="mr-2">{playerAge}</span>
	</div>
	<div class="flex">
		<strong class="mr-2">Age at Debut</strong>
		<span class="mr-2">{ageAtDebut}</span>
	</div>
</div>

<style lang="postcss">
	div > span {
		font-weight: 400;
		color: var(--player-details-text-color);
	}
</style>
