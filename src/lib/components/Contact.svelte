<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import DribblingBall from './shared/DribblingBall.svelte';
	import Button from './shared/Button.svelte';

	const contacts = [
		{ type: 'Email', href: 'mailto:vasco.kf@gmail.com' },
		{ type: 'GitHub', href: 'https://github.com/kauredo' },
		{ type: 'LinkedIn', href: 'https://linkedin.com/in/vascokf' }
	];

	let visibleItems: Record<number, boolean> = {};

	function handleIntersect(index: number) {
		return (event: CustomEvent<{ entry: IntersectionObserverEntry }>) => {
			const { isIntersecting } = event.detail.entry;
			if (isIntersecting) {
				visibleItems[index] = true;
			}
		};
	}
</script>

<section class="space-y-4 text-center" in:fade={{ duration: 200 }}>
	<div
		class="flex items-center justify-center gap-4"
		use:inview={{ rootMargin: '0px', threshold: 0.2 }}
		on:inview_change={handleIntersect(0)}
	>
		{#if visibleItems[0]}
			<div in:fly={{ duration: 500, y: -20 }}>
				<h2 class="text-2xl font-bold">Hit me up!</h2>
			</div>
		{/if}
		<DribblingBall width={30} ballJumpHeight={70} duration={0.35} />
	</div>

	<div use:inview={{ rootMargin: '0px', threshold: 0.2 }} on:inview_change={handleIntersect(1)}>
		{#if visibleItems[1]}
			<p in:fly={{ duration: 500, y: 20 }} class="text-gray-600 dark:text-gray-400">
				Got a cool project idea? Want to chat code or hoops? Drop me a message wherever you prefer:
			</p>
		{/if}
	</div>

	<div class="flex justify-center gap-6">
		{#each contacts as contact, index}
			<div
				use:inview={{ rootMargin: '0px', threshold: 0.2 }}
				on:inview_change={handleIntersect(index + 2)}
			>
				{#if visibleItems[index + 2]}
					<div
						in:fly={{ duration: 300, y: 30, delay: index * 150 }}
						class="transform transition-all duration-200 hover:scale-105"
					>
						<Button type="secondary" href={contact.href} target_blank>{contact.type}</Button>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
