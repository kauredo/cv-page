<script lang="ts">
	export let type: 'primary' | 'secondary';
	export let href: string;
	export let target_blank: boolean = false;
	const target = target_blank ? 'target="_blank" rel="noopener noreferrer"' : '';

	const colors: { [key in 'primary' | 'secondary']: string } = {
		primary: 'text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800',
		secondary:
			'border border-gray-300 bg-white hover:bg-stone-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
	};

	$: color = colors[type];
</script>

<a
	{href}
	class={`rounded-lg px-5 py-2 font-medium transition-all hover:shadow-sm ${color}`}
	{target}
>
	<slot />
</a>
