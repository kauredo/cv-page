<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/components/Modal.svelte';

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
	<title>{project.title} — Vasco</title>
	<meta name="description" content={project.description} />
</svelte:head>

<section in:fade={{ duration: 100 }} class="mx-auto max-w-3xl p-6">
	<h1 class="mb-4 text-3xl font-bold" style="view-transition-name: project-title-{project.slug}">
		{project.title}
	</h1>

	<!-- Project Description -->
	<p
		class="mb-4 text-base text-gray-700 dark:text-gray-400"
		style="view-transition-name: project-description-{project.slug}"
	>
		{project.description}
	</p>

	<!-- Display multiple images if available -->
	{#if project.images && project.images.length > 0}
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each project.images as image, i}
				<button class="rounded-xl" on:click={() => openModal(image)}>
					<img
						src={image}
						style="view-transition-name: project-image-{project.slug}-{i}"
						alt={project.title}
						class="aspect-3/2 w-full cursor-pointer rounded-xl border border-3 border-gray-200 object-cover object-top transition hover:opacity-90 dark:border-gray-800 dark:opacity-70"
					/>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Project Details -->
	<section class="mb-4">
		<h2 class="mb-2 text-2xl font-semibold">Details</h2>
		<p class="text-gray-700 dark:text-gray-400">{project.details}</p>
	</section>

	<!-- Technology Stack -->
	{#if project.stack && project.stack.length > 0}
		<section class="mb-4">
			<h2 class="mb-2 text-2xl font-semibold">Technology Stack</h2>
			<ul class="flex flex-wrap gap-2">
				{#each project.stack as tech}
					<li
						class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700 dark:bg-gray-400 dark:text-gray-800"
					>
						{tech}
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Links -->
	<div class="flex gap-4">
		{#if project.github}
			<a
				href={project.github}
				target="_blank"
				class="text-vasco-600 hover:text-vasco-500 dark:text-vasco-400 dark:hover:text-vasco-300 underline"
			>
				View on GitHub
			</a>
		{/if}
		{#if project.link}
			<a
				href={project.link}
				target="_blank"
				class="text-vasco-600 hover:text-vasco-500 dark:text-vasco-400 dark:hover:text-vasco-300 underline"
			>
				Visit Website
			</a>
		{/if}
	</div>
</section>

<!-- Modal Component -->
<Modal
	images={project.images}
	isOpen={selectedImage !== null}
	imageSrc={selectedImage ?? ''}
	altText={project.title}
	{closeModal}
/>
