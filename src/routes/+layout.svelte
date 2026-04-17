<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
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

	inject({ mode: dev ? 'development' : 'production' });

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
			"worksFor": [
				{
					"@type": "Organization",
					"name": "UpSpeech"
				},
				{
					"@type": "Organization",
					"name": "Pixelmatters"
				}
			],
			"sameAs": [
				"https://github.com/kauredo",
				"https://linkedin.com/in/vascokf"
			],
			"knowsAbout": ["Ruby on Rails", "React", "TypeScript", "SvelteKit", "Web Development"],
			"description": "Full-stack web developer building clean, functional, and playful web apps."
		}
	</script>`}

	<!-- Font preconnect to shave handshake time off LCP -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Google Fonts — non-render-blocking via media swap. Fraunces with SOFT axis. -->
	{@html `<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,SOFT,wght@0,9..144,30..100,500;0,9..144,30..100,700;0,9..144,30..100,900;1,9..144,30..100,500&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
		media="print"
		onload="this.media='all'"
	/>`}
	<noscript>
		<link
			href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,SOFT,wght@0,9..144,30..100,500;0,9..144,30..100,700;0,9..144,30..100,900;1,9..144,30..100,500&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
			rel="stylesheet"
		/>
	</noscript>
</svelte:head>

<div
	class="flex min-h-screen flex-col bg-white dark:bg-slate-950 dark:text-slate-100"
>
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
