<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Project } from '$lib/types';

	export let project: Project;
	const { title, description, images, link, slug } = project;
</script>

<div
	class="max-w-[300px] min-w-[250px] flex-1 rounded-2xl bg-white p-4 shadow transition hover:shadow-lg dark:bg-gray-900 dark:text-gray-200"
	in:fade
>
	<a href={`/projects/${slug}`}>
		{#if images && images.length > 0}
			<img
				src={images[0]}
				alt={title}
				class="mb-4 rounded-xl transition hover:opacity-90 dark:opacity-70"
			/>
		{/if}
		<h2 class="mb-1 text-xl font-semibold hover:underline">{title}</h2>
	</a>
	<p class="mb-2 text-sm text-gray-600">{description}</p>
	{#if link}
		<a
			href={link}
			target="_blank"
			class="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path d="M14 3h7v7M10 14L21 3M5 5l14 14" />
			</svg>
			External Link
		</a>
	{/if}
</div>
