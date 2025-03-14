<script lang="ts">
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';

	export let isOpen: boolean = false;
	export let images: string[] = [];
	export let imageSrc: string = '';
	export let altText: string = '';
	export let closeModal: () => void;

	function localCloseModal() {
		closeModal();
		isOpen = false;
	}

	function closeIfClickedOutside(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			localCloseModal();
		}
	}

	onMount(() => {
		on(document, 'keydown', (e) => {
			if (e.key === 'Escape') {
				localCloseModal();
			}

			if (e.key === 'ArrowRight') {
				// Next image
				if (images.length > 0) {
					const currentIndex = images.indexOf(imageSrc);
					const nextIndex = currentIndex + 1;
					imageSrc = images[nextIndex % images.length];
				}
			}

			if (e.key === 'ArrowLeft') {
				// Previous image
				if (images.length > 0) {
					const currentIndex = images.indexOf(imageSrc);
					const prevIndex = currentIndex - 1;
					imageSrc = images[(prevIndex + images.length) % images.length];
				}
			}
		});
	});
</script>

{#if isOpen}
	<div class="fixed inset-0 z-30 flex items-center justify-center">
		<!-- Background Div with Opacity -->
		<div
			class="absolute inset-0 bg-black opacity-80"
			on:keydown={(e) => e.preventDefault()}
			on:click={closeIfClickedOutside}
			aria-modal="true"
			role="dialog"
			tabindex="-1"
		></div>

		<!-- Next and Previous Buttons -->
		<button
			class="bg-opacity-50 absolute top-1/2 left-4 z-40 h-10 w-10 -translate-y-1/2 transform rounded-full bg-stone-50 p-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
			on:click={() => {
				const currentIndex = images.indexOf(imageSrc);
				const prevIndex = currentIndex - 1;
				imageSrc = images[(prevIndex + images.length) % images.length];
			}}
			aria-label="Previous Image"
		>
			{'<'}
		</button>
		<button
			class="bg-opacity-50 absolute top-1/2 right-8 z-40 h-10 w-10 -translate-y-1/2 transform rounded-full bg-stone-50 p-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
			on:click={() => {
				const currentIndex = images.indexOf(imageSrc);
				const nextIndex = currentIndex + 1;
				imageSrc = images[nextIndex % images.length];
			}}
			aria-label="Next Image"
		>
			{'>'}
		</button>

		<!-- Modal Content -->
		<div
			class="relative mx-4 aspect-3/4 max-h-full w-full max-w-7xl rounded-xl bg-stone-50 shadow-lg sm:aspect-auto"
		>
			<img src={imageSrc} alt={altText} class="h-full w-full rounded object-cover object-top" />
		</div>
	</div>
{/if}
