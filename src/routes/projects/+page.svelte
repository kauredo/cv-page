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

	onMount(() => {
		mounted = true;
	});
</script>

<main in:fade={{ duration: 100 }} class="mx-auto max-w-4xl p-6">
	{#if mounted}
		<div class="flex items-center gap-2">
			<BackButton href="/" />
			<div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
			<span class="text-sm text-gray-500 dark:text-gray-400">Home</span>
		</div>
		<h1 class="my-4 text-4xl font-bold" in:fly={{ y: -20, duration: 600 }}>Projects</h1>
		<div class="flex flex-wrap justify-center gap-6" in:fly={{ y: 20, duration: 600 }}>
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}
</main>
