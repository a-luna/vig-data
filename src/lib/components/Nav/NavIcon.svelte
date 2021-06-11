<script lang="ts">
	import Gi3DStairs from 'svelte-icons/gi/Gi3DStairs.svelte';
	import GiAbacus from 'svelte-icons/gi/GiAbacus.svelte';
	import GiAbstract063 from 'svelte-icons/gi/GiAbstract063.svelte';
	import GiAllSeeingEye from 'svelte-icons/gi/GiAllSeeingEye.svelte';
	import GiAndroidMask from 'svelte-icons/gi/GiAndroidMask.svelte';
	import GiAudioCassette from 'svelte-icons/gi/GiAudioCassette.svelte';
	import GiAura from 'svelte-icons/gi/GiAura.svelte';
	import GiBestialFangs from 'svelte-icons/gi/GiBestialFangs.svelte';
	import GiBullseye from 'svelte-icons/gi/GiBullseye.svelte';
	import GiBurningDot from 'svelte-icons/gi/GiBurningDot.svelte';
	import GiContract from 'svelte-icons/gi/GiContract.svelte';
	import GiConvergenceTarget from 'svelte-icons/gi/GiConvergenceTarget.svelte';
	import GiConwayLifeGlider from 'svelte-icons/gi/GiConwayLifeGlider.svelte';
	import GiCrowNest from 'svelte-icons/gi/GiCrowNest.svelte';
	import GiCrownCoin from 'svelte-icons/gi/GiCrownCoin.svelte';
	import GiCrystalShine from 'svelte-icons/gi/GiCrystalShine.svelte';
	import GiDiagram from 'svelte-icons/gi/GiDiagram.svelte';
	import GiDividedSquare from 'svelte-icons/gi/GiDividedSquare.svelte';
	import GiDjinn from 'svelte-icons/gi/GiDjinn.svelte';
	import GiDropletSplash from 'svelte-icons/gi/GiDropletSplash.svelte';
	import GiDungeonLight from 'svelte-icons/gi/GiDungeonLight.svelte';
	import GiGems from 'svelte-icons/gi/GiGems.svelte';
	import GiHolosphere from 'svelte-icons/gi/GiHolosphere.svelte';
	import GiHoneycomb from 'svelte-icons/gi/GiHoneycomb.svelte';
	import GiInterstellarPath from 'svelte-icons/gi/GiInterstellarPath.svelte';
	import GiIsland from 'svelte-icons/gi/GiIsland.svelte';
	import GiJumpingDog from 'svelte-icons/gi/GiJumpingDog.svelte';
	import GiMantaRay from 'svelte-icons/gi/GiMantaRay.svelte';
	import GiMayanPyramid from 'svelte-icons/gi/GiMayanPyramid.svelte';
	import GiMiddleArrow from 'svelte-icons/gi/GiMiddleArrow.svelte';
	import GiMoebiusTriangle from 'svelte-icons/gi/GiMoebiusTriangle.svelte';
	import GiMultipleTargets from 'svelte-icons/gi/GiMultipleTargets.svelte';
	import GiOctopus from 'svelte-icons/gi/GiOctopus.svelte';
	import GiOrbWand from 'svelte-icons/gi/GiOrbWand.svelte';
	import GiPalmTree from 'svelte-icons/gi/GiPalmTree.svelte';
	import GiPineapple from 'svelte-icons/gi/GiPineapple.svelte';
	import GiPlagueDoctorProfile from 'svelte-icons/gi/GiPlagueDoctorProfile.svelte';
	import GiPlanetCore from 'svelte-icons/gi/GiPlanetCore.svelte';
	import GiReceiveMoney from 'svelte-icons/gi/GiReceiveMoney.svelte';
	import GiTriangleTarget from 'svelte-icons/gi/GiTriangleTarget.svelte';
	import GiTwoCoins from 'svelte-icons/gi/GiTwoCoins.svelte';

	export let iconName: string;

	const icons: { icon: any; name: string }[] = [
		{ icon: Gi3DStairs, name: 'Gi3DStairs' },
		{ icon: GiAbacus, name: 'GiAbacus' },
		{ icon: GiAbstract063, name: 'GiAbstract063' },
		{ icon: GiAllSeeingEye, name: 'GiAllSeeingEye' },
		{ icon: GiAndroidMask, name: 'GiAndroidMask' },
		{ icon: GiAudioCassette, name: 'GiAudioCassette' },
		{ icon: GiAura, name: 'GiAura' },
		{ icon: GiBestialFangs, name: 'GiBestialFangs' },
		{ icon: GiBullseye, name: 'GiBullseye' },
		{ icon: GiBurningDot, name: 'GiBurningDot' },
		{ icon: GiContract, name: 'GiContract' },
		{ icon: GiConvergenceTarget, name: 'GiConvergenceTarget' },
		{ icon: GiConwayLifeGlider, name: 'GiConwayLifeGlider' },
		{ icon: GiCrowNest, name: 'GiCrowNest' },
		{ icon: GiCrownCoin, name: 'GiCrownCoin' },
		{ icon: GiCrystalShine, name: 'GiCrystalShine' },
		{ icon: GiDiagram, name: 'GiDiagram' },
		{ icon: GiDividedSquare, name: 'GiDividedSquare' },
		{ icon: GiDjinn, name: 'GiDjinn' },
		{ icon: GiDropletSplash, name: 'GiDropletSplash' },
		{ icon: GiDungeonLight, name: 'GiDungeonLight' },
		{ icon: GiGems, name: 'GiGems' },
		{ icon: GiHolosphere, name: 'GiHolosphere' },
		{ icon: GiHoneycomb, name: 'GiHoneycomb' },
		{ icon: GiInterstellarPath, name: 'GiInterstellarPath' },
		{ icon: GiIsland, name: 'GiIsland' },
		{ icon: GiJumpingDog, name: 'GiJumpingDog' },
		{ icon: GiMantaRay, name: 'GiMantaRay' },
		{ icon: GiMayanPyramid, name: 'GiMayanPyramid' },
		{ icon: GiMiddleArrow, name: 'GiMiddleArrow' },
		{ icon: GiMoebiusTriangle, name: 'GiMoebiusTriangle' },
		{ icon: GiMultipleTargets, name: 'GiMultipleTargets' },
		{ icon: GiOctopus, name: 'GiOctopus' },
		{ icon: GiOrbWand, name: 'GiOrbWand' },
		{ icon: GiPalmTree, name: 'GiPalmTree' },
		{ icon: GiPineapple, name: 'GiPineapple' },
		{ icon: GiPlagueDoctorProfile, name: 'GiPlagueDoctorProfile' },
		{ icon: GiPlanetCore, name: 'GiPlanetCore' },
		{ icon: GiReceiveMoney, name: 'GiReceiveMoney' },
		{ icon: GiTriangleTarget, name: 'GiTriangleTarget' },
		{ icon: GiTwoCoins, name: 'GiTwoCoins' }
	];

	function getRandomIcon() {
		const max = icons.length - 1;
		const randomIndex = Math.floor(Math.random() * max);
		iconName = icons[randomIndex][1];
		return icons[randomIndex][0];
	}

</script>

<svelte:component this={getRandomIcon()} />
