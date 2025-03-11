<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Project } from '$lib/types';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	export let projects: Project[] = data.projects;
</script>

<main in:fade={{ duration: 100 }} class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Projects</h1>
	<div class="flex flex-wrap justify-center gap-6">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</main>
