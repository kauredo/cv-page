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
			type: 'profile',
			images: [
				{
					url: `https://www.vascokf.com/images/cv.webp`,
					alt: `${cv.basics.name} - CV`,
					secureUrl: `https://www.vascokf.com/images/cv.webp`,
					type: 'image/webp'
				}
			]
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
