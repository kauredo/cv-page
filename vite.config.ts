import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const sha256 = (text: string) =>
	`sha256-${createHash('sha256').update(text).digest('base64')}` as const;

// SvelteKit hashes the scripts it generates. The theme and GA scripts in app.html are
// hashed here, so editing them keeps the policy in step.
const appHtmlScripts = [
	...readFileSync('src/app.html', 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)
].map(([, body]) => sha256(body));

const google = ['https://www.googletagmanager.com', 'https://*.google-analytics.com'] as const;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: vitePreprocess(),

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),

			// Prerendered pages get this as a <meta> tag. Vercel Analytics loads from /_vercel.
			csp: {
				mode: 'hash',
				directives: {
					'default-src': ['self'],
					// The font stylesheet's onload="this.media='all'" needs its own hash.
					'script-src': [
						'self',
						...appHtmlScripts,
						'unsafe-hashes',
						sha256("this.media='all'"),
						'https://www.googletagmanager.com'
					],
					'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
					'font-src': ['self', 'https://fonts.gstatic.com'],
					'img-src': ['self', 'data:', 'https://avatars.githubusercontent.com', ...google],
					'connect-src': ['self', ...google, 'https://*.analytics.google.com'],
					'object-src': ['none'],
					'base-uri': ['self'],
					'form-action': ['self']
				}
			}
		})
	],
	server: { port: 4003 }
});
