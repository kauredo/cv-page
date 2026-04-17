<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types';
	import Modal from '$lib/components/shared/Modal.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import Button from '$lib/components/shared/Button.svelte';

	export let data: PageData;
	export let project: Project = data.project;
	let selectedImage: string | null = null;

	function openModal(image: string) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vascokf.com/' },
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Projects',
				item: 'https://www.vascokf.com/projects'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: project.title,
				item: 'https://www.vascokf.com/projects/' + project.slug
			}
		]
	})}</script>`}
</svelte:head>

<article class="mx-auto max-w-5xl px-6 py-12 sm:py-16">
	<!-- Masthead breadcrumb -->
	<div
		class="mb-12 flex flex-wrap items-center justify-between gap-3 border-t border-b border-slate-900/10 py-2.5 dark:border-white/10"
	>
		<BackButton href="/projects" text="Projects" />
		<span class="eyebrow text-slate-600 dark:text-slate-400">Case study</span>
	</div>

	<!-- Editorial header -->
	<header class="mb-12">
		<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-6">Project / {project.slug}</p>

		<h1
			class="font-display text-4xl leading-[0.95] font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
			style="view-transition-name: project-title-{project.slug}"
		>
			{project.title}<span class="text-hoop-500 dark:text-hoop-400">.</span>
		</h1>

		<p
			class="mt-6 max-w-3xl text-xl leading-relaxed text-slate-700 sm:text-2xl dark:text-slate-200"
			style="view-transition-name: project-description-{project.slug}"
		>
			{project.description}
		</p>
	</header>

	<!-- Featured image -->
	{#if project.images.length > 0}
		<div class="mb-16">
			<button
				class="group focus-visible:ring-hoop-500 block w-full overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none active:shadow-2xl dark:focus-visible:ring-offset-slate-950"
				on:click={() => openModal(project.images[0])}
			>
				<img
					src={project.images[0]}
					style="view-transition-name: project-image-{project.slug}-0"
					alt={project.title}
					class="aspect-video w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] group-active:scale-[1.02] motion-reduce:transform-none"
					width="1024"
					height="576"
				/>
			</button>
		</div>
	{/if}

	<!-- Body grid -->
	<div class="grid gap-10 md:grid-cols-12 md:gap-12">
		<!-- Main column -->
		<div class="md:col-span-8">
			<section class="mb-14">
				<div class="mb-6 flex items-baseline gap-3">
					<span class="eyebrow text-vasco-700 dark:text-vasco-300 shrink-0">01</span>
					<span class="bg-vasco-500/60 dark:bg-vasco-400/60 h-px w-12 flex-none" aria-hidden="true"
					></span>
					<span class="eyebrow text-slate-600 dark:text-slate-400">Overview</span>
				</div>
				<p class="max-w-prose text-lg leading-relaxed text-slate-700 dark:text-slate-300">
					{project.details}
				</p>
			</section>

			<!-- Gallery -->
			{#if project.images && project.images.length > 1}
				<section>
					<div class="mb-6 flex items-baseline gap-3">
						<span class="eyebrow text-vasco-700 dark:text-vasco-300 shrink-0">02</span>
						<span
							class="bg-vasco-500/60 dark:bg-vasco-400/60 h-px w-12 flex-none"
							aria-hidden="true"
						></span>
						<span class="eyebrow text-slate-600 dark:text-slate-400">Gallery</span>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						{#each project.images.slice(1) as image, i}
							<button
								class="group focus-visible:ring-hoop-500 block overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none active:shadow-xl dark:focus-visible:ring-offset-slate-950"
								on:click={() => openModal(image)}
							>
								<img
									src={image}
									style="view-transition-name: project-image-{project.slug}-{i + 1}"
									alt={`${project.title} screenshot ${i + 1}`}
									class="aspect-video w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] group-active:scale-[1.04] motion-reduce:transform-none"
									width="512"
									height="288"
									loading="lazy"
								/>
							</button>
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<!-- Sidebar -->
		<aside class="md:sticky md:top-24 md:col-span-4 md:self-start" aria-label="Project meta">
			<div
				class="space-y-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/60"
			>
				<!-- Tech stack -->
				{#if project.stack && project.stack.length > 0}
					<div>
						<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-3">Tech stack</p>
						<ul class="flex flex-wrap gap-1.5">
							{#each project.stack as tech}
								<li
									class="rounded-md border border-slate-300 bg-white px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
								>
									{tech}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Links -->
				<div>
					<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-3">Links</p>
					<div class="flex flex-col gap-3">
						{#if project.link}
							<Button href={project.link} type="primary" target_blank>
								<span class="flex items-center gap-2">
									Visit live site
									<span aria-hidden="true">↗</span>
								</span>
							</Button>
						{/if}
						{#if project.github}
							<Button href={project.github} type="secondary" target_blank>
								<span class="flex items-center gap-2">
									GitHub repo
									<span aria-hidden="true">↗</span>
								</span>
							</Button>
						{/if}
					</div>
				</div>
			</div>

			<p class="mt-6 font-mono text-[10px] leading-relaxed text-slate-600 dark:text-slate-400">
				Fig. — Case study sheet. <br />
				Tap any image to enlarge.
			</p>
		</aside>
	</div>
</article>

<!-- Modal -->
<Modal
	images={project.images}
	isOpen={selectedImage !== null}
	imageSrc={selectedImage ?? ''}
	altText={project.title}
	{closeModal}
/>
