<script lang="ts">
	import type { Project } from '$lib/types';

	export let project: Project;
	export let small: boolean = false;
	const { title, description, images, slug, stack } = project;
</script>

<article
	class="group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-[transform,border-color,box-shadow] duration-300 focus-within:border-slate-900/40 focus-within:shadow-xl focus-within:shadow-slate-900/5 hover:-translate-y-1 hover:border-slate-900/40 hover:shadow-xl hover:shadow-slate-900/5 active:-translate-y-1 active:border-slate-900/40 active:shadow-xl active:shadow-slate-900/5 motion-reduce:transform-none dark:border-slate-800 dark:bg-slate-900 dark:focus-within:border-white/30 dark:hover:border-white/30 dark:hover:shadow-slate-900/50 dark:active:border-white/30 {small
		? 'w-64'
		: 'w-full'}"
>
	<!-- Hoop-orange accent bar that appears on hover -->
	<span
		class="bg-hoop-500 absolute top-0 left-0 z-10 h-1 w-0 transition-all duration-500 group-hover:w-full group-active:w-full"
		aria-hidden="true"
	></span>

	<a
		href={`/projects/${slug}`}
		class="flex h-full flex-col rounded-xl focus-visible:outline-none"
		data-sveltekit-preload-data="hover"
	>
		<div class="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
			{#if images && images[0]}
				<img
					src={images[0]}
					alt={`Screenshot of ${title}`}
					class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] group-active:scale-[1.04] motion-reduce:transform-none"
					style="view-transition-name: project-image-{slug}-0"
					loading="lazy"
					decoding="async"
					width="640"
					height="360"
				/>
			{:else}
				<img
					src="/images/placeholder.webp"
					alt={`Placeholder for ${title}`}
					class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] group-active:scale-[1.04] motion-reduce:transform-none"
					style="view-transition-name: project-image-{slug}-0"
					loading="lazy"
					width="640"
					height="360"
				/>
			{/if}

			<!-- Hover overlay arrow chip -->
			<div
				class="absolute top-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100 motion-reduce:transform-none"
			>
				<span
					class="bg-hoop-500 inline-flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg"
				>
					<svg
						class="h-3.5 w-3.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.4"
							d="M7 17L17 7M17 7H8M17 7v9"
						/>
					</svg>
				</span>
			</div>
		</div>

		<div class="flex flex-1 flex-col p-5">
			<h3
				class="font-display group-hover:text-hoop-600 group-active:text-hoop-600 dark:group-hover:text-hoop-400 dark:group-active:text-hoop-400 text-xl font-bold text-slate-900 transition-colors dark:text-white"
				style="view-transition-name: project-title-{slug}"
			>
				{title}
			</h3>
			<p
				class="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
				style="view-transition-name: project-description-{slug}"
			>
				{description}
			</p>
			{#if stack && stack.length > 0}
				<p
					class="mt-4 font-mono text-[11px] tracking-wider text-slate-600 uppercase dark:text-slate-400"
				>
					{stack.slice(0, 3).join(' / ')}
				</p>
			{/if}
		</div>
	</a>
</article>
