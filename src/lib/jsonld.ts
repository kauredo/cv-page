import type { Project } from './types';

const SITE_URL = 'https://www.vascokf.com';

/** Absolute URL for a site-relative asset path (e.g. "/images/x.webp"). */
function absolute(path: string, baseUrl: string): string {
	return path.startsWith('http') ? path : `${baseUrl}${path}`;
}

/**
 * Per-project `SoftwareApplication` JSON-LD for a project detail page.
 * Complements the site-wide `Person` schema in the root layout (author ref).
 */
export function projectJsonLd(project: Project, baseUrl: string = SITE_URL): Record<string, unknown> {
	const pageUrl = `${baseUrl}/projects/${project.slug}`;
	const screenshots = project.images.map((img) => absolute(img, baseUrl));

	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: project.title,
		description: project.description,
		url: project.link ?? pageUrl,
		applicationCategory: 'WebApplication',
		operatingSystem: 'Web',
		image: screenshots[0] ?? `${baseUrl}/og/${project.slug}.png`,
		...(screenshots.length > 0 && { screenshot: screenshots }),
		dateModified: project.updatedAt,
		...(project.stack.length > 0 && { keywords: project.stack.join(', ') }),
		author: {
			'@type': 'Person',
			name: 'Vasco Kaufmann Figueiredo',
			url: baseUrl
		},
		...(project.github && { sameAs: [project.github] })
	};
}
