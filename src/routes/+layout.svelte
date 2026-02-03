<script lang="ts">
	import { browser } from '$app/environment';
	import { pageview } from '$lib/services/analytics';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { data, children } = $props();
	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

	$effect(() => {
		if (browser) {
			pageview(page.url.pathname);
		}
	});
</script>

<MetaTags {...metaTags} />

<svelte:head>
	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Vasco Kaufmann Figueiredo",
			"alternateName": "VascoKF",
			"url": "https://www.vascokf.com",
			"image": "https://www.vascokf.com/images/portfolio.webp",
			"jobTitle": "Full Stack Web Developer",
			"worksFor": {
				"@type": "Organization",
				"name": "Medihive"
			},
			"sameAs": [
				"https://github.com/kauredo",
				"https://linkedin.com/in/vascokf"
			],
			"knowsAbout": ["Ruby on Rails", "React", "TypeScript", "SvelteKit", "Web Development"],
			"description": "Full-stack web developer building clean, functional, and playful web apps."
		}
	</script>`}

	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="preload"
		href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
		as="style"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
		media="print"
		onload={function () {
			this.media = 'all';
		}}
	/>
	<noscript>
		<link
			href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
			rel="stylesheet"
			type="text/css"
		/>
	</noscript>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-vasco-50 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100"
>
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
