<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	export let skills: string[] = [];
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

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Tools & Tech I Enjoy</h2>
	<ul class="grid grid-cols-2 gap-3 text-sm text-gray-700 sm:grid-cols-3 dark:text-gray-400">
		{#each skills as skill, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<li
						in:fly={{ duration: 300, y: 20, delay: index * 50 }}
						class="transform rounded-lg bg-stone-50 px-3 py-1 transition-all duration-200 hover:-translate-y-1 hover:bg-stone-100 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						{skill}
					</li>
				{/if}
			</div>
		{/each}
	</ul>
</section>
