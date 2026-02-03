import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags = Object.freeze({
		title: 'Contact',
		description:
			'Get in touch for freelance projects, collaborations, or just to say hi. I build web apps with Rails, React, and TypeScript.',
		openGraph: {
			title: 'Contact — VascoKF',
			description:
				'Get in touch for freelance projects, collaborations, or just to say hi. I build web apps with Rails, React, and TypeScript.'
		},
		twitter: {
			title: 'Contact — VascoKF',
			description:
				'Get in touch for freelance projects, collaborations, or just to say hi.'
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags
	};
};
