<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-3xl font-bold">Projects</h1>
	<div class="flex flex-wrap gap-6">
		{#each data.projects as project}
			<ProjectCard {...project} />
		{/each}
	</div>
</main>
