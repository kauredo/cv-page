import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ url }) => {
	const baseMetaTags = Object.freeze({
		title: 'My Portfolio',
		titleTemplate: '%s | VascoKF',
		description:
			"Vasco KF's personal developer portfolio showcasing his latest web projects, skills and experience.",
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_IE',
			title: 'VascoKF — Portfolio',
			description: 'Showcasing my latest web projects, skills and experience.',
			siteName: 'VascoKF',
			images: [
				{
					url: 'https://www.vascokf.com/images/portfolio.png',
					alt: 'VascoKF — Portfolio',
					secureUrl: 'https://www.vascokf.com/images/portfolio.png',
					type: 'image/png'
				}
			]
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
