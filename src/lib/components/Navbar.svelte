<script lang="ts">
</script>

<header class="sticky top-0 z-10 bg-white shadow">
	<nav class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2 text-xl font-bold">
			<img
				src="/images/logo.svg"
				on:error={(event) => {
					const target = event.target as HTMLImageElement;
					if (target) target.src = '/images/logo.png';
				}}
				alt="VascoKF logo"
				class="h-6 w-auto"
			/>
			<span class="sr-only">Home</span>
		</a>

		<div class="space-x-4">
			<a href="/projects" class="hover:underline">Projects</a>
			<a href="/contact" class="hover:underline">Contact</a>
		</div>
	</nav>
</header>
