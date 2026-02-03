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

<section in:fade={{ duration: 200 }} aria-labelledby="skills-heading">
	<h2
		id="skills-heading"
		class="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		Tools & Tech I Enjoy
	</h2>
	<div class="flex flex-wrap gap-3">
		{#each skills as skill, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<span
						in:fly={{ duration: 300, y: 10, delay: index * 30 }}
						class="inline-block rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-vasco-400 hover:text-vasco-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-vasco-400 dark:hover:text-vasco-300"
					>
						{skill}
					</span>
				{/if}
			</div>
		{/each}
	</div>
</section>
