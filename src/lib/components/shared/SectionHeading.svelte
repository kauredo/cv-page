<script lang="ts">
	export let index: string;
	export let title: string;
	export let italicWord: string = '';
	export let id: string = '';
	export let trailing: boolean = false;
	export let accent: 'vasco' | 'hoop' = 'vasco';
	export let meta: string = '';

	$: parts = (() => {
		if (!italicWord) return { before: title, after: '' };
		const idx = title.indexOf(italicWord);
		if (idx === -1) return { before: title, after: '' };
		return {
			before: title.slice(0, idx),
			after: title.slice(idx + italicWord.length)
		};
	})();

	$: italicColor =
		accent === 'hoop'
			? 'text-hoop-600 dark:text-hoop-400'
			: 'text-vasco-700 dark:text-vasco-300';
	$: trailingColor =
		accent === 'hoop'
			? 'text-hoop-500 dark:text-hoop-400'
			: 'text-vasco-600 dark:text-vasco-400';
	$: indexColor =
		accent === 'hoop'
			? 'text-hoop-600 dark:text-hoop-400'
			: 'text-vasco-700 dark:text-vasco-300';
</script>

<header class="mb-10 sm:mb-14">
	<div
		class="flex items-center justify-between gap-4 border-b border-slate-900/15 pb-3 dark:border-white/15"
	>
		<span class="eyebrow {indexColor}">№ {index}</span>
		{#if meta || $$slots.meta}
			<span class="eyebrow text-slate-600 dark:text-slate-400">
				<slot name="meta">{meta}</slot>
			</span>
		{/if}
	</div>
	<h2
		{id}
		class="font-display mt-6 text-4xl font-bold leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
	>
		{#if italicWord}
			{parts.before}<span class="{italicColor} font-medium italic">{italicWord}</span>{parts.after}
		{:else}
			{title}
		{/if}
		{#if trailing}
			<span class={trailingColor}>.</span>
		{/if}
	</h2>
</header>
