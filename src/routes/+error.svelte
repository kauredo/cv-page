<script lang="ts">
	import { page } from '$app/state';
	import { MetaTags } from 'svelte-meta-tags';
	import Button from '$lib/components/shared/Button.svelte';

	export let error: App.Error | null = page.error;
	export let status: number = page.status;
</script>

<MetaTags title="{status === 404 ? 'Page Not Found' : `Error ${status}`} — Vasco KF" />

<main class="relative flex min-h-[80vh] items-center bg-white dark:bg-slate-950">
	<!-- Decorative hoop motif (shooter POV from left, ~3/4 view) -->
	<svg
		class="text-hoop-500/25 pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3"
		viewBox="0 0 200 200"
		fill="none"
		aria-hidden="true"
	>
		<!-- Pole (behind backboard, clipped at right edge) -->
		<line
			x1="132"
			y1="18"
			x2="132"
			y2="178"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
		/>
		<!-- Backboard fill (subtle depth) -->
		<rect x="60" y="38" width="74" height="54" rx="1" fill="currentColor" fill-opacity="0.22" />
		<!-- Backboard outline -->
		<rect
			x="60"
			y="38"
			width="74"
			height="54"
			rx="1"
			stroke="currentColor"
			stroke-width="2"
		/>
		<!-- Target square (bottom edge aligns with top of rim) -->
		<rect x="83" y="72" width="28" height="18" stroke="currentColor" stroke-width="1.5" />
		<!-- Strut connecting backboard bottom-center to rim back -->
		<line
			x1="97"
			y1="92"
			x2="90"
			y2="95"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		/>
		<!-- Rim (prominent, front-most element) -->
		<ellipse cx="80" cy="95" rx="20" ry="5" stroke="currentColor" stroke-width="2.5" />
		<!-- Net outline (smooth curves converging downward) -->
		<path
			d="M 60 95 Q 66 115 74 122 L 86 122 Q 94 115 100 95"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<!-- Vertical net strands -->
		<g stroke="currentColor" stroke-width="0.9" stroke-linecap="round" opacity="0.7">
			<path d="M 64 98 L 68 120" />
			<path d="M 70 99 L 73 121" />
			<path d="M 76 100 L 77 122" />
			<path d="M 84 100 L 83 122" />
			<path d="M 90 99 L 87 121" />
			<path d="M 96 98 L 92 120" />
		</g>
		<!-- Horizontal net rings (curved to suggest dimension) -->
		<g stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.7">
			<path d="M 64 105 Q 80 110 96 105" />
			<path d="M 68 115 Q 80 119 92 115" />
		</g>
	</svg>

	<div class="relative mx-auto w-full max-w-3xl px-6 py-16">
		<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-6">
			{status === 404 ? 'Error // 404' : `Error // ${status}`}
		</p>

		<h1
			class="font-display text-slate-900 dark:text-white text-[clamp(4rem,16vw,12rem)] font-black leading-[0.85] tracking-[-0.04em]"
			style="font-variation-settings: 'opsz' 144, 'SOFT' 100;"
		>
			{status === 404 ? 'Air ball' : 'Foul'}<span
				class="airball-period text-hoop-500 dark:text-hoop-400">.</span
			>
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

<style>
	.airball-period {
		display: inline-block;
		vertical-align: baseline;
		line-height: inherit;
		animation: airball-shoot 5s linear 2s infinite;
	}

	@keyframes airball-shoot {
		0%,
		15% {
			translate: 0 0;
			opacity: 1;
		}
		18% {
			translate: 10px -40px;
			opacity: 1;
		}
		22% {
			translate: 30px -90px;
			opacity: 1;
		}
		26% {
			translate: 55px -140px;
			opacity: 1;
		}
		30% {
			translate: 85px -190px;
			opacity: 1;
		}
		34% {
			translate: 120px -230px;
			opacity: 1;
		}
		38% {
			translate: 155px -260px;
			opacity: 1;
		}
		42% {
			translate: 190px -285px;
			opacity: 1;
		}
		46% {
			translate: 225px -300px;
			opacity: 1;
		}
		50% {
			translate: 260px -305px;
			opacity: 1;
		}
		54% {
			translate: 295px -300px;
			opacity: 1;
		}
		58% {
			translate: 330px -290px;
			opacity: 1;
		}
		62% {
			translate: 370px -270px;
			opacity: 1;
		}
		66% {
			translate: 410px -245px;
			opacity: 1;
		}
		70% {
			translate: 450px -210px;
			opacity: 1;
		}
		73% {
			translate: 490px -170px;
			opacity: 0;
		}
		73.01% {
			translate: 0 0;
			opacity: 0;
		}
		96% {
			translate: 0 0;
			opacity: 0;
		}
		100% {
			translate: 0 0;
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.airball-period {
			animation: none;
		}
	}
</style>
