<script lang="ts">
	export let href = '/';
	export let text = 'Back';
</script>

<a
	{href}
	class="group eyebrow hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 -mx-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:text-slate-300 dark:focus-visible:ring-offset-slate-950"
	style="view-transition-name: back-button"
>
	<span
		aria-hidden="true"
		class="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1 motion-reduce:transform-none"
		>←</span
	>
	{text}
</a>
