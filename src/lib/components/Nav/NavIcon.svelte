<!-- <script lang="ts">
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
	import GiCrownCoin from 'svelte-icons/gi/GiCrownCoin.svelte';
	import GiCrowNest from 'svelte-icons/gi/GiCrowNest.svelte';
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

	const icons = [
		Gi3DStairs,
		GiAbacus,
		GiAbstract063,
		GiAllSeeingEye,
		GiAndroidMask,
		GiAudioCassette,
		GiAura,
		GiBestialFangs,
		GiBullseye,
		GiBurningDot,
		GiContract,
		GiConvergenceTarget,
		GiConwayLifeGlider,
		GiCrowNest,
		GiCrownCoin,
		GiCrystalShine,
		GiDiagram,
		GiDividedSquare,
		GiDjinn,
		GiDropletSplash,
		GiDungeonLight,
		GiGems,
		GiHolosphere,
		GiHoneycomb,
		GiInterstellarPath,
		GiIsland,
		GiJumpingDog,
		GiMantaRay,
		GiMayanPyramid,
		GiMiddleArrow,
		GiMoebiusTriangle,
		GiMultipleTargets,
		GiOctopus,
		GiOrbWand,
		GiPalmTree,
		GiPineapple,
		GiPlagueDoctorProfile,
		GiPlanetCore,
		GiReceiveMoney,
		GiTriangleTarget,
		GiTwoCoins
	];

	const iconNames = [
		'Gi3DStairs',
		'GiAbacus',
		'GiAbstract063',
		'GiAllSeeingEye',
		'GiAndroidMask',
		'GiAudioCassette',
		'GiAura',
		'GiBestialFangs',
		'GiBullseye',
		'GiBurningDot',
		'GiContract',
		'GiConvergenceTarget',
		'GiConwayLifeGlider',
		'GiCrowNest',
		'GiCrownCoin',
		'GiCrystalShine',
		'GiDiagram',
		'GiDividedSquare',
		'GiDjinn',
		'GiDropletSplash',
		'GiDungeonLight',
		'GiGems',
		'GiHolosphere',
		'GiHoneycomb',
		'GiInterstellarPath',
		'GiIsland',
		'GiJumpingDog',
		'GiMantaRay',
		'GiMayanPyramid',
		'GiMiddleArrow',
		'GiMoebiusTriangle',
		'GiMultipleTargets',
		'GiOctopus',
		'GiOrbWand',
		'GiPalmTree',
		'GiPineapple',
		'GiPlagueDoctorProfile',
		'GiPlanetCore',
		'GiReceiveMoney',
		'GiTriangleTarget',
		'GiTwoCoins'
	];

	export let random: number = 0;
	export const name: string = iconNames?.[random];

</script>

<svelte:component this={icons[random]} /> -->
