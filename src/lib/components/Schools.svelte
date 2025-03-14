<script lang="ts">
	import type { Education } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let education: Education[] = [];
</script>

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Where I've Studied</h2>
	<ul class="space-y-4">
		{#each education as edu}
			<li>
				<div class="flex items-center gap-3">
					<h3 class="text-lg font-semibold">{edu.degree}</h3>
					<span class="text-sm text-gray-500">{edu.institution}, {edu.period}</span>
				</div>
				<p class="text-gray-600 dark:text-gray-400">{edu.description}</p>
			</li>
		{/each}
	</ul>
</section>
