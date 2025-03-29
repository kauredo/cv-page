import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import cv from '$lib/data/cv.json';

export const load: PageLoad = async () => {
	const pageMetaTags = Object.freeze({
		title: `${cv.basics.name} - CV`,
		description: cv.basics.summary,
		openGraph: {
			title: `${cv.basics.name} - CV`,
			description: cv.basics.summary,
			type: 'profile'
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
