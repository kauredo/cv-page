<script lang="ts">
	import Button from './shared/Button.svelte';
</script>

<section class="relative overflow-hidden" aria-label="Introduction">
	<!-- Background court diagram — small free-throw lane motif, anchored bottom-left of right column -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
		<svg
			class="absolute -bottom-12 left-[42%] hidden h-[280px] w-[280px] text-slate-300/60 lg:block dark:text-slate-700/50"
			viewBox="0 0 200 200"
			fill="none"
		>
			<!-- Free-throw lane (the "key") -->
			<rect x="60" y="20" width="80" height="120" stroke="currentColor" stroke-width="1" />
			<!-- Free-throw circle -->
			<circle cx="100" cy="140" r="32" stroke="currentColor" stroke-width="1" />
			<!-- Hoop dot -->
			<circle cx="100" cy="20" r="4" stroke="currentColor" stroke-width="1.5" fill="none" />
		</svg>
	</div>

	<!-- Top masthead strip -->
	<div class="relative mx-auto max-w-6xl px-6 pt-8">
		<div
			class="flex flex-wrap items-center justify-between gap-3 border-t border-b border-slate-900/15 py-2.5 dark:border-white/15"
		>
			<span class="eyebrow text-slate-700 dark:text-slate-300">VKF — Portfolio · Vol. VI</span>
			<span class="eyebrow hidden text-slate-600 sm:inline dark:text-slate-400"
				>Lisbon, PT · 38°N</span
			>
			<span class="eyebrow inline-flex items-center gap-2 text-slate-700 dark:text-slate-300">
				<span class="bg-hoop-500 inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true"></span>
				Available — Apr 2026
			</span>
		</div>
	</div>

	<div class="relative mx-auto max-w-6xl px-6 pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pb-32">
		<div class="grid items-end gap-10 md:grid-cols-12 md:gap-10 lg:gap-12">
			<!-- Left column — title block -->
			<div class="md:col-span-7 lg:col-span-8">
				<h1 class="font-display text-slate-900 dark:text-white">
					<span
						class="block text-2xl font-medium text-slate-500 italic sm:text-3xl dark:text-slate-400"
						style="font-variation-settings: 'opsz' 14, 'SOFT' 100;"
					>
						Hey, I'm —
					</span>
					<span
						class="block text-[clamp(4.5rem,14vw,11rem)] leading-[0.88] font-black tracking-[-0.04em]"
						style="font-variation-settings: 'opsz' 144, 'SOFT' 100;"
					>
						Vasco<span class="text-hoop-500 dark:text-hoop-400">.</span>
					</span>
				</h1>

				<div class="mt-8 max-w-xl space-y-4">
					<p class="text-xl leading-relaxed text-slate-700 sm:text-2xl dark:text-slate-200">
						I build
						<span class="font-display font-medium text-slate-900 italic dark:text-white">clean</span
						>,
						<span class="font-display font-medium text-slate-900 italic dark:text-white"
							>functional</span
						>, and
						<span class="font-display text-hoop-600 dark:text-hoop-400 font-medium italic"
							>playful</span
						>
						web apps.
					</p>

					<p class="text-base text-slate-600 dark:text-slate-400">
						Currently into 3D printing, basketball scheduling tools, and making the web a little
						more fun.
					</p>
				</div>

				<div class="mt-10 flex flex-wrap items-center gap-4">
					<Button type="primary" href="/projects">See my work</Button>
					<Button type="secondary" href="/contact">Get in touch</Button>
				</div>
			</div>

			<!-- Right column — portrait inside vasco-blue color block -->
			<aside
				class="mx-auto w-full max-w-[260px] sm:max-w-[300px] md:col-span-5 md:mx-0 md:max-w-none lg:col-span-4"
				aria-label="Portrait"
			>
				<figure>
					<div class="relative">
						<!-- Tilted blue color block backdrop -->
						<div
							class="bg-vasco-600 dark:bg-vasco-700 absolute -inset-3 rotate-[3deg] rounded-2xl"
							aria-hidden="true"
						></div>
						<img
							src="/images/me.webp"
							alt="Vasco Kaufmann Figueiredo"
							class="relative aspect-[4/5] w-full rounded-2xl object-cover grayscale-[15%]"
							loading="eager"
							fetchpriority="high"
							width="480"
							height="600"
						/>
					</div>

					<figcaption class="mt-5 flex items-baseline justify-between gap-4">
						<span class="font-mono text-[10px] leading-relaxed text-slate-600 dark:text-slate-400">
							Fig. 01 — The author, mid-thought.
						</span>
						<!-- Initials signature -->
						<span
							class="font-display text-hoop-500 shrink-0 text-2xl leading-none font-black tracking-[-0.04em]"
							aria-hidden="true"
							style="font-variation-settings: 'opsz' 144, 'SOFT' 100;"
						>
							VKF.
						</span>
					</figcaption>
				</figure>
			</aside>
		</div>
	</div>

	<!-- Bottom court-line divider into the rest of the page -->
	<div
		class="text-hoop-500/35 dark:text-hoop-400/35 court-divider mx-auto max-w-6xl px-6"
		aria-hidden="true"
	></div>
</section>
