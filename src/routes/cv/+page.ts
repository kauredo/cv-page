import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
// import cv from '$lib/data/cv.json';
import cv from '$lib/data/cv_pt.json';

export const load: PageLoad = async () => {
	const pageMetaTags = Object.freeze({
		title: `${cv.basics.name} - CV`,
		description: cv.basics.summary,
		openGraph: {
			title: `${cv.basics.name} - CV`,
			description: cv.basics.summary,
			type: 'profile',
			images: cv.basics.image
				? [
						{
							url: cv.basics.image,
							alt: `${cv.basics.name} - CV`,
							secureUrl: cv.basics.image,
							type: 'image/webp'
						}
					]
				: []
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
