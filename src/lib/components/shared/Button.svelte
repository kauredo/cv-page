<script lang="ts">
	export let type: 'primary' | 'secondary';
	export let href: string;
	export let target_blank: boolean = false;

	const colors: { [key in 'primary' | 'secondary']: string } = {
		primary:
			'text-white bg-vasco-600 hover:bg-vasco-700 dark:bg-vasco-500 dark:hover:bg-vasco-600 shadow-lg shadow-vasco-600/25 hover:shadow-vasco-600/40',
		secondary:
			'text-slate-700 border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:border-vasco-400 hover:text-vasco-700 dark:text-slate-200 dark:border-slate-600 dark:bg-slate-800/80 dark:hover:border-vasco-400 dark:hover:text-vasco-300'
	};

	$: color = colors[type];
</script>

<a
	{href}
	class="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 {color}"
	target={target_blank ? '_blank' : undefined}
	rel={target_blank ? 'noopener noreferrer' : undefined}
>
	<slot />
</a>
