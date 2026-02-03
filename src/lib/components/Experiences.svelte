<script lang="ts">
	import type { Experience } from '$lib/types';

	export let experiences: Experience[] = [];
</script>

<section aria-labelledby="experience-heading">
	<h2
		id="experience-heading"
		class="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		Places I've Worked At
	</h2>

	<div class="space-y-0">
		{#each experiences as exp, i}
			<div class="relative pl-8 pb-8 last:pb-0">
				<!-- Timeline line -->
				<div class="absolute top-3 bottom-0 left-[7px] w-px bg-slate-200 dark:bg-slate-700 {i === experiences.length - 1 ? 'hidden' : ''}"></div>

				<!-- Timeline dot -->
				<div class="absolute top-2 left-0 h-3.5 w-3.5 rounded-full border-2 {i === 0 ? 'border-hoop-500 bg-hoop-500' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'}"></div>

				<div class="flex items-start gap-4">
					{#if exp.logo}
						<img src={exp.logo} alt="" class="h-10 w-10 rounded-lg border border-slate-200 bg-white object-contain p-1 dark:border-slate-700 dark:bg-slate-800" aria-hidden="true" />
					{/if}
					<div class="flex-1">
						<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
							<h3 class="font-bold text-slate-900 dark:text-white">{exp.title}</h3>
							<span class="text-sm font-medium text-vasco-600 dark:text-vasco-400">{exp.company}</span>
						</div>
						<p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{exp.period}</p>
						<p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
							{exp.description}
						</p>
						{#if exp.skills}
							<div class="mt-3 flex flex-wrap gap-1.5">
								{#each exp.skills.slice(0, 4) as skill}
									<span
										class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
									>
										{skill}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
