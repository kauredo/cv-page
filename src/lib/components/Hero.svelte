<script lang="ts">
	import Button from './shared/Button.svelte';
</script>

<section class="relative overflow-hidden py-16 sm:py-24 lg:py-32" aria-label="Introduction">
	<!-- Subtle court line accent -->
	<div class="pointer-events-none absolute top-0 right-0 h-full w-1/3 opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true">
		<svg viewBox="0 0 200 400" class="h-full w-full" preserveAspectRatio="xMaxYMid slice">
			<circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" stroke-width="2" class="text-hoop-500"/>
			<line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" stroke-width="2" class="text-hoop-500"/>
		</svg>
	</div>

	<div class="mx-auto max-w-6xl px-6">
		<div class="max-w-2xl">
			<p class="mb-3 text-sm font-semibold uppercase tracking-wider text-hoop-500 dark:text-hoop-400">
				Full-stack developer
			</p>

			<h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
				Hey, I'm Vasco
			</h1>

			<p class="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
				I build <span class="font-medium text-slate-900 dark:text-white">clean</span>, <span class="font-medium text-slate-900 dark:text-white">functional</span>, and <span class="font-medium text-hoop-600 dark:text-hoop-400">playful</span> web apps.
			</p>

			<p class="mt-3 text-slate-500 dark:text-slate-400">
				Currently into 3D printing, basketball scheduling tools, and making the web a little more fun.
			</p>

			<div class="mt-8 flex flex-wrap gap-3">
				<Button type="primary" href="/projects">See My Work</Button>
				<Button type="secondary" href="/contact">Get In Touch</Button>
			</div>
		</div>
	</div>
</section>
