<script lang="ts">
	let submitted = false;
</script>

<main class="mx-auto max-w-xl p-6">
	<h1 class="mb-6 text-3xl font-bold">Contact Me</h1>
	{#if submitted}
		<p class="rounded border border-green-300 bg-green-100 px-4 py-3 text-green-700">
			Thanks! Your message has been sent.
		</p>
	{:else}
		<form
			method="POST"
			action="https://formspree.io/f/vasco.kf@gmail.com"
			on:submit={() => (submitted = true)}
			class="space-y-6"
		>
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-400"
					>Name</label
				>
				<input
					type="text"
					id="name"
					name="name"
					required
					class="focus:border-vasco-500 focus:ring-vasco-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-400"
					>Email</label
				>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="focus:border-vasco-500 focus:ring-vasco-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				/>
			</div>

			<div>
				<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-400"
					>Message</label
				>
				<textarea
					id="message"
					name="message"
					rows="5"
					required
					class="focus:border-vasco-500 focus:ring-vasco-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				></textarea>
			</div>

			<button
				type="submit"
				class="bg-vasco-600 hover:bg-vasco-700 rounded-md px-4 py-2 text-stone-50 transition"
			>
				Send Message
			</button>
		</form>
	{/if}
</main>
