<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './shared/ProjectCard.svelte';
	import SectionHeading from './shared/SectionHeading.svelte';

	export let featuredProject: Project | null = null;
	export let projects: Project[];
</script>

<section aria-labelledby="projects-heading">
	<SectionHeading
		id="projects-heading"
		index="02"
		title="What I've Been Building"
		italicWord="Building"
		trailing
		meta="Selected · 2020 — 2026"
	/>

	<!-- Featured project — image-dominant editorial spread -->
	{#if featuredProject}
		<a
			href={`/projects/${featuredProject.slug}`}
			class="group focus-visible:ring-hoop-500 relative mb-12 block overflow-hidden rounded-xl bg-slate-950 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none dark:focus-visible:ring-offset-slate-950"
			data-sveltekit-preload-data="hover"
		>
			<div class="grid items-stretch gap-0 md:grid-cols-12">
				<!-- Image — dominant, bleeds the block -->
				<div class="relative md:col-span-7 lg:col-span-8">
					<div class="relative aspect-video overflow-hidden md:aspect-auto md:h-full">
						{#if featuredProject.images && featuredProject.images[0]}
							<img
								src={featuredProject.images[0]}
								alt={`Screenshot of ${featuredProject.title}`}
								class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] group-active:scale-[1.03] motion-reduce:transform-none"
								style="view-transition-name: project-image-{featuredProject.slug}-0"
								loading="eager"
								fetchpriority="high"
								width="640"
								height="360"
							/>
						{:else}
							<img
								src="/images/placeholder.webp"
								alt={`Placeholder for ${featuredProject.title}`}
								class="h-full w-full object-cover"
								width="640"
								height="360"
							/>
						{/if}
					</div>
				</div>

				<!-- Content — flat slate block, no gradient -->
				<div
					class="relative flex flex-col justify-between p-6 text-white sm:p-8 md:col-span-5 md:p-8 lg:col-span-4 lg:p-10"
				>
					<div class="relative">
						<span class="eyebrow text-hoop-400 inline-flex items-center gap-2">
							<span class="bg-hoop-500/70 h-px w-6" aria-hidden="true"></span>
							Featured · Case study
						</span>

						<h3
							class="font-display mt-4 text-3xl leading-[0.95] font-bold tracking-tight sm:text-4xl"
							style="view-transition-name: project-title-{featuredProject.slug}"
						>
							{featuredProject.title}
						</h3>
						<p
							class="mt-4 leading-relaxed text-slate-300"
							style="view-transition-name: project-description-{featuredProject.slug}"
						>
							{featuredProject.description}
						</p>
						{#if featuredProject.stack && featuredProject.stack.length > 0}
							<div class="mt-5 flex flex-wrap gap-1.5">
								{#each featuredProject.stack.slice(0, 3) as tech}
									<span
										class="rounded border border-white/20 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-300"
									>
										{tech}
									</span>
								{/each}
							</div>
						{/if}
					</div>

					<div
						class="relative mt-8 inline-flex items-center gap-2 self-start font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase"
					>
						<span
							class="border-hoop-400/60 group-hover:border-hoop-300 group-active:border-hoop-300 border-b pb-0.5 transition-colors"
							>View case study</span
						>
						<span
							aria-hidden="true"
							class="text-hoop-300 transition-transform group-hover:translate-x-1 group-active:translate-x-1 motion-reduce:transform-none"
							>→</span
						>
					</div>
				</div>
			</div>
		</a>
	{/if}

	<!-- Regular grid -->
	{#if projects.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}

	<!-- Stronger "see all" — sits below the grid as an editorial tail -->
	<div class="mt-10 flex justify-end">
		<a
			href="/projects"
			class="group hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 inline-flex items-center gap-3 rounded-md px-2 py-2 font-mono text-xs font-semibold tracking-[0.18em] text-slate-900 uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:text-white dark:focus-visible:ring-offset-slate-950"
		>
			<span
				class="group-hover:bg-hoop-500 group-active:bg-hoop-500 h-px w-10 bg-slate-900/40 transition-[width,background-color] duration-200 group-hover:w-16 group-active:w-16 dark:bg-white/40"
				aria-hidden="true"
			></span>
			See all projects
			<span
				aria-hidden="true"
				class="transition-transform group-hover:translate-x-1 group-active:translate-x-1 motion-reduce:transform-none"
				>→</span
			>
		</a>
	</div>
</section>
