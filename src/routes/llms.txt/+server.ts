import projects from '#lib/data/projects.json';

export const prerender = true;

const baseUrl = 'https://www.vascokf.com';

// UpSpeech is a startup, not a side project: name the role, not the product.
const line = (p: (typeof projects)[number]) =>
	p.slug === 'upspeech'
		? `- [UpSpeech](${baseUrl}/projects/upspeech): where I am co-founder and CTO.`
		: `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`;

export function GET() {
	const body = `# Vasco Kaufmann Figueiredo

> Full stack developer in Lisbon, Portugal, and co-founder and CTO of UpSpeech. Six years of shipping Ruby on Rails and React products at agencies, at a health-tech startup and on my own.

This is my portfolio. Every project below has a page with screenshots, the stack and a link to the live product where there is one.

## About

- [CV in English](${baseUrl}/cv)
- [CV in Portuguese](${baseUrl}/cv/pt)
- [Contact form](${baseUrl}/contact)
- [GitHub](https://github.com/kauredo)
- [LinkedIn](https://www.linkedin.com/in/vascokf)

## Selected work

${projects.map(line).join('\n')}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
