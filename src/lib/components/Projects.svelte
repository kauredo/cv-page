<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './shared/ProjectCard.svelte';

	export let featuredProject: Project | null = null;
	export let projects: Project[];
</script>

<section aria-labelledby="projects-heading">
	<div class="mb-8 flex items-end justify-between">
		<h2
			id="projects-heading"
			class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
		>
			What I've Been Building
		</h2>
		<a
			href="/projects"
			class="group text-vasco-600 hover:text-vasco-700 dark:text-vasco-400 dark:hover:text-vasco-300 flex items-center gap-1.5 text-sm font-medium"
		>
			See all
			<svg
				class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 8l4 4m0 0l-4 4m4-4H3"
				/>
			</svg>
		</a>
	</div>

	<!-- Featured project - breaks the grid -->
	{#if featuredProject}
		<a
			href={`/projects/${featuredProject.slug}`}
			class="group hover:border-hoop-300 hover:shadow-hoop-500/10 dark:hover:border-hoop-500/50 dark:hover:shadow-hoop-500/20 relative mb-8 block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
			data-sveltekit-preload-data="hover"
		>
			<div class="grid gap-0 lg:grid-cols-2">
				<!-- Image side -->
				<div
					class="relative aspect-video overflow-hidden bg-slate-100 lg:aspect-auto lg:h-full dark:bg-slate-800"
				>
					{#if featuredProject.images && featuredProject.images[0]}
						<img
							src={featuredProject.images[0]}
							alt={`Screenshot of ${featuredProject.title}`}
							class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
							style="view-transition-name: project-image-{featuredProject.slug}-0"
							loading="eager"
						/>
					{:else}
						<img
							src="/images/placeholder.webp"
							alt={`Placeholder for ${featuredProject.title}`}
							class="h-full w-full object-cover"
							style="view-transition-name: project-image-{featuredProject.slug}-0"
						/>
					{/if}
					<!-- Featured badge -->
					<div
						class="bg-hoop-500 absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg"
					>
						Featured
					</div>
				</div>

				<!-- Content side -->
				<div class="flex flex-col justify-center p-6 lg:p-8">
					<h3
						class="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white"
						style="view-transition-name: project-title-{featuredProject.slug}"
					>
						{featuredProject.title}
					</h3>
					<p
						class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300"
						style="view-transition-name: project-description-{featuredProject.slug}"
					>
						{featuredProject.description}
					</p>
					{#if featuredProject.stack && featuredProject.stack.length > 0}
						<div class="mt-4 flex flex-wrap gap-2">
							{#each featuredProject.stack.slice(0, 5) as tech}
								<span
									class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
								>
									{tech}
								</span>
							{/each}
						</div>
					{/if}
					<div class="mt-6">
						<span
							class="text-hoop-600 dark:text-hoop-400 inline-flex items-center gap-2 text-sm font-semibold"
						>
							View project
							<svg
								class="h-4 w-4 transition-transform group-hover:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</span>
					</div>
				</div>
			</div>
		</a>
	{/if}

	<!-- Regular project grid -->
	{#if projects.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}
</section>
