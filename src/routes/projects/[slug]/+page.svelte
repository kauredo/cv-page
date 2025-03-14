<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import Modal from '$lib/components/shared/Modal.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let project: Project = data.project;
	let selectedImage: string | null = null;
	let imagesLoaded = false;
	let mounted = false;

	function openModal(image: string) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}

	onMount(() => {
		if (project.images.length > 0) {
			// Create an array to track loaded images
			const imagePromises = project.images.map((src) => {
				return new Promise<void>((resolve) => {
					const img = new Image();
					img.onload = () => resolve();
					img.onerror = () => resolve(); // Handle errors gracefully
					img.src = src;
				});
			});

			// When all images are loaded, set imagesLoaded to true
			Promise.all(imagePromises).then(() => {
				imagesLoaded = true;
			});
		} else {
			imagesLoaded = true;
		}
		mounted = true;
	});
</script>

<section in:fade={{ duration: 300 }} class="mx-auto max-w-4xl p-6">
	{#if mounted}
		<div class="mb-8">
			<div class="flex items-center gap-2">
				<BackButton href="/projects" />
				<div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
				<span class="text-sm text-gray-500 dark:text-gray-400">Projects</span>
			</div>

			<h1
				class="mt-4 text-4xl font-bold"
				style="view-transition-name: project-title-{project.slug}"
				in:fly={{ y: -20, duration: 400 }}
			>
				{project.title}
			</h1>

			<!-- Project Description -->
			<p
				class="mt-4 text-lg text-gray-700 dark:text-gray-400"
				style="view-transition-name: project-description-{project.slug}"
				in:fly={{ y: -20, duration: 400, delay: 100 }}
			>
				{project.description}
			</p>

			<!-- Quick Stats -->
			{#if project.stack && project.stack.length > 0}
				<div class="mt-6 flex flex-wrap gap-4" in:fly={{ y: -20, duration: 400, delay: 200 }}>
					<div class="flex items-center gap-2">
						<span class="text-sm font-semibold">Tech Stack:</span>
						<div class="flex flex-wrap gap-2">
							{#each project.stack.slice(0, 3) as tech}
								<span
									class="rounded-full bg-stone-50 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
								>
									{tech}
								</span>
							{/each}
							{#if project.stack.length > 3}
								<span
									class="rounded-full bg-stone-50 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
								>
									+{project.stack.length - 3} more
								</span>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Display Featured Image -->
		{#if project.images.length > 0 && imagesLoaded}
			<div class="mb-12" in:fade={{ duration: 400, delay: 300 }}>
				<button
					class="w-full overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl"
					on:click={() => openModal(project.images[0])}
				>
					<img
						src={project.images[0]}
						style="view-transition-name: project-image-{project.slug}-0"
						alt={project.title}
						class="aspect-video w-full object-cover object-top transition hover:opacity-95 dark:opacity-90 dark:hover:opacity-100"
					/>
				</button>
			</div>
		{/if}

		<!-- Project Details -->
		<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
			<div class="col-span-1 md:col-span-2">
				<section class="mb-10" in:fly={{ y: 20, duration: 400, delay: 400 }}>
					<h2 class="mb-4 text-2xl font-semibold">Overview</h2>
					<p class="leading-relaxed text-gray-700 dark:text-gray-400">{project.details}</p>
				</section>

				<!-- Additional Images in a grid -->
				{#if project.images && project.images.length > 1 && imagesLoaded}
					<section class="mb-10" in:fade={{ duration: 400, delay: 500 }}>
						<h2 class="mb-4 text-2xl font-semibold">Gallery</h2>
						<div class="grid grid-cols-2 gap-4">
							{#each project.images.slice(1) as image, i}
								<button
									class="overflow-hidden rounded-lg shadow-md transition hover:shadow-lg"
									on:click={() => openModal(image)}
								>
									<img
										src={image}
										style="view-transition-name: project-image-{project.slug}-{i + 1}"
										alt={`${project.title} screenshot ${i + 1}`}
										class="aspect-video w-full object-cover object-top transition hover:opacity-90 dark:opacity-80 dark:hover:opacity-100"
									/>
								</button>
							{/each}
						</div>
					</section>
				{/if}
			</div>

			<div class="col-span-1">
				<!-- Technology Stack -->
				{#if project.stack && project.stack.length > 0}
					<section
						class="mb-8 rounded-xl bg-gray-50 p-6 dark:bg-gray-800"
						in:fly={{ y: 20, duration: 400, delay: 600 }}
					>
						<h2 class="mb-4 text-xl font-semibold">Technology Stack</h2>
						<ul class="flex flex-wrap gap-2">
							{#each project.stack as tech}
								<li
									class="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:bg-gray-700 dark:text-gray-300"
								>
									{tech}
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Links -->
				<section
					class="mb-8 rounded-xl bg-gray-50 p-6 dark:bg-gray-800"
					in:fly={{ y: 20, duration: 400, delay: 700 }}
				>
					<h2 class="mb-4 text-xl font-semibold">Project Links</h2>
					<div class="flex flex-col gap-3">
						{#if project.github}
							<Button href={project.github} type="secondary" target_blank>
								<span class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-github"
										><path
											d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
										/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
									>
									GitHub Repository
								</span>
							</Button>
						{/if}
						{#if project.link}
							<Button href={project.link} type="primary" target_blank>
								<span class="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-globe"
										><circle cx="12" cy="12" r="10" /><path
											d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
										/><path d="M2 12h20" /></svg
									>
									Visit Live Site
								</span>
							</Button>
						{/if}
					</div>
				</section>
			</div>
		</div>
	{/if}
</section>

<!-- Modal Component -->
<Modal
	images={project.images}
	isOpen={selectedImage !== null}
	imageSrc={selectedImage ?? ''}
	altText={project.title}
	{closeModal}
/>
