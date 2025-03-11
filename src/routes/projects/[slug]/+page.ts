import type { PageLoad } from './$types';
import projects from '$lib/data/projects.json';
import type { Project } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
	const projectData = projects.find((p) => p.slug === params.slug);

	if (!projectData) {
		throw new Error('Project not found');
	}

	const project: Project = projectData;

	return { project };
};
