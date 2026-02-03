import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import projects from '$lib/data/projects.json';

export const load: PageLoad = async () => {
	const pageMetaTags = Object.freeze({
		title: 'Projects',
		description:
			'Web projects built with Ruby on Rails, React, TypeScript, and more. SaaS platforms, mobile apps, and open source contributions.',
		openGraph: {
			title: 'Projects — VascoKF',
			description:
				'Web projects built with Ruby on Rails, React, TypeScript, and more. SaaS platforms, mobile apps, and open source contributions.'
		},
		twitter: {
			title: 'Projects — VascoKF',
			description:
				'Web projects built with Ruby on Rails, React, TypeScript, and more. SaaS platforms, mobile apps, and open source.'
		}
	}) satisfies MetaTagsProps;

	return {
		pageMetaTags,
		projects
	};
};
