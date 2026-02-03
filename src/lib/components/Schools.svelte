<script lang="ts">
	import type { Education } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	export let education: Education[] = [];
	let visibleItems: Record<number, boolean> = {};

	function handleIntersect(index: number) {
		return (event: CustomEvent<{ entry: IntersectionObserverEntry }>) => {
			const { isIntersecting } = event.detail.entry;
			if (isIntersecting) {
				visibleItems[index] = true;
			}
		};
	}
</script>

<section in:fade={{ duration: 200 }} aria-labelledby="education-heading">
	<h2
		id="education-heading"
		class="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		Where I've Studied
	</h2>
	<div class="space-y-6">
		{#each education as edu, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<div
						in:fly={{ duration: 500, x: -20, delay: index * 100 }}
						class="group relative rounded-xl border-l-4 border-vasco-400 bg-white py-4 pl-6 pr-4 transition-colors hover:bg-slate-50 dark:border-vasco-500 dark:bg-slate-800/50 dark:hover:bg-slate-800"
					>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
						<p class="mt-1 text-sm font-medium text-vasco-600 dark:text-vasco-400">
							{edu.institution}
						</p>
						<span
							class="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400"
						>
							{edu.period}
						</span>
						<p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
							{edu.description}
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
