import type { Project } from './types';

const SITE_URL = 'https://www.vascokf.com';

/**
 * A complete `<script type="application/ld+json">` tag for `{@html}`. The JSON
 * has <, > and & unicode-escaped so a string value can't break out of the tag.
 */
export function jsonLdScript(data: unknown): string {
	const json = JSON.stringify(data)
		.replaceAll('<', '\\u003c')
		.replaceAll('>', '\\u003e')
		.replaceAll('&', '\\u0026');
	return `<script type="application/ld+json">${json}</script>`;
}

/**
 * Per-project `SoftwareApplication` JSON-LD for a project detail page.
 * Complements the site-wide `Person` schema in the root layout (author ref).
 */
export function projectJsonLd(project: Project): Record<string, unknown> {
	const pageUrl = `${SITE_URL}/projects/${project.slug}`;
	const screenshots = project.images.map((img) =>
		img.startsWith('http') ? img : `${SITE_URL}${img}`
	);

	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: project.title,
		description: project.description,
		url: project.link ?? pageUrl,
		applicationCategory: 'WebApplication',
		operatingSystem: 'Web',
		image: screenshots[0] ?? `${SITE_URL}/og/${project.slug}.png`,
		...(screenshots.length > 0 && { screenshot: screenshots }),
		dateModified: project.updatedAt,
		...(project.stack.length > 0 && { keywords: project.stack.join(', ') }),
		author: {
			'@type': 'Person',
			name: 'Vasco Kaufmann Figueiredo',
			url: SITE_URL
		},
		...(project.github && { sameAs: [project.github] })
	};
}
