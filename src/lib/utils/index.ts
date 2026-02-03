/**
 * Utility functions for the CV page
 */

/**
 * Debounce a function to prevent rapid successive calls
 */
export function debounce<T extends (...args: unknown[]) => void>(
	fn: T,
	ms: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), ms);
	};
}

/**
 * Throttle a function to limit call frequency
 */
export function throttle<T extends (...args: unknown[]) => void>(
	fn: T,
	ms: number
): (...args: Parameters<T>) => void {
	let lastCall = 0;
	return (...args: Parameters<T>) => {
		const now = Date.now();
		if (now - lastCall >= ms) {
			lastCall = now;
			fn(...args);
		}
	};
}

/**
 * Create an intersection observer handler for use with svelte-inview
 * Returns a handler function that sets visibility state for items by index
 */
export function createInviewHandler(visibleItems: Record<number, boolean>) {
	return (index: number) => {
		return (event: CustomEvent<{ entry: IntersectionObserverEntry }>) => {
			const { isIntersecting } = event.detail.entry;
			if (isIntersecting) {
				visibleItems[index] = true;
			}
		};
	};
}
