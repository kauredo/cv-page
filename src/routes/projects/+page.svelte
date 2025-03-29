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
	let isFilterOpen = false;
	let selectedCategory = 'all';

	const categories = {
		All: 'all',
		Frontend: ['React', 'TypeScript', 'TailwindCSS', 'SvelteKit'],
		Backend: ['Ruby on Rails', 'Sinatra', 'PostgreSQL'],
		'APIs & Integration': ['Google Calendar API', 'OAuth', 'Web Scraping'],
		DevOps: ['Fly.io'],
		Other: ['SEO', 'CLI', 'Open Source']
	};

	// Extract unique stack from projects for filtering
	onMount(() => {
		mounted = true;
	});

	// Filter projects based on search and category filter
	$: filteredProjects = projects.filter((project) => {
		const matchesSearch =
			searchQuery === '' ||
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesCategory =
			selectedCategory === 'all' ||
			(project.stack &&
				project.stack.some((tech) =>
					categories[selectedCategory as keyof typeof categories].includes(tech)
				));

		return matchesSearch && matchesCategory;
	});
</script>

<section in:fade={{ duration: 300 }} class="mx-auto max-w-4xl p-6">
	{#if mounted}
		<div class="mb-8">
			<div class="mb-8 flex items-center gap-2">
				<BackButton href="/" />
				<div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
				<span class="text-sm text-gray-500 dark:text-gray-400">Home</span>
			</div>

			<div
				class="flex flex-col gap-4 sm:flex-row sm:items-center"
				in:fly={{ y: -20, duration: 600 }}
			>
				<div class="relative flex-1">
					<input
						type="text"
						placeholder="Search projects..."
						bind:value={searchQuery}
						class="w-full rounded-lg border border-gray-300 py-2 pr-16 pl-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
					/>
					{#if searchQuery}
						<button
							on:click={() => (searchQuery = '')}
							class="absolute top-2 right-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
							aria-label="Clear search"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}
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

				<div class="relative w-full sm:w-auto">
					<button
						on:click={() => (isFilterOpen = !isFilterOpen)}
						class="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
								/>
							</svg>
							{selectedCategory === 'all' ? 'All Categories' : selectedCategory}
						</div>
						<svg
							class="h-4 w-4 transition-transform {isFilterOpen ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{#if isFilterOpen}
						<div
							class="absolute right-0 left-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white py-2 shadow-lg sm:right-0 sm:left-auto sm:w-48 dark:border-gray-700 dark:bg-gray-800"
							transition:fade={{ duration: 100 }}
						>
							{#each Object.keys(categories) as category}
								<button
									class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 {selectedCategory ===
									(category === 'All' ? 'all' : category)
										? 'bg-gray-100 dark:bg-gray-700'
										: ''}"
									on:click={() => {
										selectedCategory = category === 'All' ? 'all' : category;
										isFilterOpen = false;
									}}
								>
									{category}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
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
						selectedCategory = 'all';
					}}
				>
					Clear filters
				</button>
			</div>
		{/if}
	{/if}
</section>
