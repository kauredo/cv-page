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
	class="sticky top-0 z-20 border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/80 print:hidden"
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
			<img
				src="/images/logo.svg"
				class="h-7 w-auto dark:invert"
				on:error={(event) => {
					const target = event.target as HTMLImageElement;
					if (target) target.src = '/images/logo.webp';
				}}
				alt="VascoKF logo"
			/>
			<span class="sr-only">Home</span>
		</a>
		<div class="flex items-center gap-6">
			<a
				href="/projects"
				class="text-sm font-medium text-slate-600 transition-colors hover:text-vasco-600 dark:text-slate-300 dark:hover:text-vasco-400"
			>
				Projects
			</a>
			<a
				href="/contact"
				class="text-sm font-medium text-slate-600 transition-colors hover:text-vasco-600 dark:text-slate-300 dark:hover:text-vasco-400"
			>
				Contact
			</a>

			<!-- Dark mode toggle -->
			<button
				on:click={toggleDarkMode}
				class="relative flex h-8 w-14 items-center rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-700"
				aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
				role="switch"
				aria-checked={darkMode}
			>
				<span
					class="flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 {darkMode
						? 'translate-x-6'
						: 'translate-x-0'}"
				>
					{#if darkMode}
						<svg class="h-4 w-4 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
						</svg>
					{:else}
						<svg class="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</span>
			</button>
		</div>
	</nav>
</header>
