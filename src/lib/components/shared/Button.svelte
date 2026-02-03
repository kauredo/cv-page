<script lang="ts">
	export let type: 'primary' | 'secondary';
	export let href: string;
	export let target_blank: boolean = false;

	const styles: { [key in 'primary' | 'secondary']: string } = {
		primary:
			'text-white bg-vasco-600 hover:bg-vasco-700 shadow-sm hover:shadow-md hover:shadow-vasco-500/25 dark:bg-vasco-500 dark:hover:bg-vasco-600 dark:hover:shadow-vasco-500/30',
		secondary:
			'text-slate-700 border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 dark:text-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-slate-500 dark:hover:bg-slate-800'
	};
</script>

<a
	{href}
	class="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 {styles[type]}"
	target={target_blank ? '_blank' : undefined}
	rel={target_blank ? 'noopener noreferrer' : undefined}
>
	<slot />
</a>
