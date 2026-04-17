<script lang="ts">
	export let type: 'primary' | 'secondary';
	export let href: string;
	export let target_blank: boolean = false;

	const styles: { [key in 'primary' | 'secondary']: string } = {
		primary:
			'group relative text-white bg-slate-900 hover:bg-hoop-500 active:bg-hoop-500 dark:bg-white dark:text-slate-900 dark:hover:bg-hoop-500 dark:hover:text-white dark:active:bg-hoop-500 dark:active:text-white shadow-[0_4px_0_0_var(--color-hoop-700)] hover:shadow-[0_2px_0_0_var(--color-hoop-700)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] motion-reduce:transform-none',
		secondary:
			'text-slate-900 border border-slate-900/25 bg-transparent hover:border-slate-900 hover:bg-slate-900 hover:text-white active:border-slate-900 active:bg-slate-900 active:text-white dark:text-white dark:border-white/30 dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900 dark:active:border-white dark:active:bg-white dark:active:text-slate-900'
	};
</script>

<a
	{href}
	class="focus-visible:ring-hoop-500 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs font-semibold tracking-[0.18em] uppercase transition-[background-color,color,border-color,transform,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:focus-visible:ring-offset-slate-950 {styles[
		type
	]}"
	target={target_blank ? '_blank' : undefined}
	rel={target_blank ? 'noopener noreferrer' : undefined}
>
	<slot />
</a>
