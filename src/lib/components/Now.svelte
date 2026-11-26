<script lang="ts">
	import SectionHeading from './shared/SectionHeading.svelte';

	type Activity = {
		text: string;
		variant: 'feature-orange' | 'feature-blue' | 'standard' | 'mono';
		span?: string;
		caption?: string;
	};

	const activities: Activity[] = [
		{
			text: 'Building a calendar tool for all Portuguese basketball leagues',
			variant: 'feature-orange',
			span: 'sm:col-span-2 md:col-span-2 md:row-span-2',
			caption: 'side-quest // shipping soon'
		},
		{ text: '3D printing a wine rack(!) using my Bambu P1S', variant: 'standard' },
		{
			text: 'Learning and working with LLMs and code assistants',
			variant: 'standard'
		},
		{
			text: 'Playing for Nacional. Vamos.',
			variant: 'feature-blue',
			span: 'sm:col-span-2 md:col-span-2',
			caption: 'every wednesday + saturday'
		},
		{
			text: 'Reading the "Red Rising" series',
			variant: 'mono',
			span: 'sm:col-span-2 md:col-span-4',
			caption: 'book 3 of 6 · "Hail Reaper"'
		}
	];
</script>

<section aria-labelledby="now-heading">
	<SectionHeading
		id="now-heading"
		title="What I'm Up to Now"
		italicWord="Now"
		trailing
		accent="hoop"
	>
		<span slot="meta" class="inline-flex items-center gap-2">
			<span class="relative flex h-2 w-2" aria-hidden="true">
				<span
					class="bg-hoop-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
				></span>
				<span class="bg-hoop-500 relative inline-flex h-2 w-2 rounded-full"></span>
			</span>
			Live, updated this month
		</span>
	</SectionHeading>

	<ul class="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
		{#each activities as { text, variant, span, caption }, i (i)}
			<li
				class="relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 transition-transform duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:-translate-y-0.5 {span ??
					''} {variant === 'feature-orange'
					? 'bg-hoop-700 dark:bg-hoop-800 text-white'
					: variant === 'feature-blue'
						? 'bg-vasco-700 dark:bg-vasco-800 text-white'
						: variant === 'mono'
							? 'border border-slate-900/15 bg-white text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-white'
							: 'border border-slate-200 bg-slate-50/70 text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white'}"
			>
				<div class="relative">
					<p
						class="font-display text-base leading-snug font-bold {variant === 'feature-orange' ||
						variant === 'feature-blue'
							? 'sm:text-xl'
							: 'sm:text-base'}"
					>
						{text}
					</p>
					{#if caption}
						<p
							class="mt-2 font-mono text-[10px] tracking-wider uppercase {variant ===
							'feature-orange'
								? 'text-hoop-100'
								: variant === 'feature-blue'
									? 'text-vasco-200'
									: 'text-slate-600 dark:text-slate-400'}"
						>
							{caption}
						</p>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>
