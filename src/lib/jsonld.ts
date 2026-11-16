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

const person = {
	'@type': 'Person',
	name: 'Vasco Kaufmann Figueiredo',
	alternateName: 'VascoKF',
	url: SITE_URL,
	image: `${SITE_URL}/images/me.webp`,
	jobTitle: 'Co-Founder and CTO',
	worksFor: { '@type': 'Organization', name: 'UpSpeech' },
	address: { '@type': 'PostalAddress', addressLocality: 'Lisbon', addressCountry: 'PT' },
	contactPoint: {
		'@type': 'ContactPoint',
		contactType: 'professional inquiries',
		url: `${SITE_URL}/contact`,
		availableLanguage: ['English', 'Portuguese']
	},
	sameAs: ['https://github.com/kauredo', 'https://linkedin.com/in/vascokf'],
	knowsAbout: ['Ruby on Rails', 'React', 'TypeScript', 'SvelteKit', 'Web Development'],
	description: 'Full stack developer in Lisbon, and co-founder and CTO of UpSpeech.'
};

/** `Person` JSON-LD for the home page. */
export const personJsonLd = { '@context': 'https://schema.org', ...person };

/** `ProfilePage` JSON-LD for a CV page, with the person as its main entity. */
export function cvProfileJsonLd(path: string, inLanguage: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: `${SITE_URL}${path}`,
		inLanguage,
		mainEntity: person
	};
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
