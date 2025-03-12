<script lang="ts">
	import type { Project } from '$lib/types';

	export let project: Project;
	const { title, description, images, slug } = project;
</script>

<div
	class="mx-auto max-w-[300px] min-w-[250px] flex-1 rounded-xl bg-stone-50 p-4 transition hover:shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:hover:opacity-90"
>
	<a href={`/projects/${slug}`} class="group block" data-sveltekit-preload-data="hover">
		{#if images && images[0]}
			<img
				src={images[0]}
				alt={title}
				class="mb-3 rounded-lg"
				style="view-transition-name: project-image-{slug}-0"
				loading="lazy"
				decoding="async"
			/>
		{:else}
			<img
				src="/images/placeholder.png"
				alt={title}
				class="mb-3 rounded-lg"
				style="view-transition-name: project-image-{slug}-0"
			/>
		{/if}
		<h3
			class="group-hover:text-vasco-600 text-lg font-semibold"
			style="view-transition-name: project-title-{slug}"
		>
			{title}
		</h3>
		<p
			class="text-sm text-gray-600 dark:text-gray-400"
			style="view-transition-name: project-description-{slug}"
		>
			{description}
		</p>
	</a>
</div>
