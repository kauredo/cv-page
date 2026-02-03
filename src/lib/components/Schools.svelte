<script lang="ts">
	import type { Education } from '$lib/types';

	export let education: Education[] = [];
</script>

<section aria-labelledby="education-heading">
	<h2
		id="education-heading"
		class="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		Where I've Studied
	</h2>
	<div class="grid gap-6 sm:grid-cols-2">
		{#each education as edu}
			<div class="rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
				<h3 class="font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
				<p class="mt-1 text-sm font-medium text-vasco-600 dark:text-vasco-400">
					{edu.institution}
				</p>
				<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{edu.period}</p>
				<p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
					{edu.description}
				</p>
			</div>
		{/each}
	</div>
</section>
