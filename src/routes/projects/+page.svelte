<script lang="ts">
	import ProjectCard from '$lib/components/shared/ProjectCard.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import type { Project } from '$lib/types';
	import type { PageData } from './$types';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let projects: Project[] = data.projects;
	let mounted = false;
	let searchQuery = '';
	let activeFilter = 'all';
	let filters = ['all'];

	// Extract unique stack from projects for filtering
	onMount(() => {
		mounted = true;
		if (projects.length > 0) {
			const allTags = projects.flatMap((project) => project.stack || []);
			const uniqueTags = [...new Set(allTags)].filter(Boolean);
			filters = ['all', ...uniqueTags];
		}
	});

	// Filter projects based on search and tag filter
	$: filteredProjects = projects.filter((project) => {
		const matchesSearch =
			searchQuery === '' ||
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesFilter =
			activeFilter === 'all' || (project.stack && project.stack.includes(activeFilter));

		return matchesSearch && matchesFilter;
	});
</script>

<section in:fade={{ duration: 300 }} class="mx-auto max-w-4xl p-6">
	{#if mounted}
		<div class="mb-8">
			<div class="flex items-center gap-2">
				<BackButton href="/" />
				<div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
				<span class="text-sm text-gray-500 dark:text-gray-400">Home</span>
			</div>

			<div
				class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
				in:fly={{ y: -20, duration: 600 }}
			>
				<h1 class="my-4 text-4xl font-bold">Projects</h1>

				<div class="relative">
					<input
						type="text"
						placeholder="Search projects..."
						bind:value={searchQuery}
						class="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
					/>
					<svg
						class="absolute top-2.5 right-3 h-4 w-4 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>

			{#if filters.length > 1}
				<div class="mt-4 flex flex-wrap gap-2" in:fly={{ y: -10, duration: 600, delay: 100 }}>
					{#each filters as filter}
						<button
							class="rounded-full px-3 py-1 text-sm transition-all {activeFilter === filter
								? 'bg-blue-600 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}"
							on:click={() => (activeFilter = filter)}
						>
							{filter}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		{#if filteredProjects.length > 0}
			<div
				class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
				in:fly={{ y: 20, duration: 600, delay: 200 }}
			>
				{#each filteredProjects as project (project.slug)}
					<div in:fly={{ y: 20, duration: 400, delay: 200 }}>
						<ProjectCard {project} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="mt-12 text-center" in:fade={{ delay: 300 }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
					No projects found matching your search
				</p>
				<button
					class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					on:click={() => {
						searchQuery = '';
						activeFilter = 'all';
					}}
				>
					Clear filters
				</button>
			</div>
		{/if}
	{/if}
</section>
