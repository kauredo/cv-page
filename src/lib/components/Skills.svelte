<script lang="ts">
	export let skills: string[] = [];
</script>

<section aria-labelledby="skills-heading">
	<h2
		id="skills-heading"
		class="mb-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
	>
		Tools & Tech I Enjoy
	</h2>
	<div class="flex flex-wrap gap-2">
		{#each skills as skill}
			<span
				class="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
			>
				{skill}
			</span>
		{/each}
	</div>
</section>
