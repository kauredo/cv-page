<script lang="ts">
	import Stop from '#lib/components/shared/Stop.svelte';

	const heading = 'eyebrow text-vasco-700 dark:text-vasco-300 mb-3';
	const body = 'max-w-prose text-lg leading-relaxed text-slate-700 dark:text-slate-300';
</script>

<section class="mx-auto max-w-2xl px-6 py-12 sm:py-16">
	<div
		class="mb-12 flex flex-wrap items-center justify-between gap-3 border-t border-b border-slate-900/10 py-2.5 dark:border-white/10"
	>
		<a
			href="/"
			class="group eyebrow hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 -mx-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:outline-none dark:text-slate-300"
		>
			<span
				aria-hidden="true"
				class="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1 motion-reduce:transform-none"
				>←</span
			>
			Home
		</a>
		<span class="eyebrow text-slate-600 dark:text-slate-400">Updated 17 Nov 2026</span>
	</div>

	<div class="mb-12">
		<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-6">Fine print / Privacy</p>
		<h1
			class="font-display text-5xl leading-[0.9] font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
		>
			What this site <span class="text-hoop-500 dark:text-hoop-400 font-medium italic">keeps</span
			><Stop class="text-hoop-500 dark:text-hoop-400" />
		</h1>
		<p class="mt-6 max-w-md text-lg leading-relaxed text-slate-700 dark:text-slate-300">
			Not much. This is a portfolio run by me, Vasco Kaufmann Figueiredo, from Lisbon. Here is
			everything it collects.
		</p>
	</div>

	<div class="space-y-10 border-t border-slate-900/10 pt-10 dark:border-white/10">
		<section>
			<h2 class={heading}>The contact form</h2>
			<p class={body}>
				When you send a message, the form takes your name, your email address and what you wrote.
				The site's server passes them to AhaSend, an email delivery service, which sends them to my
				inbox as one email. Your address goes in as the reply-to, so I can write back. The site has
				no database and keeps no copy. The email stays in my inbox until I delete it, and AhaSend
				keeps its own delivery records under its own policy.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class={heading}>Analytics</h2>
			<p class={body}>
				Google Analytics runs with storage turned off, so it sets no cookies and can't recognise you
				on your next visit. Each page view still sends Google a ping with the page, the site that
				sent you here and a rough location.
			</p>
			<p class={body}>
				Vercel Web Analytics counts page views, referrers and countries. It sets no cookies either.
				It tells visitors apart with a hash of the request that Vercel throws away after 24 hours.
			</p>
		</section>

		<section>
			<h2 class={heading}>Cookies and storage</h2>
			<p class={body}>
				The one cookie is <code class="font-mono text-base">__vdpl</code>. Vercel, which hosts the
				site, sets it so every page you open comes from the same version of the site. It holds a
				deployment ID and nothing about you. Your light or dark mode choice sits in your browser's
				local storage and never leaves it.
			</p>
		</section>

		<section>
			<h2 class={heading}>Other sites</h2>
			<p class={body}>
				Nothing here follows you around the web. There are no ads, no share buttons and no embedded
				social feeds. The fonts come from Google Fonts, so your browser fetches them from Google's
				servers. Vercel keeps the usual short-lived request logs for the site.
			</p>
		</section>

		<section>
			<h2 class={heading}>Deleting your message</h2>
			<p class={body}>
				Want a message you sent deleted, or to know what I have? Ask through the
				<a
					href="/contact"
					class="text-vasco-700 decoration-vasco-500/40 hover:text-hoop-600 hover:decoration-hoop-500 focus-visible:ring-vasco-500 dark:text-vasco-300 dark:hover:text-hoop-400 rounded underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
					>contact form</a
				>. I'll delete it and tell you once it's gone.
			</p>
		</section>
	</div>
</section>
