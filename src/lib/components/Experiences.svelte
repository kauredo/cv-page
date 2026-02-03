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
</script>

<section in:fade={{ duration: 200 }} aria-labelledby="experience-heading">
	<h2
		id="experience-heading"
		class="mb-12 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		Places I've Worked At
	</h2>

	<!-- Desktop timeline (hidden on mobile) -->
	<div class="relative hidden md:block">
		<!-- Timeline center line -->
		<div
			class="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-vasco-400 via-vasco-300 to-transparent"
		></div>

		<div class="space-y-16">
			{#each experiences as exp, index}
				<div
					class="relative"
					use:inview={{ rootMargin: '0px', threshold: 0.2 }}
					on:inview_change={handleIntersect(index)}
				>
					<!-- Timeline dot -->
					<div class="absolute left-1/2 z-10 -translate-x-1/2">
						<div
							class="h-4 w-4 rounded-full border-4 border-white bg-vasco-500 shadow-md dark:border-slate-900"
						></div>
					</div>

					{#if visibleItems[index]}
						<div class="flex w-full items-start justify-center gap-8">
							<div
								class="w-[45%] {index % 2 === 0 ? 'text-right' : 'order-2 text-left'}"
								in:fly={{ duration: 500, x: index % 2 === 0 ? -30 : 30, delay: 100 }}
							>
								<!-- Period badge -->
								<span
									class="mb-3 inline-block rounded-full bg-vasco-100 px-3 py-1 text-xs font-semibold text-vasco-700 dark:bg-vasco-900/30 dark:text-vasco-300"
								>
									{exp.period}
								</span>

								<!-- Card content - simplified without heavy shadows -->
								<div
									class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
								>
									<div
										class="mb-3 flex items-center gap-3 {index % 2 === 0
											? 'flex-row-reverse'
											: 'flex-row'}"
									>
										{#if exp.logo}
											<img src={exp.logo} alt="" class="h-10 w-10 rounded-lg" aria-hidden="true" />
										{/if}
										<div class={index % 2 === 0 ? 'text-right' : 'text-left'}>
											<h3 class="text-lg font-bold text-slate-900 dark:text-white">{exp.title}</h3>
											<p class="text-sm font-medium text-vasco-600 dark:text-vasco-400">
												{exp.company}
											</p>
										</div>
									</div>
									<p
										class="text-sm leading-relaxed text-slate-600 dark:text-slate-300 {index % 2 ===
										0
											? 'text-right'
											: 'text-left'}"
									>
										{exp.description}
									</p>
									{#if exp.skills}
										<div
											class="mt-4 flex flex-wrap gap-2 {index % 2 === 0
												? 'justify-end'
												: 'justify-start'}"
										>
											{#each exp.skills.slice(0, 4) as skill}
												<span
													class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
												>
													{skill}
												</span>
											{/each}
										</div>
									{/if}
								</div>
							</div>

							<!-- Spacer for the other side -->
							<div class="w-[45%] {index % 2 === 0 ? 'order-2' : ''}"></div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Mobile timeline (hidden on desktop) -->
	<div class="relative md:hidden">
		<!-- Left-aligned timeline line -->
		<div
			class="absolute left-2 h-full w-0.5 bg-gradient-to-b from-vasco-400 via-vasco-300 to-transparent"
		></div>

		<div class="space-y-8">
			{#each experiences as exp, index}
				<div
					class="relative pl-10"
					use:inview={{ rootMargin: '0px', threshold: 0.2 }}
					on:inview_change={handleIntersect(index)}
				>
					<!-- Timeline dot -->
					<div class="absolute left-0 z-10">
						<div
							class="h-4 w-4 rounded-full border-4 border-white bg-vasco-500 shadow-md dark:border-slate-900"
						></div>
					</div>

					{#if visibleItems[index]}
						<div in:fly={{ duration: 500, y: 20, delay: 100 }}>
							<!-- Period badge -->
							<span
								class="mb-3 inline-block rounded-full bg-vasco-100 px-3 py-1 text-xs font-semibold text-vasco-700 dark:bg-vasco-900/30 dark:text-vasco-300"
							>
								{exp.period}
							</span>

							<!-- Card content -->
							<div
								class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
							>
								<div class="mb-3 flex items-center gap-3">
									{#if exp.logo}
										<img src={exp.logo} alt="" class="h-8 w-8 rounded-lg" aria-hidden="true" />
									{/if}
									<div>
										<h3 class="font-bold text-slate-900 dark:text-white">{exp.title}</h3>
										<p class="text-sm font-medium text-vasco-600 dark:text-vasco-400">
											{exp.company}
										</p>
									</div>
								</div>
								<p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
									{exp.description}
								</p>
								{#if exp.skills}
									<div class="mt-4 flex flex-wrap gap-2">
										{#each exp.skills.slice(0, 3) as skill}
											<span
												class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
											>
												{skill}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
