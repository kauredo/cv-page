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

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I'm Up to Now</h2>
	<div class="space-y-2">
		{#each activities as { emoji, text }, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index)}
			>
				{#if visibleItems[index]}
					<p
						in:fly={{ duration: 300, x: -20, delay: index * 100 }}
						class="transform text-gray-600 transition-all duration-200 hover:translate-x-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
					>
						<span class="inline-block w-8">{emoji}</span>
						{text}
					</p>
				{/if}
			</div>
		{/each}
	</div>
</section>
