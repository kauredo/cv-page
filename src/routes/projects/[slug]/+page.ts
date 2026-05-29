import type { PageLoad, EntryGenerator } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import projects from '$lib/data/projects.json';
import type { Project } from '$lib/types';
import { error } from '@sveltejs/kit';

export const entries: EntryGenerator = () => {
	return projects.map((p) => ({ slug: p.slug }));
};

export const load: PageLoad = async ({ params }) => {
	const projectData = projects.find((p) => p.slug === params.slug);

	if (!projectData) {
		error(404, 'Project not found');
	}

	const project: Project = projectData;

	// Branded OG card generated at build time by /og/[slug].png (Satori).
	const projectImageUrl = `https://www.vascokf.com/og/${project.slug}.png`;
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
					type: 'image/png',
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
