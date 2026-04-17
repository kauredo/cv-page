<script lang="ts">
	import { page } from '$app/state';
	import { MetaTags } from 'svelte-meta-tags';
	import Button from '$lib/components/shared/Button.svelte';

	export let error: App.Error | null = page.error;
	export let status: number = page.status;
</script>

<MetaTags title="{status === 404 ? 'Page Not Found' : `Error ${status}`} — Vasco KF" />

<main class="relative flex min-h-[80vh] items-center bg-white dark:bg-slate-950">
	<!-- Decorative court arc backdrop -->
	<svg
		class="text-hoop-500/15 absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3"
		viewBox="0 0 100 100"
		fill="none"
		aria-hidden="true"
	>
		<circle cx="50" cy="50" r="48" stroke="currentColor" stroke-width="0.4" />
		<circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="0.4" />
		<circle cx="50" cy="50" r="22" stroke="currentColor" stroke-width="0.4" />
		<circle cx="50" cy="50" r="2" fill="currentColor" />
	</svg>

	<div class="relative mx-auto w-full max-w-3xl px-6 py-16">
		<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-6">
			{status === 404 ? 'Error // 404' : `Error // ${status}`}
		</p>

		<h1
			class="font-display text-slate-900 dark:text-white text-[clamp(4rem,16vw,12rem)] font-black leading-[0.85] tracking-[-0.04em]"
			style="font-variation-settings: 'opsz' 144, 'SOFT' 100;"
		>
			{status === 404 ? 'Air ball' : 'Foul'}<span class="text-hoop-500 dark:text-hoop-400">.</span>
		</h1>

		<div class="mt-10 max-w-xl space-y-4">
			<p class="text-xl leading-relaxed text-slate-700 dark:text-slate-200">
				{#if status === 404}
					There's nothing at
					<span class="font-mono text-hoop-600 dark:text-hoop-400">{page.url.pathname}</span>.
					Maybe a typo, maybe a moved page.
				{:else if error?.message}
					{error.message}
				{:else}
					Something went wrong on our end — not yours.
				{/if}
			</p>

			<p class="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
				Fig. ∅ — Sometimes shots miss.
			</p>
		</div>

		<div class="mt-10 flex flex-wrap items-center gap-4">
			<Button type="primary" href="/">← Back home</Button>
			<Button type="secondary" href="/projects">See projects</Button>
		</div>
	</div>
</main>
