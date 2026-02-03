<script lang="ts">
	export let href = '/';
	export let height = 23;
	export let text = '';
</script>

<a
	{href}
	class="group inline-flex w-fit items-center gap-2 pr-3 text-slate-500 transition-colors duration-200 hover:text-vasco-600 dark:text-slate-400 dark:hover:text-vasco-400"
	style="view-transition-name: back-button"
>
	<svg
		class="rotate-90 fill-current transition-transform duration-200 group-hover:-translate-x-1"
		style={`height: ${height}px;`}
		version="1.1"
		viewBox="0 0 65.516 62.116"
		aria-hidden="true"
	>
		<g transform="translate(-25.536 -93.179)">
			<path
				d="m40.629 93.179c-5.0309 0.02325-10.062 0.04651-15.093 0.06976 8.1442 20.682 16.289 41.364 24.433 62.046 5.5498-1.7e-4 11.1-3.4e-4 16.649-5.1e-4 8.1444-20.682 16.289-41.364 24.433-62.045-5.0309-0.023253-10.062-0.04651-15.093-0.06976-5.8883 14.073-11.777 28.146-17.665 42.219-5.8884-14.073-11.777-28.146-17.665-42.22z"
			/>

			<path
				d="m82.475 134.8c-2.6907 6.8328-5.3814 13.666-8.0722 20.498 5.5498 1.8e-4 11.1 3.5e-4 16.649 5.3e-4 -2.859-6.8331-5.7183-13.666-8.5773-20.499z"
			/>
		</g>
	</svg>

	{#if text}
		<span class="text-lg font-semibold">{text}</span>
	{/if}
</a>
