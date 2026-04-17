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
	class="sticky top-0 z-20 border-b border-slate-900/10 bg-white/80 pt-[env(safe-area-inset-top)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80 print:hidden"
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
		<a
			href="/"
			class="group focus-visible:ring-vasco-500 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none dark:focus-visible:ring-offset-slate-950"
		>
			<img
				src="/images/logo.svg"
				class="h-7 w-auto transition-opacity group-hover:opacity-70 dark:invert"
				on:error={(event) => {
					const target = event.target as HTMLImageElement;
					if (target) target.src = '/images/logo.webp';
				}}
				alt="VascoKF logo"
				width="30"
				height="28"
			/>
			<span class="sr-only">Home</span>
		</a>

		<div class="flex items-center gap-0.5 sm:gap-2 md:gap-3">
			<a
				href="/projects"
				class="eyebrow group hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:outline-none dark:text-slate-300"
			>
				Projects
				<span
					class="bg-vasco-500/0 group-hover:bg-hoop-500 group-active:bg-hoop-500 h-px w-3 transition-all"
					aria-hidden="true"
				></span>
			</a>
			<a
				href="/contact"
				class="eyebrow group hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:outline-none dark:text-slate-300"
			>
				Contact
				<span
					class="bg-vasco-500/0 group-hover:bg-hoop-500 group-active:bg-hoop-500 h-px w-3 transition-all"
					aria-hidden="true"
				></span>
			</a>

			<button
				on:click={toggleDarkMode}
				class="focus-visible:ring-vasco-500 ml-1 rounded-full p-2.5 text-slate-600 transition-[background-color,color,transform] duration-150 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:outline-none active:scale-95 active:bg-slate-200 motion-reduce:transform-none dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-700"
				aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if darkMode}
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				{:else}
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</nav>
</header>
