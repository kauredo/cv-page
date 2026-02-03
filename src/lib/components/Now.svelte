<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';

	const activities = [
		{ emoji: '📅', text: 'Building a calendar tool for all Portuguese basketball leagues' },
		{ emoji: '🖨️', text: '3D printing a wine rack(!) using my Bambu P1S' },
		{ emoji: '🏀', text: 'Playing basketball for a local club (vamos SIMECQ)' },
		{ emoji: '👨‍💻', text: 'Learning React Native and Python' },
		{ emoji: '📚', text: 'Reading "The Peculiar life of a lonely Postman"' }
	];

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

<section in:fade={{ duration: 200 }} aria-labelledby="now-heading">
	<h2
		id="now-heading"
		class="mb-8 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		What I'm Up to Now
	</h2>
	<div class="space-y-4">
		{#each activities as { emoji, text }, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<div
						in:fly={{ duration: 400, x: -20, delay: index * 80 }}
						class="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
					>
						<span class="text-2xl" aria-hidden="true">{emoji}</span>
						<p class="text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
							{text}
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
