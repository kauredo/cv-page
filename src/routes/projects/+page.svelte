<script lang="ts">
	import ProjectCard from '$lib/components/shared/ProjectCard.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import type { Project } from '$lib/types';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let projects: Project[] = data.projects;
	let mounted = false;
	let searchQuery = '';
	let isFilterOpen = false;
	let selectedCategory = 'all';
	let focusedIndex = -1;
	let filterButtonRef: HTMLButtonElement;
	let dropdownRef: HTMLDivElement;

	const categories = {
		All: 'all',
		Frontend: ['React', 'TypeScript', 'TailwindCSS', 'SvelteKit'],
		Backend: ['Ruby on Rails', 'Sinatra', 'PostgreSQL'],
		'APIs & Integration': ['Google Calendar API', 'OAuth', 'Web Scraping'],
		DevOps: ['Fly.io'],
		Other: ['SEO', 'CLI', 'Open Source']
	};

	const categoryKeys = Object.keys(categories);

	onMount(() => {
		mounted = true;

		// Close dropdown when clicking outside
		function handleClickOutside(event: MouseEvent) {
			if (
				isFilterOpen &&
				dropdownRef &&
				!dropdownRef.contains(event.target as Node) &&
				!filterButtonRef.contains(event.target as Node)
			) {
				isFilterOpen = false;
				focusedIndex = -1;
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function handleFilterKeydown(event: KeyboardEvent) {
		if (!isFilterOpen) {
			if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
				event.preventDefault();
				isFilterOpen = true;
				focusedIndex = 0;
			}
			return;
		}

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				isFilterOpen = false;
				focusedIndex = -1;
				filterButtonRef?.focus();
				break;
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % categoryKeys.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = focusedIndex <= 0 ? categoryKeys.length - 1 : focusedIndex - 1;
				break;
			case 'Home':
				event.preventDefault();
				focusedIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				focusedIndex = categoryKeys.length - 1;
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (focusedIndex >= 0) {
					const category = categoryKeys[focusedIndex];
					selectedCategory = category === 'All' ? 'all' : category;
					isFilterOpen = false;
					focusedIndex = -1;
					filterButtonRef?.focus();
				}
				break;
			case 'Tab':
				isFilterOpen = false;
				focusedIndex = -1;
				break;
		}
	}

	function selectCategory(category: string) {
		selectedCategory = category === 'All' ? 'all' : category;
		isFilterOpen = false;
		focusedIndex = -1;
	}

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

<section class="mx-auto max-w-6xl px-6 py-12">
	{#if mounted}
		<div class="mb-12">
			<div class="mb-8 flex items-center gap-3">
				<BackButton href="/" />
				<div class="h-5 w-px bg-slate-300 dark:bg-slate-600"></div>
				<span class="text-sm font-medium text-slate-500 dark:text-slate-400">Home</span>
			</div>

			<h1 class="mb-8 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
				All Projects
			</h1>

			<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
				<!-- Search input -->
				<div class="relative flex-1">
					<input
						type="text"
						placeholder="Search projects..."
						bind:value={searchQuery}
						class="w-full rounded-lg border-2 border-slate-200 bg-white py-3 pr-12 pl-4 text-sm transition-colors focus:border-vasco-500 focus:ring-0 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
					/>
					{#if searchQuery}
						<button
							on:click={() => (searchQuery = '')}
							class="absolute top-3.5 right-10 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
							aria-label="Clear search"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
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
						class="absolute top-3.5 right-4 h-5 w-5 text-slate-400"
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>

				<!-- Filter dropdown with keyboard navigation -->
				<div class="relative w-full sm:w-auto">
					<button
						bind:this={filterButtonRef}
						on:click={() => {
							isFilterOpen = !isFilterOpen;
							if (isFilterOpen) focusedIndex = 0;
						}}
						on:keydown={handleFilterKeydown}
						class="flex w-full items-center justify-between gap-3 rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-slate-300 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
						aria-expanded={isFilterOpen}
						aria-haspopup="listbox"
						aria-controls="filter-listbox"
					>
						<div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-slate-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
								/>
							</svg>
							<span class="text-slate-700 dark:text-slate-200">
								{selectedCategory === 'all' ? 'All Categories' : selectedCategory}
							</span>
						</div>
						<svg
							class="h-4 w-4 text-slate-500 transition-transform {isFilterOpen ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
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
							bind:this={dropdownRef}
							id="filter-listbox"
							class="absolute right-0 left-0 z-50 mt-2 overflow-hidden rounded-lg border-2 border-slate-200 bg-white shadow-xl sm:right-0 sm:left-auto sm:w-52 dark:border-slate-700 dark:bg-slate-800"
							transition:fade={{ duration: 150 }}
							role="listbox"
							tabindex="-1"
							aria-label="Filter by category"
							on:keydown={handleFilterKeydown}
						>
							{#each categoryKeys as category, index}
								{@const isSelected = selectedCategory === (category === 'All' ? 'all' : category)}
								{@const isFocused = focusedIndex === index}
								<button
									class="w-full px-4 py-3 text-left text-sm font-medium transition-colors
										{isSelected ? 'bg-vasco-50 text-vasco-700 dark:bg-vasco-900/30 dark:text-vasco-300' : 'text-slate-700 dark:text-slate-200'}
										{isFocused ? 'bg-slate-100 dark:bg-slate-700' : ''}
										hover:bg-slate-50 dark:hover:bg-slate-700"
									on:click={() => selectCategory(category)}
									role="option"
									aria-selected={isSelected}
									tabindex={isFocused ? 0 : -1}
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
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects as project (project.slug)}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<div class="py-24 text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-slate-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">No projects found</h3>
				<p class="mb-6 text-slate-600 dark:text-slate-400">
					Try adjusting your search or filter criteria
				</p>
				<button
					class="rounded-lg bg-vasco-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-vasco-700 dark:bg-vasco-500 dark:hover:bg-vasco-600"
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
