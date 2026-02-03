<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './shared/Button.svelte';
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<section
	class="relative py-20 sm:py-28 lg:py-36"
	in:fade={{ duration: 600, delay: 100 }}
	aria-label="Introduction"
>
	<div class="mx-auto max-w-6xl px-6">
		{#if mounted}
			<!-- Main content - left aligned for impact -->
			<div class="max-w-3xl">
				<div in:fly={{ y: 30, duration: 700, delay: 0 }}>
					<p class="mb-4 text-sm font-semibold uppercase tracking-widest text-vasco-600 dark:text-vasco-400">
						Web Developer
					</p>
				</div>

				<div in:fly={{ y: 40, duration: 700, delay: 100 }}>
					<h1 class="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white">
						Hey, I'm <span class="text-vasco-600 dark:text-vasco-400">Vasco</span>
					</h1>
				</div>

				<div in:fly={{ y: 40, duration: 700, delay: 200 }}>
					<p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
						I build <strong class="font-semibold text-slate-900 dark:text-white">clean, functional, and playful</strong> web apps.
						Currently exploring 3D printing, basketball scheduling tools, and making the web a little more fun.
					</p>
				</div>

				<div in:fly={{ y: 40, duration: 700, delay: 300 }} class="mt-10 flex flex-wrap gap-4">
					<Button type="primary" href="/projects">See My Work</Button>
					<Button type="secondary" href="/contact">Get In Touch</Button>
				</div>
			</div>

			<!-- Decorative elements -->
			<div
				in:fade={{ duration: 1000, delay: 500 }}
				class="pointer-events-none absolute -top-20 right-0 h-96 w-96 opacity-20 blur-3xl"
				style="background: radial-gradient(circle, var(--color-vasco-400) 0%, transparent 70%);"
				aria-hidden="true"
			></div>
		{:else}
			<!-- Loading state with same structure to prevent layout shift -->
			<div class="max-w-3xl animate-pulse">
				<p class="mb-4 text-sm font-semibold uppercase tracking-widest text-vasco-600 dark:text-vasco-400">
					Web Developer
				</p>
				<h1 class="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white">
					Hey, I'm <span class="text-vasco-600 dark:text-vasco-400">Vasco</span>
				</h1>
				<p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
					I build <strong class="font-semibold text-slate-900 dark:text-white">clean, functional, and playful</strong> web apps.
					Currently exploring 3D printing, basketball scheduling tools, and making the web a little more fun.
				</p>
				<div class="mt-10 flex flex-wrap gap-4">
					<Button type="primary" href="/projects">See My Work</Button>
					<Button type="secondary" href="/contact">Get In Touch</Button>
				</div>
			</div>
		{/if}
	</div>
</section>
