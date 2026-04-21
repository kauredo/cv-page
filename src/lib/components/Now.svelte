<script lang="ts">
	import SectionHeading from './shared/SectionHeading.svelte';

	type Activity = {
		emoji: string;
		text: string;
		variant: 'feature-orange' | 'feature-blue' | 'standard' | 'mono';
		span?: string;
		caption?: string;
	};

	const activities: Activity[] = [
		{
			emoji: '📅',
			text: 'Building a calendar tool for all Portuguese basketball leagues',
			variant: 'feature-orange',
			span: 'sm:col-span-2 md:col-span-2 md:row-span-2',
			caption: 'side-quest // shipping soon'
		},
		{ emoji: '🖨️', text: '3D printing a wine rack(!) using my Bambu P1S', variant: 'standard' },
		{
			emoji: '👨‍💻',
			text: 'Learning and working with LLMs and code assistants',
			variant: 'standard'
		},
		{
			emoji: '🏀',
			text: 'Playing for Nacional. Vamos.',
			variant: 'feature-blue',
			span: 'sm:col-span-2 md:col-span-2',
			caption: 'every wednesday + saturday'
		},
		{
			emoji: '📚',
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
		index="05"
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
			Live · updated this month
		</span>
	</SectionHeading>

	<ul class="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
		{#each activities as { emoji, text, variant, span, caption }}
			<li
				class="group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 transition-transform duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:-translate-y-0.5 {span ??
					''} {variant === 'feature-orange'
					? 'bg-hoop-700 dark:bg-hoop-800 text-white'
					: variant === 'feature-blue'
						? 'bg-vasco-700 dark:bg-vasco-800 text-white'
						: variant === 'mono'
							? 'border border-slate-900/15 bg-white text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-white'
							: 'border border-slate-200 bg-slate-50/70 text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white'}"
			>
				<!-- Decorative oversized emoji watermark -->
				<span
					class="pointer-events-none absolute -right-3 -bottom-6 text-[5.5rem] opacity-25 transition-transform duration-500 select-none motion-safe:group-hover:scale-110 motion-safe:group-active:scale-110 sm:text-[7rem] md:text-[9rem]"
					aria-hidden="true"
				>
					{emoji}
				</span>

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
