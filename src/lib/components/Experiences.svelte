<script lang="ts">
	import type { Experience } from '#lib/types.js';
	import SectionHeading from './shared/SectionHeading.svelte';

	export let experiences: Experience[] = [];
</script>

<section aria-labelledby="experience-heading">
	<SectionHeading
		id="experience-heading"
		index="03"
		title="Places I've Worked At"
		italicWord="Worked"
		trailing
		meta="Career · {experiences.length} roles"
	/>

	<div>
		{#each experiences as exp, i (i)}
			<div class="relative pb-10 pl-10 last:pb-0">
				<!-- Vertical timeline track — visible vasco line -->
				<div
					class="bg-vasco-200 dark:bg-vasco-900/60 absolute top-4 bottom-0 left-[9px] w-0.5 {i ===
					experiences.length - 1
						? 'hidden'
						: ''}"
					aria-hidden="true"
				></div>

				<!-- Timeline marker: the brand triangle, solid for the current role, outlined for past ones -->
				<svg
					class="absolute top-1 left-0.5 h-5 w-4 bg-white dark:bg-slate-950 {exp.period.includes(
						'Present'
					)
						? 'fill-hoop-500'
						: 'fill-none stroke-slate-900 dark:stroke-white'}"
					viewBox="0 0 268 330"
					stroke-width="28"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M18 316H250L130 32Z" />
				</svg>

				<div class="flex items-start gap-4">
					{#if exp.logo}
						<img
							src={exp.logo}
							alt=""
							class="h-12 w-12 rounded-lg border border-slate-200 bg-white object-contain p-1.5 dark:border-slate-700 dark:bg-slate-800"
							aria-hidden="true"
						/>
					{/if}
					<div class="flex-1">
						<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
							<h3 class="font-display text-xl font-bold text-slate-900 dark:text-white">
								{exp.title}
							</h3>
							<span class="text-vasco-700 dark:text-vasco-300 text-sm font-semibold"
								>@ {exp.company}</span
							>
						</div>
						<p
							class="mt-1 font-mono text-[11px] tracking-wider text-slate-600 uppercase dark:text-slate-400"
						>
							{exp.period}
						</p>
						<p class="mt-3 max-w-prose leading-relaxed text-slate-600 dark:text-slate-300">
							{exp.description}
						</p>
						{#if exp.skills}
							<div class="mt-3 flex flex-wrap gap-1.5">
								{#each exp.skills.slice(0, 4) as skill, j (j)}
									<span
										class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
