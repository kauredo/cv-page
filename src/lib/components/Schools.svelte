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

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Where I've Studied</h2>
	<ul class="space-y-6">
		{#each education as edu, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<li
						in:fly={{ duration: 500, x: -30, delay: index * 200 }}
						class="transform transition-all duration-200 hover:translate-x-1"
					>
						<div class="flex flex-col gap-1">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
							<span class="text-sm text-gray-500 dark:text-gray-400"
								>{edu.institution}, {edu.period}</span
							>
							<p class="mt-1 text-gray-600 dark:text-gray-400">{edu.description}</p>
						</div>
					</li>
				{/if}
			</div>
		{/each}
	</ul>
</section>
