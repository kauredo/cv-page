<script lang="ts">
	import { dev } from '$app/env';
	import { inject } from '@vercel/analytics';
	import '../app.css';
	import Navbar from '#lib/components/Navbar.svelte';
	import Footer from '#lib/components/Footer.svelte';
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
</script>

<MetaTags {...metaTags} />

<svelte:head>
	<!-- Font preconnect to shave handshake time off LCP -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- Google Fonts — non-render-blocking via media swap. Archivo (variable, with italics) for
	     headings, Archivo Black for the name. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static markup; Svelte can't render an onload attribute string -->
	{@html `<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..900;1,400..900&family=Archivo+Black&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
		media="print"
		onload="this.media='all'"
	/>`}
	<noscript>
		<link
			href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..900;1,400..900&family=Archivo+Black&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
			rel="stylesheet"
		/>
	</noscript>
</svelte:head>

<div class="flex min-h-screen flex-col bg-white dark:bg-slate-950 dark:text-slate-100">
	<a
		href="#main"
		class="bg-vasco-600 focus-visible:ring-hoop-500 sr-only z-30 rounded-md px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus-visible:ring-2 focus-visible:outline-none"
		>Skip to content</a
	>
	<Navbar />
	<main id="main" tabindex="-1" class="flex-1 focus:outline-none">
		{@render children()}
	</main>
	<Footer />
</div>
