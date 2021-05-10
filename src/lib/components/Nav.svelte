<nav>
	<a sveltekit:prefetch href="/">Home</a>
	<a sveltekit:prefetch href="/game/ANA201905010">ANA201905010</a>
	<a sveltekit:prefetch href="/game/KCA201905011">KCA201905011</a>
	<a sveltekit:prefetch href="/game/BOS201909170">BOS201909170</a>
	<a sveltekit:prefetch href="/game/ARI201909240">ARI201909240</a>
	<a sveltekit:prefetch href="/scoreboard?date=20190501">Scoreboard</a>
	<a sveltekit:prefetch href="/scoreboard?date=20190917">Scoreboard</a>
</nav>

<style lang="postcss">
	nav {
		display: flex;
	}
	nav a + a {
		margin-left: 1rem;
	}
</style>
