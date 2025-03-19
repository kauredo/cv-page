<script lang="ts">
	import type { Experience } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	export let experiences: Experience[] = [];
	let visibleItems: Record<number, boolean> = {};

	function handleIntersect(index: number) {
		return (event: CustomEvent<{ entry: IntersectionObserverEntry }>) => {
			const { isIntersecting } = event.detail.entry;
			if (isIntersecting) {
				visibleItems[index] = true;
			}
		};
	}
	const cardHeight = 310;
</script>

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-12 border-b pb-2 text-2xl font-bold">Places I've Worked At</h2>

	<!-- Desktop timeline (hidden on mobile) -->
	<div
		class="relative mx-auto hidden md:block"
		style="min-height: {experiences.length * cardHeight}px"
	>
		<!-- Timeline center line -->
		<div class="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-gray-300 dark:bg-gray-700"></div>

		{#each experiences as exp, index}
			<div
				class="absolute w-full"
				style="top: {index * cardHeight}px"
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				<!-- Timeline dot -->
				<div class="absolute left-1/2 z-10 -translate-x-1/2">
					<div
						class="h-5 w-5 rounded-full border-4 border-white bg-blue-500 dark:border-gray-900"
					></div>
				</div>

				<!-- Single container with alternating sides -->
				{#if visibleItems[index]}
					<div class="flex w-full items-center justify-center">
						<div
							class="w-[48%] {index % 2 === 0 ? 'mr-auto pr-2' : 'ml-auto pl-2'}"
							in:fly={{ duration: 500, x: index % 2 === 0 ? -30 : 30, delay: 200 }}
						>
							<!-- Period at the top of each card -->
							<div
								class="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400 {index % 2 === 0
									? 'text-right'
									: 'text-left'}"
							>
								{exp.period}
							</div>
							<!-- Card content -->
							<div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
								<div class="mb-2 flex items-center gap-3">
									{#if exp.logo}
										<img src={exp.logo} alt={`${exp.company} logo`} class="h-8 w-8" />
									{/if}
									<h3 class="text-xl font-semibold">{exp.title}</h3>
								</div>
								<p class="mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">
									{exp.company}
								</p>
								<p class="text-gray-700 dark:text-gray-300">{exp.description}</p>
								{#if exp.achievements}
									<div class="mt-4">
										<h4 class="mb-2 font-medium">Key Achievements:</h4>
										<ul class="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
											{#each exp.achievements as achievement}
												<li>{achievement}</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if exp.skills}
									<div class="mt-4 flex flex-wrap gap-2">
										{#each exp.skills as skill}
											<span class="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700"
												>{skill}</span
											>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Mobile timeline (hidden on desktop) -->
	<div class="relative mx-auto md:hidden">
		<!-- Left-aligned timeline line -->
		<div class="absolute left-4 h-full w-1 -translate-x-1/2 bg-gray-300 dark:bg-gray-700"></div>

		{#each experiences as exp, index}
			<div
				class="relative mb-12 pl-12"
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				<!-- Timeline dot - positioned on the left line -->
				<div class="absolute top-0 left-4 z-10 -translate-x-1/2">
					<div
						class="h-5 w-5 rounded-full border-4 border-white bg-blue-500 dark:border-gray-900"
					></div>
				</div>

				<!-- Date marker on top -->
				<div class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
					{exp.period}
				</div>

				<!-- Content card -->
				{#if visibleItems[index]}
					<div in:fly={{ duration: 500, y: 20, delay: 200 }}>
						<div class="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
							<div class="mb-2 flex items-center gap-2">
								{#if exp.logo}
									<img src={exp.logo} alt={`${exp.company} logo`} class="h-6 w-6" />
								{/if}
								<h3 class="text-lg font-semibold">{exp.title}</h3>
							</div>
							<p class="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
								{exp.company}
							</p>
							<p class="text-sm text-gray-700 dark:text-gray-300">{exp.description}</p>

							{#if exp.achievements}
								<div class="mt-3">
									<h4 class="mb-1 text-sm font-medium">Key Achievements:</h4>
									<ul class="list-disc pl-4 text-xs text-gray-600 dark:text-gray-400">
										{#each exp.achievements as achievement}
											<li class="mb-1">{achievement}</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if exp.skills}
								<div class="mt-3 flex flex-wrap gap-1">
									{#each exp.skills as skill}
										<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700"
											>{skill}</span
										>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
