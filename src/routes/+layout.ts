import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = ({ url }) => {
	const baseUrl = 'https://www.vascokf.com';
	const baseMetaTags = Object.freeze({
		title: 'Vasco KF — Full Stack Developer',
		titleTemplate: '%s | VascoKF',
		description:
			'Full-stack developer building clean, functional web apps with Ruby on Rails, React, and TypeScript. View my projects and experience.',
		canonical: `${baseUrl}${url.pathname}`,
		openGraph: {
			type: 'website',
			url: `${baseUrl}${url.pathname}`,
			locale: 'en_IE',
			title: 'Vasco KF — Full Stack Developer',
			description:
				'Full-stack developer building clean, functional web apps. View my projects, skills, and experience.',
			siteName: 'VascoKF',
			images: [
				{
					url: `${baseUrl}/images/portfolio.webp`,
					alt: 'Vasco KF — Full Stack Developer Portfolio',
					secureUrl: `${baseUrl}/images/portfolio.webp`,
					type: 'image/webp',
					width: 1200,
					height: 630
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image',
			title: 'Vasco KF — Full Stack Developer',
			description:
				'Full-stack developer building clean, functional web apps with Ruby on Rails, React, and TypeScript.',
			image: `${baseUrl}/images/portfolio.webp`,
			imageAlt: 'Vasco KF — Full Stack Developer Portfolio'
		}
	}) satisfies MetaTagsProps;

	return {
		baseMetaTags
	};
};
