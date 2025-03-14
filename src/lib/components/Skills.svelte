<script lang="ts">
	import { fade } from 'svelte/transition';

	export let skills: string[] = [];
</script>

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Tools & Tech I Enjoy</h2>
	<ul class="grid grid-cols-2 gap-3 text-sm text-gray-700 sm:grid-cols-3 dark:text-gray-400">
		{#each skills as skill}
			<li class="rounded-lg bg-stone-50 px-3 py-1 dark:bg-gray-800">{skill}</li>
		{/each}
	</ul>
</section>
