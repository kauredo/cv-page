import type { MetaTagsProps } from 'svelte-meta-tags';

export const prerender = true;

const TITLE = 'Vasco Kaufmann Figueiredo, Full Stack Developer and CTO';
const DESCRIPTION =
	'Vasco Kaufmann Figueiredo is a full stack developer in Lisbon and co-founder and CTO of UpSpeech, building with Ruby on Rails, React and TypeScript.';

export const load = ({ url }) => {
	const baseUrl = 'https://www.vascokf.com';
	const baseMetaTags = Object.freeze({
		title: TITLE,
		titleTemplate: '%s | VascoKF',
		description: DESCRIPTION,
		canonical: `${baseUrl}${url.pathname}`,
		openGraph: {
			type: 'website',
			url: `${baseUrl}${url.pathname}`,
			locale: 'en_IE',
			title: TITLE,
			description: DESCRIPTION,
			siteName: 'VascoKF',
			images: [
				{
					url: `${baseUrl}/images/portfolio.webp`,
					alt: 'Vasco Kaufmann Figueiredo, portfolio',
					secureUrl: `${baseUrl}/images/portfolio.webp`,
					type: 'image/webp',
					width: 1200,
					height: 630
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image' as const,
			title: TITLE,
			description: DESCRIPTION,
			image: `${baseUrl}/images/portfolio.webp`,
			imageAlt: 'Vasco Kaufmann Figueiredo, portfolio'
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
