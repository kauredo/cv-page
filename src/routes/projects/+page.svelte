<script lang="ts">
	import ProjectCard from '$lib/components/shared/ProjectCard.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import type { Project } from '$lib/types';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let projects: Project[] = data.projects;
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

<section class="mx-auto max-w-6xl px-6 py-12 sm:py-16">
	<div class="mb-14">
		<!-- Masthead-style breadcrumb -->
		<div
			class="mb-10 flex flex-wrap items-center justify-between gap-3 border-t border-b border-slate-900/10 py-2.5 dark:border-white/10"
		>
			<BackButton href="/" text="Home" />
			<span class="eyebrow text-slate-600 dark:text-slate-400">Index / All work</span>
		</div>

		<!-- Editorial heading -->
		<div class="mb-10">
			<div class="flex items-baseline gap-3">
				<span class="eyebrow text-vasco-700 dark:text-vasco-300 shrink-0">∑</span>
				<span class="bg-vasco-500/60 dark:bg-vasco-400/60 h-px w-16 flex-none" aria-hidden="true"
				></span>
			</div>
			<h1
				class="font-display mt-3 text-5xl leading-[0.95] font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
			>
				All <span class="text-vasco-700 dark:text-vasco-300 font-medium italic">work</span><span
					class="text-vasco-600 dark:text-vasco-400">.</span
				>
			</h1>
		</div>

		<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
			<!-- Search input -->
			<div class="relative flex-1">
				<input
					type="text"
					placeholder="Search projects…"
					bind:value={searchQuery}
					class="focus:border-vasco-500 focus:ring-vasco-500/20 w-full rounded-xl border border-slate-300 bg-white py-3 pr-12 pl-4 font-mono text-sm transition-colors placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
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
					class="hover:border-vasco-400 focus-visible:ring-vasco-500/20 focus-visible:border-vasco-500 dark:hover:border-vasco-500/60 flex w-full items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none sm:w-auto dark:border-slate-700 dark:bg-slate-900"
					aria-expanded={isFilterOpen}
					aria-haspopup="listbox"
					aria-controls="filter-listbox"
				>
					<div class="flex items-center gap-3">
						<span
							class="font-mono text-[10px] tracking-wider text-slate-500 uppercase dark:text-slate-500"
						>
							Filter
						</span>
						<span class="font-display text-base font-bold text-slate-900 dark:text-white">
							{selectedCategory === 'all' ? 'All' : selectedCategory}
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
						class="absolute right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:right-0 sm:left-auto sm:w-56 dark:border-slate-700 dark:bg-slate-900"
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
								class="font-display flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-bold transition-colors
										{isSelected
									? 'bg-vasco-50 text-vasco-700 dark:bg-vasco-950/40 dark:text-vasco-300'
									: 'text-slate-900 dark:text-white'}
										{isFocused ? 'bg-slate-100 dark:bg-slate-800' : ''}
										hover:bg-slate-50 dark:hover:bg-slate-800"
								on:click={() => selectCategory(category)}
								role="option"
								aria-selected={isSelected}
								tabindex={isFocused ? 0 : -1}
							>
								{category}
								{#if isSelected}
									<span class="bg-hoop-500 inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true"
									></span>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if filteredProjects.length > 0}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
			{#each filteredProjects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<div class="py-24 text-center">
			<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-4">Empty // 0 results</p>
			<h3 class="font-display text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
				Air ball<span class="text-hoop-500 dark:text-hoop-400">.</span>
			</h3>
			<p class="mt-4 font-mono text-xs tracking-wider text-slate-600 uppercase dark:text-slate-400">
				No projects match your filter
			</p>
			<button
				class="focus-visible:ring-vasco-500 mt-8 inline-flex items-center gap-2 rounded-full border border-slate-900/25 px-6 py-3 font-mono text-xs font-semibold tracking-[0.18em] text-slate-900 uppercase transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:border-slate-900 active:bg-slate-900 active:text-white dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900 dark:active:border-white dark:active:bg-white dark:active:text-slate-900"
				on:click={() => {
					searchQuery = '';
					selectedCategory = 'all';
				}}
			>
				Clear filters
			</button>
		</div>
	{/if}
</section>
