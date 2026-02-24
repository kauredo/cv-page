import projects from '$lib/data/projects.json';

export const prerender = true;

export function GET() {
	const baseUrl = 'https://www.vascokf.com';
	const today = new Date().toISOString().split('T')[0];

	const staticPages = [
		{ url: '/', changefreq: 'weekly', priority: '1.0' },
		{ url: '/projects', changefreq: 'weekly', priority: '0.9' },
		{ url: '/contact', changefreq: 'monthly', priority: '0.7' },
		{ url: '/cv', changefreq: 'monthly', priority: '0.8' }
	];

	const projectPages = projects.map((p) => ({
		url: `/projects/${p.slug}`,
		lastmod: p.updatedAt,
		changefreq: 'monthly',
		priority: '0.8'
	}));

	const allPages = [...staticPages, ...projectPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `	<url>
		<loc>${baseUrl}${page.url}</loc>
		<lastmod>${page.lastmod ?? today}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
