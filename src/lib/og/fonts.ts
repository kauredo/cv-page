// Static-weight font instances for Satori. Satori's font parser rejects
// variable fonts (its fvar parser trips), so these are single-weight woff
// instances pulled from Fontsource — Fraunces 700 (display), Instrument
// Sans 500 (body), JetBrains Mono 600 (eyebrow/labels), matching the site's
// brand type (app.css --font-display / --font-body / --font-mono).
import fraunces from './fonts/Fraunces-700.woff?inline';
import instrument from './fonts/InstrumentSans-500.woff?inline';
import jetbrainsMono from './fonts/JetBrainsMono-600.woff?inline';

// Vite inlines the woffs as base64 data URIs at build time, so the font bytes
// ride inside the prerendered OG route's bundle — no runtime fs/network read.
function dataUriToArrayBuffer(uri: string): ArrayBuffer {
	const base64 = uri.slice(uri.indexOf(',') + 1);
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes.buffer;
}

export const OG_FONTS = [
	{
		name: 'Fraunces',
		data: dataUriToArrayBuffer(fraunces),
		weight: 700 as const,
		style: 'normal' as const
	},
	{
		name: 'Instrument Sans',
		data: dataUriToArrayBuffer(instrument),
		weight: 500 as const,
		style: 'normal' as const
	},
	{
		name: 'JetBrains Mono',
		data: dataUriToArrayBuffer(jetbrainsMono),
		weight: 600 as const,
		style: 'normal' as const
	}
];
