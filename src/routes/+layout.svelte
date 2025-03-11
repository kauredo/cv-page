<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>VascoKF — Developer Portfolio</title>
	<meta
		name="description"
		content="Vasco's personal developer portfolio showcasing web projects and skills."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="author" content="VascoKF" />
	<meta property="og:title" content="VascoKF — Developer Portfolio" />
	<meta
		property="og:description"
		content="Showcasing my latest web projects, skills and experience."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
