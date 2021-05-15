<nav>
	<a sveltekit:prefetch href="/">Home</a>
	<a sveltekit:prefetch href="/game?id=ANA201905010&show=box">ANA201905010</a>
	<a sveltekit:prefetch href="/game?id=KCA201905011&show=box">KCA201905011</a>
	<a sveltekit:prefetch href="/game?id=BOS201909170&show=box">BOS201909170</a>
	<a sveltekit:prefetch href="/game?id=ARI201909240&show=box">ARI201909240</a>
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
