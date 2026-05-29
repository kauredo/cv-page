// Static-weight font instances for Satori. Satori's font parser rejects
// variable fonts (its fvar parser trips), so these are single-weight woff
// instances pulled from Fontsource — Fraunces 700 (display) + Instrument
// Sans 500 (body), matching the site's brand type.
import fraunces from './fonts/Fraunces-700.woff?inline';
import instrument from './fonts/InstrumentSans-500.woff?inline';

// Vite inlines the woffs as base64 data URIs at build time, so the font bytes
// ride inside the prerendered OG route's bundle — no runtime fs/network read.
function dataUriToArrayBuffer(uri: string): ArrayBuffer {
	const base64 = uri.slice(uri.indexOf(',') + 1);
	const buf = Buffer.from(base64, 'base64');
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
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
	}
];
