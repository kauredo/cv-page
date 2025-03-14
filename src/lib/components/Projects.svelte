<script lang="ts">
	import type { Project } from '$lib/types';
	import { fade } from 'svelte/transition';
	import ProjectCard from './shared/ProjectCard.svelte';

	export let projects: Project[];
</script>

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I've Been Building</h2>
	<div class="flex justify-center gap-6">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
	<a href="/projects" class="text-vasco-600 mt-4 block hover:underline">See all my projects →</a>
</section>
