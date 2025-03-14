<script lang="ts">
	import { fade } from 'svelte/transition';
	import DribblingBall from './shared/DribblingBall.svelte';
	import Button from './shared/Button.svelte';
</script>

<section class="space-y-4 text-center" in:fade={{ duration: 200 }}>
	<div class="flex items-center justify-center gap-4">
		<h2 class="text-2xl font-bold">Hit me up!</h2>
		<DribblingBall width={30} ballJumpHeight={70} duration={0.35} />
	</div>
	<p class="text-gray-600 dark:text-gray-400">
		Got a cool project idea? Want to chat code or hoops? Drop me a message wherever you prefer:
	</p>
	<div class="flex justify-center gap-6">
		<Button type="secondary" href="mailto:vasco.kf@gmail.com">Email</Button>
		<Button type="secondary" href="https://github.com/kauredo">GitHub</Button>
		<Button type="secondary" href="https://linkedin.com/in/vascokf">LinkedIn</Button>
	</div>
</section>
