<script lang="ts">
	export let error: Error;
	export let status: number;
</script>

<svelte:head>
	<title>{status === 404 ? 'Page Not Found' : 'Error'} — Vasco</title>
</svelte:head>

<main class="mx-auto max-w-2xl p-6 text-center">
	<h1 class="mb-4 text-4xl font-bold">
		{status === 404 ? '404 — Page Not Found' : `Error ${status}`}
	</h1>
	<p class="mb-4 text-gray-600">
		{status === 404 ? "Sorry, we couldn't find the page you're looking for." : error.message}
	</p>
	<a href="/" class="text-blue-600 underline">Go back home</a>
</main>
