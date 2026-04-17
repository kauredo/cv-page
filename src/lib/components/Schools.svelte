<script lang="ts">
	import type { Education } from '$lib/types';

	export let education: Education[] = [];
</script>

<section aria-labelledby="education-heading">
	<div class="grid gap-10 md:grid-cols-12 md:gap-10 lg:gap-12">
		<!-- Editorial heading column -->
		<header class="md:col-span-4">
			<div
				class="flex items-center justify-between gap-4 border-b border-slate-900/15 pb-3 dark:border-white/15"
			>
				<span class="eyebrow text-vasco-700 dark:text-vasco-300">№ 04</span>
				<span class="eyebrow text-slate-600 dark:text-slate-400">Foundations</span>
			</div>
			<h2
				id="education-heading"
				class="font-display mt-6 text-5xl leading-[0.9] font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
			>
				<span class="text-vasco-700 dark:text-vasco-300 font-medium italic">Studied</span><span
					class="text-vasco-600 dark:text-vasco-400">.</span
				>
			</h2>
			<p
				class="mt-4 font-mono text-[11px] tracking-wider text-slate-600 uppercase dark:text-slate-400"
			>
				Where the foundations got laid.
			</p>
		</header>

		<div class="md:col-span-8">
			<ul
				class="divide-y divide-slate-900/10 border-y border-slate-900/10 dark:divide-white/10 dark:border-white/10"
			>
				{#each education as edu}
					<li
						class="group relative py-6 transition-colors duration-300 hover:bg-slate-50/60 active:bg-slate-100/60 sm:py-8 dark:hover:bg-slate-900/40 dark:active:bg-slate-900/60"
					>
						<div class="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-5 md:gap-8">
							<p
								class="text-vasco-700 dark:text-vasco-300 flex-none font-mono text-[11px] tracking-[0.18em] uppercase sm:w-32 md:w-36"
							>
								{edu.period}
							</p>
							<div class="flex-1">
								<h3
									class="font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white"
								>
									{edu.degree}
								</h3>
								<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
									@ {edu.institution}
								</p>
								<p class="mt-3 max-w-prose leading-relaxed text-slate-600 dark:text-slate-300">
									{edu.description}
								</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
