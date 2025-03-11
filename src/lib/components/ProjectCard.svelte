<script lang="ts">
	export let title: string;
	export let description: string;
	export let link: string | undefined;
	export let image: string | undefined;
</script>

<div class="max-w-[300px] min-w-[250px] flex-1 rounded-2xl bg-white p-4 shadow">
	{#if image}
		<img src={image} alt={title} class="mb-4 rounded-xl" />
	{/if}
	<h2 class="mb-2 text-xl font-semibold">{title}</h2>
	<p class="mb-2 text-sm text-gray-600">{description}</p>
	{#if link}
		<a href={link} target="_blank" class="text-sm text-blue-600 hover:underline">View Project →</a>
	{/if}
</div>
