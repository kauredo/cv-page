<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	export const darkModeStore = writable(false);

	let darkMode = false;

	onMount(() => {
		const savedDarkMode = localStorage.getItem('darkMode');
		darkMode =
			savedDarkMode !== null
				? savedDarkMode === 'true'
				: window.matchMedia('(prefers-color-scheme: dark)').matches;

		darkModeStore.set(darkMode);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (localStorage.getItem('darkMode') === null) {
				darkMode = e.matches;
				updateDarkMode(darkMode);
				darkModeStore.set(darkMode);
			}
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		updateDarkMode(darkMode);
		localStorage.setItem('darkMode', darkMode.toString());
		darkModeStore.set(darkMode);
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
	class="sticky top-0 z-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 print:hidden"
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
		<a href="/" class="flex items-center">
			<img
				src="/images/logo.svg"
				class="h-6 w-auto dark:invert"
				on:error={(event) => {
					const target = event.target as HTMLImageElement;
					if (target) target.src = '/images/logo.webp';
				}}
				alt="VascoKF logo"
			/>
			<span class="sr-only">Home</span>
		</a>
		<div class="flex items-center gap-5">
			<a
				href="/projects"
				class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
			>
				Projects
			</a>
			<a
				href="/contact"
				class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
			>
				Contact
			</a>

			<button
				on:click={toggleDarkMode}
				class="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
				aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if darkMode}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				{:else}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
				{/if}
			</button>
		</div>
	</nav>
</header>
