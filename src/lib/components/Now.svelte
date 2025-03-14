<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<section in:fade={{ duration: 200 }}>
	<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I'm Up to Now</h2>
	<p class="text-gray-600 dark:text-gray-400">
		📅 Building a calendar tool for all Portuguese basketball leagues<br />
		🖨️ 3D printing a wine rack(!) using my Bambu P1S<br />
		🏀 Playing basketball for a local club (vamos SIMECQ)<br />
		👨‍💻 Learning React Native and Python <br />
		📚 Reading "The Peculiar life of a lonely Postman"
	</p>
</section>
