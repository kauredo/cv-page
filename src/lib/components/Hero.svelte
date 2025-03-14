<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from './shared/Button.svelte';
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<section class="mb-6 py-16 text-center" in:fade={{ duration: 600, delay: 200 }}>
	<!-- Decorative elements -->
	<div class="relative mx-auto max-w-4xl">
		{#if mounted}
			<div in:fly={{ y: -20, duration: 800 }}>
				<h1 class="mb-4 text-4xl font-bold sm:text-6xl md:text-7xl">Hey, I'm Vasco</h1>
			</div>

			<div in:fly={{ y: 20, duration: 800, delay: 300 }}>
				<p class="mb-4 text-lg font-medium sm:text-xl">
					Web Developer • Problem Solver • Basketball Enthusiast
				</p>

				<p class="mx-auto max-w-xl text-gray-600 sm:text-lg dark:text-gray-400">
					I build clean, functional, and playful web apps. Currently exploring 3D printing,
					basketball scheduling tools, and making the web a little more fun.
				</p>

				<div class="mt-8 flex justify-center gap-4">
					<Button type="primary" href="/projects">See My Work</Button>

					<!-- Using the slot approach -->
					<Button type="secondary" href="/contact">Get In Touch</Button>
				</div>
			</div>
		{/if}
	</div>
</section>
