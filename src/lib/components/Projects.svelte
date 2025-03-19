<script lang="ts">
	import type { Project } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import ProjectCard from './shared/ProjectCard.svelte';

	export let projects: Project[];
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
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I've Been Building</h2>
	<div class="flex justify-center gap-6">
		{#each projects as project, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<div in:fly={{ duration: 500, y: 30, delay: index * 200 }}>
						<ProjectCard {project} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<a
		href="/projects"
		class="text-vasco-600 mt-4 block transform transition-all duration-200 hover:-translate-y-1 hover:underline"
		>See all my projects →</a
	>
</section>
