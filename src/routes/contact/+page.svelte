<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

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

<section class="mx-auto max-w-2xl px-6 py-12 sm:py-16">
	<!-- Masthead breadcrumb -->
	<div
		class="mb-12 flex flex-wrap items-center justify-between gap-3 border-t border-b border-slate-900/10 py-2.5 dark:border-white/10"
	>
		<a
			href="/"
			class="group eyebrow hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 -mx-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:outline-none dark:text-slate-300"
		>
			<span
				aria-hidden="true"
				class="transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1 motion-reduce:transform-none"
				>←</span
			>
			Home
		</a>
		<span class="eyebrow text-slate-600 dark:text-slate-400">Get in touch</span>
	</div>

	<div class="mb-10">
		<p class="eyebrow text-vasco-700 dark:text-vasco-300 mb-6">Form / Direct message</p>
		<h1
			class="font-display text-5xl leading-[0.9] font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
		>
			Say <span class="text-hoop-500 dark:text-hoop-400 font-medium italic">hi</span><span
				class="text-hoop-500 dark:text-hoop-400">.</span
			>
		</h1>
		<p class="mt-6 max-w-md text-lg leading-relaxed text-slate-700 dark:text-slate-300">
			Got a project idea or just want to chat code or hoops?
			<span class="font-display text-slate-900 italic dark:text-white">I read everything.</span>
		</p>
	</div>

	{#if formStatus === 'success'}
		<div
			transition:fade
			class="bg-vasco-700 dark:bg-vasco-800 relative overflow-hidden rounded-2xl p-8 text-white sm:p-12"
		>
			<svg
				class="text-hoop-400/25 absolute -right-12 -bottom-20 h-72 w-72"
				viewBox="0 0 100 100"
				fill="none"
				aria-hidden="true"
			>
				<circle cx="50" cy="50" r="48" stroke="currentColor" stroke-width="0.6" />
				<circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="0.6" />
				<circle cx="50" cy="50" r="22" stroke="currentColor" stroke-width="0.6" />
				<circle cx="50" cy="50" r="2" fill="currentColor" />
			</svg>
			<p class="eyebrow text-hoop-300 relative mb-4">Status / 200 — sent</p>
			<h2 class="font-display relative text-4xl leading-[0.95] font-bold sm:text-5xl">
				Swish<span class="text-hoop-400">.</span>
			</h2>
			<p class="text-vasco-100 relative mt-4 max-w-md text-lg leading-relaxed">
				Thanks for reaching out. I'll get back to you soon.
			</p>
			<button
				on:click={resetForm}
				class="focus-visible:ring-hoop-400 focus-visible:ring-offset-vasco-700 relative mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors hover:border-white hover:bg-white hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:border-white active:bg-white active:text-slate-900"
			>
				Send another
			</button>
		</div>
	{:else if formStatus === 'error'}
		<div
			transition:fade
			class="mb-8 rounded-xl border border-red-300 bg-red-50 p-5 dark:border-red-800/60 dark:bg-red-950/30"
		>
			<p class="eyebrow mb-2 text-red-700 dark:text-red-400">Error</p>
			<p class="text-sm font-medium text-red-900 dark:text-red-200">{errorMessage}</p>
			<button
				on:click={() => (formStatus = 'idle')}
				class="mt-3 font-mono text-xs font-semibold tracking-wider text-red-700 uppercase underline transition-colors hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
			>
				Try again →
			</button>
		</div>
	{/if}

	{#if formStatus !== 'success'}
		<form
			method="POST"
			action="https://formspree.io/f/vasco.kf@gmail.com"
			on:submit={handleSubmit}
			class="space-y-7"
			novalidate
		>
			<div>
				<label for="name" class="eyebrow mb-2 block text-slate-700 dark:text-slate-300">
					Name <span class="text-hoop-500">*</span>
				</label>
				<input
					bind:this={nameInputRef}
					type="text"
					id="name"
					name="name"
					bind:value={formState.name}
					class="focus:border-vasco-500 focus:ring-vasco-500/20 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
					aria-required="true"
					aria-invalid={errors.name ? 'true' : 'false'}
					aria-describedby={errors.name ? 'name-error' : undefined}
				/>
				{#if errors.name}
					<p
						id="name-error"
						class="mt-2 font-mono text-xs tracking-wider text-red-600 uppercase dark:text-red-400"
					>
						{errors.name}
					</p>
				{/if}
			</div>

			<div>
				<label for="email" class="eyebrow mb-2 block text-slate-700 dark:text-slate-300">
					Email <span class="text-hoop-500">*</span>
				</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formState.email}
					class="focus:border-vasco-500 focus:ring-vasco-500/20 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
					aria-required="true"
					aria-invalid={errors.email ? 'true' : 'false'}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>
				{#if errors.email}
					<p
						id="email-error"
						class="mt-2 font-mono text-xs tracking-wider text-red-600 uppercase dark:text-red-400"
					>
						{errors.email}
					</p>
				{/if}
			</div>

			<div>
				<label for="message" class="eyebrow mb-2 block text-slate-700 dark:text-slate-300">
					Message <span class="text-hoop-500">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					rows="6"
					bind:value={formState.message}
					class="focus:border-vasco-500 focus:ring-vasco-500/20 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-base leading-relaxed text-slate-900 transition-colors placeholder:text-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
					aria-required="true"
					aria-invalid={errors.message ? 'true' : 'false'}
					aria-describedby={errors.message ? 'message-error' : undefined}
				></textarea>
				<div class="mt-2 flex items-center justify-between">
					{#if errors.message}
						<p
							id="message-error"
							class="font-mono text-xs tracking-wider text-red-600 uppercase dark:text-red-400"
						>
							{errors.message}
						</p>
					{:else}
						<span></span>
					{/if}
					<span class="font-mono text-xs text-slate-600 dark:text-slate-400">
						{formState.message.length} chars
					</span>
				</div>
			</div>

			<div class="flex items-center justify-between gap-4 pt-2">
				<button
					type="submit"
					disabled={formStatus === 'submitting'}
					class="group hover:bg-hoop-500 focus-visible:ring-hoop-500 dark:hover:bg-hoop-500 relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase shadow-[0_4px_0_0_var(--color-hoop-700)] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_0_var(--color-hoop-700)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
				>
					{#if formStatus === 'submitting'}
						<svg
							class="h-3.5 w-3.5 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							aria-hidden="true"
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
						Sending
					{:else}
						Send message
					{/if}
				</button>

				<button
					type="reset"
					on:click={() => {
						formState = { name: '', email: '', message: '' };
						errors = { name: '', email: '', message: '' };
					}}
					class="focus-visible:ring-vasco-500 font-mono text-xs tracking-wider text-slate-500 uppercase transition-colors hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:text-slate-900 dark:text-slate-500 dark:hover:text-white dark:active:text-white"
				>
					Clear
				</button>
			</div>
		</form>
	{/if}
</section>
