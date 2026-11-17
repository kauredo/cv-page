import type { MetaTagsProps } from 'svelte-meta-tags';

const DESCRIPTION =
	'What vascokf.com collects: the contact form, cookieless analytics, and how to have a message deleted.';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Privacy',
		description: DESCRIPTION,
		openGraph: { title: 'Privacy | VascoKF', description: DESCRIPTION },
		twitter: { title: 'Privacy | VascoKF', description: DESCRIPTION }
	}) satisfies MetaTagsProps;

	return { pageMetaTags };
};
