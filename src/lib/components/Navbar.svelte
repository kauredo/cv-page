<script lang="ts">
	import { onMount } from 'svelte';

	let darkMode = false;

	// Load the dark mode preference from local storage
	onMount(() => {
		const savedDarkMode = localStorage.getItem('darkMode');
		if (savedDarkMode !== null) {
			darkMode = savedDarkMode === 'true';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		updateDarkMode(darkMode);
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		updateDarkMode(darkMode);
		localStorage.setItem('darkMode', darkMode.toString());
	}

	function updateDarkMode(isDark: boolean) {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<header
	class="sticky top-0 z-10 bg-white shadow transition-colors duration-300 dark:bg-gray-800 dark:shadow-white"
>
	<nav class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2 text-xl font-bold">
			<img
				src="/images/logo.svg"
				class="h-6 w-auto dark:invert"
				on:error={(event) => {
					const target = event.target as HTMLImageElement;
					if (target) target.src = '/images/logo.png';
				}}
				alt="VascoKF logo"
			/>
			<span class="sr-only">Home</span>
		</a>

		<div class="space-x-4">
			<a href="/projects" class="hover:underline dark:text-white">Projects</a>
			<a href="/contact" class="hover:underline dark:text-white">Contact</a>
			<button
				on:click={toggleDarkMode}
				class="hover:cursor-pointer hover:underline dark:text-white"
			>
				{#if darkMode}
					🌞
				{:else}
					🌙
				{/if}
			</button>
		</div>
	</nav>
</header>
