import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Contact Me',
		description: 'Use the form below to get in touch with me.',
		openGraph: {
			title: 'Contact Me',
			description: 'Use the form below to get in touch with me.'
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
