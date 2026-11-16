import type { MetaTagsProps } from 'svelte-meta-tags';
import type cvEn from '#lib/data/cv.json';

const image = 'https://www.vascokf.com/images/cv.webp';

export function cvMetaTags(cv: typeof cvEn, locale: string, title: string) {
	return Object.freeze({
		title,
		// The title doubles as the file name when the CV is saved as a PDF, so no site suffix.
		titleTemplate: '%s',
		description: cv.basics.summary,
		additionalLinkTags: [
			{ rel: 'alternate', hreflang: 'en', href: 'https://www.vascokf.com/cv' },
			{ rel: 'alternate', hreflang: 'pt', href: 'https://www.vascokf.com/cv/pt' },
			{ rel: 'alternate', hreflang: 'x-default', href: 'https://www.vascokf.com/cv' }
		],
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
