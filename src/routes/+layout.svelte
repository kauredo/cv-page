<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col dark:bg-gray-800 dark:text-gray-200">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
