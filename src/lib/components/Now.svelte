<script lang="ts">
	const activities = [
		{
			emoji: '📅',
			text: 'Building a calendar tool for all Portuguese basketball leagues',
			highlight: true
		},
		{ emoji: '🖨️', text: '3D printing a wine rack(!) using my Bambu P1S' },
		{ emoji: '🏀', text: 'Playing basketball for a local club (vamos Nacional)', highlight: true },
		{ emoji: '👨‍💻', text: 'Learning and working with LLMs and code assistants' },
		{ emoji: '📚', text: 'Reading the "Red Rising" series' }
	];
</script>

<section aria-labelledby="now-heading">
	<div class="mb-6 flex items-center gap-3">
		<h2 id="now-heading" class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
			What I'm Up to Now
		</h2>
		<span class="relative flex h-2.5 w-2.5">
			<span
				class="bg-hoop-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
			></span>
			<span class="bg-hoop-500 relative inline-flex h-2.5 w-2.5 rounded-full"></span>
		</span>
	</div>
	<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each activities as { emoji, text, highlight }}
			<li
				class="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700 dark:hover:bg-slate-900 {highlight
					? 'ring-hoop-200 dark:ring-hoop-900/50 ring-1'
					: ''}"
			>
				<span class="text-xl" aria-hidden="true">{emoji}</span>
				<span class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</span>
			</li>
		{/each}
	</ul>
</section>
