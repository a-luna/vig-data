<script lang="ts">
	import type { Umpire } from '$lib/api/types';

	export let park_name: string;
	export let field_type: string;
	export let day_night: string;
	export let game_start_time: string;
	export let game_duration: string;
	export let attendance: number;
	export let umpires: Umpire[];
	export let first_pitch_temperature: number;
	export let first_pitch_precipitation: string;
	export let first_pitch_wind: string;
	export let first_pitch_clouds: string;
</script>

<div class="flex flex-row flex-wrap justify-start items-start text-sm whitespace-nowrap my-3">
	<div class="flex flex-col flex-nowrap flex-grow-0 m-3">
		<span><strong>Start Time: </strong>{game_start_time}</span>
		<span><strong>Vanue: </strong>{park_name} ({day_night}, {field_type})</span>
		<span><strong>Attendance: </strong>{attendance.toLocaleString(undefined)}</span>
		<span><strong>Duration: </strong>{game_duration}</span>
		<span><strong>Temperature: </strong>{first_pitch_temperature}°, {first_pitch_wind}</span>
		<span><strong>Weather: </strong>{first_pitch_clouds}, {first_pitch_precipitation}</span>
	</div>
	<div class="flex flex-col flex-nowrap flex-grow m-3">
		<div class="flex flex-row flex-nowrap justify-start">
			<span class="mr-1"><strong>Umpires: </strong></span>
			<div class="flex flex-col flex-nowrap justify-start ml-2">
				{#each umpires as { field_location, umpire_name }}
					{#if umpire_name !== '(none)'}
						<span><strong>{field_location} </strong>{umpire_name}</span>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
