import type { MetaTagsProps } from 'svelte-meta-tags';
import type cvEn from '#lib/data/cv.json';

const image = 'https://www.vascokf.com/images/cv.webp';

export function cvMetaTags(cv: typeof cvEn, locale: string) {
	const title = `${cv.basics.name} - CV`;

	return Object.freeze({
		title,
		description: cv.basics.summary,
		openGraph: {
			title,
			description: cv.basics.summary,
			type: 'profile',
			locale,
			images: [
				{
					url: image,
					alt: title,
					secureUrl: image,
					type: 'image/webp',
					width: 1200,
					height: 630
				}
			]
		},
		twitter: {
			title,
			description: cv.basics.summary,
			image,
			imageAlt: title
		}
	}) satisfies MetaTagsProps;
}
