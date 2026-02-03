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

<section in:fade={{ duration: 200 }} aria-labelledby="projects-heading">
	<div class="mb-8 flex items-end justify-between">
		<h2
			id="projects-heading"
			class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
		>
			What I've Been Building
		</h2>
		<a
			href="/projects"
			class="group flex items-center gap-1 text-sm font-medium text-vasco-600 transition-colors hover:text-vasco-700 dark:text-vasco-400 dark:hover:text-vasco-300"
		>
			See all projects
			<svg
				class="h-4 w-4 transition-transform group-hover:translate-x-1"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M14 5l7 7m0 0l-7 7m7-7H3"
				/>
			</svg>
		</a>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<div in:fly={{ duration: 500, y: 30, delay: index * 100 }}>
						<ProjectCard {project} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
