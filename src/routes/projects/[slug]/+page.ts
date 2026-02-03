import type { PageLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import projects from '$lib/data/projects.json';
import type { Project } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const projectData = projects.find((p) => p.slug === params.slug);

	if (!projectData) {
		error(404, 'Project not found');
	}

	const project: Project = projectData;

	const projectImage =
		project.images && project.images.length > 0 && project.images[0].length > 0
			? project.images[0]
			: '/images/portfolio.webp';
	const projectImageUrl = `https://www.vascokf.com${projectImage}`;
	const pageMetaTags = Object.freeze({
		title: project.title,
		description: project.description,
		openGraph: {
			title: `${project.title} — VascoKF`,
			description: project.description,
			images: [
				{
					url: projectImageUrl,
					alt: project.title,
					secureUrl: projectImageUrl,
					type: 'image/webp',
					width: 1200,
					height: 630
				}
			]
		},
		twitter: {
			title: `${project.title} — VascoKF`,
			description: project.description,
			image: projectImageUrl,
			imageAlt: project.title
		}
	}) satisfies MetaTagsProps;

	return { pageMetaTags, project };
};
