<script lang="ts">
	import { fade } from 'svelte/transition';

	let formState = {
		name: '',
		email: '',
		message: ''
	};

	let errors = {
		name: '',
		email: '',
		message: ''
	};

	let formStatus = 'idle'; // idle, submitting, success, error
	let errorMessage = '';

	function validateForm() {
		let isValid = true;
		errors = {
			name: '',
			email: '',
			message: ''
		};

		if (!formState.name.trim()) {
			errors.name = 'Name is required';
			isValid = false;
		}

		if (!formState.email.trim()) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
			errors.email = 'Please enter a valid email address';
			isValid = false;
		}

		if (!formState.message.trim()) {
			errors.message = 'Message is required';
			isValid = false;
		} else if (formState.message.length < 10) {
			errors.message = 'Message must be at least 10 characters';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(event: { preventDefault: () => void }) {
		// Prevent the default form submission if we want to handle it ourselves
		if (formStatus === 'submitting') return;

		if (!validateForm()) {
			event.preventDefault();
			return;
		}

		formStatus = 'submitting';

		try {
			// If using custom submit handling instead of formspree's default:
			// const response = await fetch('https://formspree.io/f/vasco.kf@gmail.com', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json'
			//   },
			//   body: JSON.stringify(formState)
			// });

			// if (!response.ok) throw new Error('Failed to send message');

			// For now, using formspree's default form handling
			formStatus = 'success';
		} catch (error) {
			formStatus = 'error';
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Something went wrong. Please try again.';
			}
			event.preventDefault();
		}
	}

	function resetForm() {
		formState = {
			name: '',
			email: '',
			message: ''
		};
		formStatus = 'idle';
	}
</script>

<main class="mx-auto max-w-xl p-6">
	<h1 class="mb-6 text-3xl font-bold">Contact Me</h1>

	{#if formStatus === 'success'}
		<div
			transition:fade
			class="rounded border border-green-300 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<div class="flex items-center">
				<svg
					class="mr-2 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
				<p><strong>Thanks!</strong> Your message has been sent successfully.</p>
			</div>
			<div class="mt-4">
				<button
					on:click={resetForm}
					class="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
				>
					Send Another Message
				</button>
			</div>
		</div>
	{:else if formStatus === 'error'}
		<div
			transition:fade
			class="mb-6 rounded border border-red-300 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			<p><strong>Error:</strong> {errorMessage}</p>
			<button on:click={() => (formStatus = 'idle')} class="mt-2 text-red-700 underline">
				Try Again
			</button>
		</div>
	{/if}

	{#if formStatus !== 'success'}
		<form
			method="POST"
			action="https://formspree.io/f/vasco.kf@gmail.com"
			on:submit={handleSubmit}
			class="space-y-6"
			novalidate
		>
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Name <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="name"
					name="name"
					bind:value={formState.name}
					class="focus:border-vasco-500 focus:ring-vasco-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
					aria-required="true"
					aria-invalid={errors.name ? 'true' : 'false'}
					aria-describedby={errors.name ? 'name-error' : undefined}
				/>
				{#if errors.name}
					<p id="name-error" class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
				{/if}
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Email <span class="text-red-500">*</span>
				</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formState.email}
					class="focus:border-vasco-500 focus:ring-vasco-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
					aria-required="true"
					aria-invalid={errors.email ? 'true' : 'false'}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>
				{#if errors.email}
					<p id="email-error" class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
				{/if}
			</div>

			<div>
				<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Message <span class="text-red-500">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					rows="5"
					bind:value={formState.message}
					class="focus:border-vasco-500 focus:ring-vasco-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
					aria-required="true"
					aria-invalid={errors.message ? 'true' : 'false'}
					aria-describedby={errors.message ? 'message-error' : undefined}
				></textarea>
				{#if errors.message}
					<p id="message-error" class="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.message}
					</p>
				{/if}
				<div class="mt-1 text-right text-sm text-gray-500 dark:text-gray-400">
					{formState.message.length} characters
				</div>
			</div>

			<div class="flex items-center justify-between">
				<button
					type="submit"
					disabled={formStatus === 'submitting'}
					class="bg-vasco-600 hover:bg-vasco-700 disabled:bg-vasco-400 flex items-center rounded-md px-6 py-2 text-stone-50 transition"
				>
					{#if formStatus === 'submitting'}
						<svg
							class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Sending...
					{:else}
						Send Message
					{/if}
				</button>

				<button
					type="reset"
					on:click={() => {
						formState = { name: '', email: '', message: '' };
						errors = { name: '', email: '', message: '' };
					}}
					class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
				>
					Clear Form
				</button>
			</div>
		</form>
	{/if}
</main>
