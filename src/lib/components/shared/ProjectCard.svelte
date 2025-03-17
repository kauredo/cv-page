<script lang="ts">
	import type { Project } from '$lib/types';
	import { fly } from 'svelte/transition';

	export let project: Project;
	export let small: boolean = false;
	const { title, description, images, slug, stack } = project;
</script>

<div
	class={`group h-full overflow-hidden rounded-xl bg-white transition-all hover:shadow-xl dark:bg-gray-800 dark:text-gray-200 ${small ? 'w-64' : 'w-full'}`}
>
	<a href={`/projects/${slug}`} class="block h-full" data-sveltekit-preload-data="hover">
		<div class="relative overflow-hidden">
			{#if images && images[0]}
				<picture
					class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
					style="view-transition-name: project-image-{slug}-0"
				>
					<source srcset={images[0]} type="image/webp" />
					<img src={images[0]} alt={title} decoding="async" />
				</picture>
			{:else}
				<img
					src="/images/placeholder.webp"
					alt={title}
					class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
					style="view-transition-name: project-image-{slug}-0"
				/>
			{/if}
			{#if stack && stack.length > 0}
				<div class="absolute right-2 bottom-2 flex flex-wrap justify-end gap-1">
					{#each stack.slice(0, 2) as tag}
						<span
							class="rounded-full border border-gray-300 bg-stone-50 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
							>{tag}</span
						>
					{/each}
					{#if stack.length > 2}
						<span
							class="rounded-full border border-gray-300 bg-stone-50 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
							>+{stack.length - 2}</span
						>
					{/if}
				</div>
			{/if}
		</div>
		<div class="p-4">
			<h3
				class="text-lg font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
				style="view-transition-name: project-title-{slug}"
			>
				{title}
			</h3>
			<p
				class="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400"
				style="view-transition-name: project-description-{slug}"
			>
				{description}
			</p>

			<div class="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
				<span>View project</span>
				<svg
					class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</div>
		</div>
	</a>
</div>
