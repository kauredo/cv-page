<script lang="ts">
	import { page } from '$app/state';
	import { MetaTags } from 'svelte-meta-tags';

	export let error: App.Error | null = page.error;
	export let status: number = page.status;
</script>

<MetaTags title="{status === 404 ? 'Page Not Found' : `Error ${status}`} — Vasco KF" />

<main
	class="flex min-h-screen items-center justify-center bg-stone-50 p-6 text-center dark:bg-gray-800 dark:text-gray-200"
>
	<div class="w-full max-w-xl">
		<div class="mb-6">
			<svg
				class="text-vasco-600 mx-auto h-16 w-16"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.666 1.732-3L13.732 4c-.77-1.334-2.694-1.334-3.464 0L4.34 16c-.77 1.334.192 3 1.732 3z"
				/>
			</svg>
		</div>

		<h1 class="mb-4 text-4xl font-bold">
			{status === 404 ? '404 — Page Not Found' : `Error ${status}`}
		</h1>

		<p class="mb-6 text-lg text-gray-600 dark:text-gray-400">
			{#if status === 404}
				Sorry, there's no page at
				<span class="text-vasco-600 font-semibold">{page.url.pathname}</span>. But feel free to
				explore other parts of the site!
			{:else if error?.message}
				{error.message}
			{:else}
				Something went wrong — but it’s not your fault.
			{/if}
		</p>

		<a
			href="/"
			class="bg-vasco-600 hover:bg-vasco-700 inline-block rounded-lg px-6 py-3 font-medium text-stone-50 shadow transition"
		>
			← Go back home
		</a>
	</div>
</main>
