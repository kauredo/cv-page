<script lang="ts">
	import type { Project } from '$lib/types';

	export let project: Project;
	export let small: boolean = false;
	const { title, description, images, slug, stack } = project;
</script>

<article
	class="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-vasco-300 hover:shadow-xl hover:shadow-vasco-500/10 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-vasco-500/50 {small
		? 'w-64'
		: 'w-full'}"
>
	<a href={`/projects/${slug}`} class="block h-full" data-sveltekit-preload-data="hover">
		<div class="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
			{#if images && images[0]}
				<img
					src={images[0]}
					alt={`Screenshot of ${title}`}
					class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					style="view-transition-name: project-image-{slug}-0"
					loading="lazy"
					decoding="async"
				/>
			{:else}
				<img
					src="/images/placeholder.webp"
					alt={`Placeholder for ${title}`}
					class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					style="view-transition-name: project-image-{slug}-0"
					loading="lazy"
				/>
			{/if}

			<!-- Tech stack overlay -->
			{#if stack && stack.length > 0}
				<div class="absolute right-3 bottom-3 flex flex-wrap justify-end gap-1.5">
					{#each stack.slice(0, 2) as tag}
						<span
							class="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200"
						>
							{tag}
						</span>
					{/each}
					{#if stack.length > 2}
						<span
							class="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200"
						>
							+{stack.length - 2}
						</span>
					{/if}
				</div>
			{/if}
		</div>

		<div class="p-5">
			<h3
				class="text-lg font-bold text-slate-900 transition-colors group-hover:text-vasco-600 dark:text-white dark:group-hover:text-vasco-400"
				style="view-transition-name: project-title-{slug}"
			>
				{title}
			</h3>
			<p
				class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
				style="view-transition-name: project-description-{slug}"
			>
				{description}
			</p>

			<div class="mt-4 flex items-center text-sm font-medium text-vasco-600 dark:text-vasco-400">
				<span>View project</span>
				<svg
					class="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
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
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</div>
		</div>
	</a>
</article>
