<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment'; // Import browser check
	import { on } from 'svelte/events';

	export let isOpen: boolean = false;
	export let images: string[] = [];
	export let imageSrc: string = '';
	export let altText: string = '';
	export let closeModal: () => void;

	let currentIndex = 0;
	let isLoading = true;
	let modalElement: HTMLElement;

	function localCloseModal() {
		closeModal();
		isOpen = false;
	}

	function closeIfClickedOutside(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			localCloseModal();
		}
	}

	function showPrevImage() {
		if (images.length <= 1) return;
		if (isLoading) return;

		isLoading = true;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		imageSrc = images[currentIndex];
	}

	function showNextImage() {
		if (images.length <= 1) return;
		if (isLoading) return;

		isLoading = true;
		currentIndex = (currentIndex + 1) % images.length;
		imageSrc = images[currentIndex];
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) return;

		if (e.key === 'Escape') {
			localCloseModal();
		} else if (e.key === 'ArrowRight') {
			showNextImage();
		} else if (e.key === 'ArrowLeft') {
			showPrevImage();
		}
	}

	function handleImageLoad() {
		isLoading = false;
	}

	$: {
		// Update currentIndex when imageSrc changes from outside
		if (isOpen && images.includes(imageSrc)) {
			currentIndex = images.indexOf(imageSrc);
		}
	}

	// Trap focus within modal
	function setupFocusTrap() {
		if (!modalElement) return;

		const focusableElements = modalElement.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		if (focusableElements.length > 0) {
			(focusableElements[0] as HTMLElement).focus();
		}
	}

	let handleBodyScroll = () => {};

	onMount(() => {
		// Only add event listeners in the browser
		if (browser) {
			document.addEventListener('keydown', handleKeydown);

			// Define our scroll handling here after we know we're in a browser
			handleBodyScroll = () => {
				if (isOpen) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = '';
				}
			};

			// Initial call
			handleBodyScroll();
		}
	});

	onDestroy(() => {
		// Only run cleanup in browser
		if (browser) {
			document.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = '';
			// Remove scroll handling
		}
	});

	// Watch for changes to isOpen and update accordingly
	$: if (browser && isOpen) {
		setTimeout(setupFocusTrap, 100);
		document.body.style.overflow = 'hidden';

		// Set current index
		if (images.includes(imageSrc)) {
			currentIndex = images.indexOf(imageSrc);
		} else if (images.length > 0) {
			currentIndex = 0;
			imageSrc = images[0];
		}
	} else if (browser) {
		document.body.style.overflow = '';
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		bind:this={modalElement}
		on:keydown={handleKeydown}
	>
		<!-- Background overlay -->
		<div
			class="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
			on:click={closeIfClickedOutside}
			aria-hidden="true"
		></div>

		<div
			class="relative z-50 mx-4 flex max-h-[90vh] w-full max-w-5xl flex-col rounded-lg bg-white shadow-2xl dark:bg-gray-900"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<!-- Header with close button -->
			<div class="flex items-center justify-between border-b p-4 dark:border-gray-700">
				<h2 id="modal-title" class="text-lg font-medium dark:text-white">
					{altText || `Image ${currentIndex + 1} of ${images.length}`}
				</h2>
				<button
					class="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
					on:click={localCloseModal}
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Image container -->
			<div class="relative flex-1 overflow-hidden">
				{#if isLoading}
					<div
						class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
					>
						<div
							class="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
						></div>
					</div>
				{/if}

				<img
					src={imageSrc}
					alt={altText}
					class="h-full w-full object-cover p-4"
					on:load={handleImageLoad}
				/>

				{#if images.length > 1}
					<!-- Navigation controls -->
					<button
						class="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
						on:click={showPrevImage}
						aria-label="Previous image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<button
						class="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
						on:click={showNextImage}
						aria-label="Next image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				{/if}
			</div>

			<!-- Footer with pagination info -->
			{#if images.length > 1}
				<div class="border-t p-3 text-center dark:border-gray-700">
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{currentIndex + 1} / {images.length}
					</span>
				</div>
			{/if}
		</div>
	</div>
{/if}
