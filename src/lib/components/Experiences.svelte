<script lang="ts">
	import type { Experience } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let experiences: Experience[] = [];
</script>

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Places I've Worked At</h2>
	<ul class="space-y-6">
		{#each experiences as exp}
			<li>
				<div class="flex items-center gap-3">
					<h3 class="text-xl font-semibold">{exp.title}</h3>
					<span class="text-sm text-gray-500">{exp.period}</span>
				</div>
				<p class="text-gray-700 dark:text-gray-400">{exp.description}</p>
			</li>
		{/each}
	</ul>
</section>
