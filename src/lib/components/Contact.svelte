<script lang="ts">
	import { fade } from 'svelte/transition';
	import DribblingBall from './shared/DribblingBall.svelte';
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
		<a href="mailto:vasco.kf@gmail.com" class="text-vasco-600 hover:underline">Email</a>
		<a href="https://github.com/kauredo" class="text-vasco-600 hover:underline">GitHub</a>
		<a href="https://linkedin.com/in/vascokf" class="text-vasco-600 hover:underline">LinkedIn</a>
	</div>
</section>
