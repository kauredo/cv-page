import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = ({ event, resolve }) => {
	const lang = event.url.pathname === '/cv/pt' ? 'pt' : 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
