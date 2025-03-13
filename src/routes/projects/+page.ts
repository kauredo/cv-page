import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import projects from '$lib/data/projects.json';

export const load: PageLoad = async () => {
	const pageMetaTags = Object.freeze({
		title: 'Projects',
		description: 'A collection of my latest web projects.',
		openGraph: {
			title: 'Projects',
			description: 'A collection of my latest web projects.'
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags,
		projects
	};
};
