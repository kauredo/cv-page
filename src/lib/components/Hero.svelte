<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<section class="space-y-4 pt-10 text-center" in:fade={{ duration: 200 }}>
	<h1 class="text-3xl font-bold sm:text-5xl">Hey, I'm Vasco</h1>
	<p class="text-lg text-gray-600 dark:text-gray-400">
		Web Developer • Problem Solver • Basketball Enthusiast
	</p>
	<p class="mx-auto max-w-xl text-gray-600 dark:text-gray-400">
		I build clean, functional, and playful web apps. Currently exploring 3D printing, basketball
		scheduling tools, and how to make the web a little more fun.
	</p>
</section>
