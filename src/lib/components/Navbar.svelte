<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	export const darkModeStore = writable(false);

	let darkMode = false;

	onMount(() => {
		// Only get the value, we already applied the class in the inline script
		const savedDarkMode = localStorage.getItem('darkMode');
		darkMode =
			savedDarkMode !== null
				? savedDarkMode === 'true'
				: window.matchMedia('(prefers-color-scheme: dark)').matches;

		darkModeStore.set(darkMode);

		// Listen for system preference changes
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

<header class="sticky top-0 z-20 bg-stone-50 shadow dark:bg-gray-800 dark:shadow-stone-50">
	<nav class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2 text-xl font-bold">
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
		<div class="flex items-center space-x-4">
			<a href="/projects" class="hover:underline dark:text-stone-50">Projects</a>
			<a href="/contact" class="hover:underline dark:text-stone-50">Contact</a>
			<label class="inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					value=""
					class="peer sr-only"
					checked={darkMode}
					on:change={toggleDarkMode}
				/>
				<div
					class="peer peer-checked:bg-vasco-600 peer-focus:ring-vasco-300 dark:peer-checked:bg-vasco-600 dark:peer-focus:ring-vasco-800 relative h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-4 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-stone-50 after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-stone-50 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"
				></div>
				<span class="ms-3 w-10 text-sm font-medium text-gray-900 dark:text-gray-300">
					{darkMode ? 'Dark' : 'Light'}
				</span>
			</label>
		</div>
	</nav>
</header>
