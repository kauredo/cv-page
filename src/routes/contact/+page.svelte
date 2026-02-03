<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let mounted = false;
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

	let formStatus = 'idle';
	let errorMessage = '';
	let nameInputRef: HTMLInputElement;

	onMount(() => {
		mounted = true;
		// Focus the name field after mount for better UX
		setTimeout(() => nameInputRef?.focus(), 100);
	});

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
		if (formStatus === 'submitting') return;

		if (!validateForm()) {
			event.preventDefault();
			return;
		}

		formStatus = 'submitting';

		try {
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

<section class="mx-auto max-w-xl px-6 py-16">
	{#if mounted}
		<div>
			<h1 class="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
				Contact Me
			</h1>
			<p class="mb-10 text-slate-600 dark:text-slate-300">
				Got a project idea or just want to chat? I'd love to hear from you.
			</p>
		</div>

		{#if formStatus === 'success'}
			<div
				transition:fade
				class="rounded-lg border-2 border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/30"
			>
				<div
					class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-800"
				>
					<svg
						class="h-7 w-7 text-green-600 dark:text-green-300"
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
				</div>
				<h2 class="mb-2 text-xl font-bold text-green-800 dark:text-green-200">Message sent!</h2>
				<p class="mb-6 text-green-700 dark:text-green-300">
					Thanks for reaching out. I'll get back to you soon.
				</p>
				<button
					on:click={resetForm}
					class="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
				>
					Send Another Message
				</button>
			</div>
		{:else if formStatus === 'error'}
			<div
				transition:fade
				class="mb-8 rounded-lg border-2 border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/30"
			>
				<div class="flex items-start gap-3">
					<svg
						class="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
					<div>
						<p class="font-medium text-red-800 dark:text-red-200">{errorMessage}</p>
						<button
							on:click={() => (formStatus = 'idle')}
							class="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
						>
							Try Again
						</button>
					</div>
				</div>
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
					<label
						for="name"
						class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
					>
						Name <span class="text-red-500">*</span>
					</label>
					<input
						bind:this={nameInputRef}
						type="text"
						id="name"
						name="name"
						bind:value={formState.name}
						class="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-vasco-500 focus:ring-0 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						aria-required="true"
						aria-invalid={errors.name ? 'true' : 'false'}
						aria-describedby={errors.name ? 'name-error' : undefined}
					/>
					{#if errors.name}
						<p id="name-error" class="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
					{/if}
				</div>

				<div>
					<label
						for="email"
						class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
					>
						Email <span class="text-red-500">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={formState.email}
						class="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-vasco-500 focus:ring-0 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						aria-required="true"
						aria-invalid={errors.email ? 'true' : 'false'}
						aria-describedby={errors.email ? 'email-error' : undefined}
					/>
					{#if errors.email}
						<p id="email-error" class="mt-2 text-sm text-red-600 dark:text-red-400">
							{errors.email}
						</p>
					{/if}
				</div>

				<div>
					<label
						for="message"
						class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
					>
						Message <span class="text-red-500">*</span>
					</label>
					<textarea
						id="message"
						name="message"
						rows="5"
						bind:value={formState.message}
						class="w-full resize-none rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-vasco-500 focus:ring-0 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						aria-required="true"
						aria-invalid={errors.message ? 'true' : 'false'}
						aria-describedby={errors.message ? 'message-error' : undefined}
					></textarea>
					{#if errors.message}
						<p id="message-error" class="mt-2 text-sm text-red-600 dark:text-red-400">
							{errors.message}
						</p>
					{/if}
					<div class="mt-2 text-right text-xs text-slate-500 dark:text-slate-400">
						{formState.message.length} characters
					</div>
				</div>

				<div class="flex items-center justify-between pt-4">
					<button
						type="submit"
						disabled={formStatus === 'submitting'}
						class="inline-flex items-center rounded-lg bg-vasco-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-vasco-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-vasco-500 dark:hover:bg-vasco-600"
					>
						{#if formStatus === 'submitting'}
							<svg
								class="mr-2 -ml-1 h-4 w-4 animate-spin"
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
						class="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
					>
						Clear form
					</button>
				</div>
			</form>
		{/if}
	{/if}
</section>
