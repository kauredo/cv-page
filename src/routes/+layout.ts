import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ url }) => {
	const baseUrl = 'https://www.vascokf.com';
	const baseMetaTags = Object.freeze({
		title: 'My Portfolio',
		titleTemplate: '%s | VascoKF',
		description:
			"Vasco KF's personal developer portfolio showcasing his latest web projects, skills and experience.",
		canonical: `${baseUrl}${url.pathname}`,
		openGraph: {
			type: 'website',
			url: `${baseUrl}${url.pathname}`,
			locale: 'en_IE',
			title: 'VascoKF — Portfolio',
			description: 'Showcasing my latest web projects, skills and experience.',
			siteName: 'VascoKF',
			images: [
				{
					url: `${baseUrl}/images/portfolio.webp`,
					alt: 'VascoKF — Portfolio',
					secureUrl: `${baseUrl}/images/portfolio.webp`,
					type: 'image/webp'
				}
			]
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
