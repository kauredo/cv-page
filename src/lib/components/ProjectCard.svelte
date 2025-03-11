<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Project } from '$lib/types';

	export let project: Project;
	const { title, description, images, slug } = project;
</script>

<div
	class="max-w-[300px] min-w-[250px] flex-1 rounded-xl bg-white p-4 transition hover:shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:hover:opacity-90"
>
	<a href={`/projects/${slug}`} class="group block">
		{#if images && images[0]}
			<img src={images[0]} alt={title} class="mb-3 rounded-lg" />
		{:else}
			<img src="/images/placeholder.png" alt={title} class="mb-3 rounded-lg" />
		{/if}
		<h3 class="group-hover:text-vasco-600 text-lg font-semibold">{title}</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400">{description}</p>
	</a>
</div>
