import projectsData from '$lib/data/projects.json';

export async function GET() {
	const pages = [
		{ url: '/', lastmod: '2025-03-17', changefreq: 'monthly', priority: '1.0' },
		{ url: '/projects', lastmod: '2025-03-17', changefreq: 'monthly', priority: '0.8' },
		{ url: '/contact', lastmod: '2025-03-17', changefreq: 'monthly', priority: '0.8' }
	];

	projectsData.forEach((project) => {
		pages.push({
			url: `/projects/${project.slug}`,
			lastmod: project.updatedAt,
			changefreq: 'monthly',
			priority: '0.5'
		});
	});

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
				.map(
					(page) => `
            <url>
              <loc>https://www.vascokf.com${page.url}</loc>
              <lastmod>${page.lastmod}</lastmod>
              <changefreq>${page.changefreq}</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `
				)
				.join('')}
    </urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
