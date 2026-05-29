import { error } from '@sveltejs/kit';
import projects from '$lib/data/projects.json';
import { renderProjectOg } from '$lib/og/renderProjectOg';
import type { RequestHandler, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const GET: RequestHandler = async ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		error(404, 'Project not found');
	}

	const png = await renderProjectOg(project);

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=604800, immutable'
		}
	});
};
