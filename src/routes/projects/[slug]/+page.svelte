<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.project.title} — Vasco</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<main class="mx-auto max-w-3xl p-6">
	<h1 class="mb-4 text-3xl font-bold">{data.project.title}</h1>

	<!-- Project Description -->
	<p class="mb-4 text-base text-gray-700 dark:text-gray-400">{data.project.description}</p>

	<!-- Display multiple images if available -->
	{#if data.project.images && data.project.images.length > 0}
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each data.project.images as image}
				<img
					src={image}
					alt={data.project.title}
					class="rounded-xl border border-3 border-gray-200 transition hover:opacity-90 dark:border-gray-800 dark:opacity-70"
				/>
			{/each}
		</div>
	{/if}

	<!-- Project Details -->
	<section class="mb-4">
		<h2 class="mb-2 text-2xl font-semibold">Details</h2>
		<p class="text-gray-700 dark:text-gray-400">{data.project.details}</p>
	</section>

	<!-- Technology Stack -->
	{#if data.project.stack && data.project.stack.length > 0}
		<section class="mb-4">
			<h2 class="mb-2 text-2xl font-semibold">Technology Stack</h2>
			<ul class="flex flex-wrap gap-2">
				{#each data.project.stack as tech}
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
		{#if data.project.github}
			<a
				href={data.project.github}
				target="_blank"
				class="text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
			>
				View on GitHub
			</a>
		{/if}
		{#if data.project.link}
			<a
				href={data.project.link}
				target="_blank"
				class="text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
			>
				Visit Website
			</a>
		{/if}
	</div>
</main>
