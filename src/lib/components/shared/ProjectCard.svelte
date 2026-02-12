<script lang="ts">
	import type { Project } from '$lib/types';

	export let project: Project;
	export let small: boolean = false;
	const { title, description, images, slug, stack } = project;
</script>

<article
	class="group h-full overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:shadow-slate-900/50 {small
		? 'w-64'
		: 'w-full'}"
>
	<a href={`/projects/${slug}`} class="flex h-full flex-col" data-sveltekit-preload-data="hover">
		<div class="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
			{#if images && images[0]}
				<img
					src={images[0]}
					alt={`Screenshot of ${title}`}
					class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
					style="view-transition-name: project-image-{slug}-0"
					loading="lazy"
					decoding="async"
				/>
			{:else}
				<img
					src="/images/placeholder.webp"
					alt={`Placeholder for ${title}`}
					class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
					style="view-transition-name: project-image-{slug}-0"
					loading="lazy"
				/>
			{/if}
			<!-- Hover overlay with arrow -->
			<div
				class="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/40"
			>
				<div
					class="translate-y-2 rounded-full bg-white p-3 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-800"
				>
					<svg
						class="text-hoop-500 h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</div>
			</div>
		</div>

		<div class="flex flex-1 flex-col p-4">
			<h3
				class="group-hover:text-hoop-600 dark:group-hover:text-hoop-400 font-semibold text-slate-900 transition-colors dark:text-white"
				style="view-transition-name: project-title-{slug}"
			>
				{title}
			</h3>
			<p
				class="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
				style="view-transition-name: project-description-{slug}"
			>
				{description}
			</p>
			{#if stack && stack.length > 0}
				<p class="mt-3 text-xs font-medium text-slate-500 dark:text-slate-500">
					{stack.slice(0, 3).join(' · ')}
				</p>
			{/if}
		</div>
	</a>
</article>
