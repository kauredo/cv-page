import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { OG_FONTS } from './fonts';
import type { Project } from '$lib/types';

// Brand-styled 1200x630 OG card, rendered only by Satori at build time (the
// route is prerendered), never hydrated. Satori supports a flexbox subset, so
// every container is display:flex. Tokens follow the "vasco" brand (app.css):
// vasco blue (500/800) + hoop orange (500) on a light slate ground, Fraunces
// display + JetBrains Mono eyebrow.
const INK = '#0f172a';
const MUTE = '#475569';
const FAINT = '#94a3b8';
const VASCO = '#59a7ff'; // vasco-500
const VASCO_DEEP = '#1f4fad'; // vasco-800
const HOOP = '#f97316'; // hoop-500
const BG = '#f7f9fc';

type El = { type: string; props: Record<string, unknown> };
function h(type: string, style: Record<string, unknown>, children?: unknown): El {
	return {
		type,
		props: { style: { display: 'flex', ...style }, ...(children !== undefined ? { children } : {}) }
	};
}

function truncate(text: string, max: number): string {
	if (!text || text.length <= max) return text || '';
	const clipped = text.slice(0, max - 1);
	const lastSpace = clipped.lastIndexOf(' ');
	return (lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped).trimEnd() + '…';
}

function card(project: Project): El {
	const eyebrow = (project.stack ?? []).slice(0, 3).join('  ·  ').toUpperCase() || 'PROJECT';
	const headlineSize = project.title.length > 22 ? 60 : 72;

	return h(
		'div',
		{
			width: '100%',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'space-between',
			backgroundColor: BG,
			color: INK,
			padding: '70px 80px',
			fontFamily: 'Instrument Sans',
			position: 'relative',
			overflow: 'hidden'
		},
		[
			// Decorative brand circles (Satori has no blur, so soft translucent fills).
			h('div', {
				position: 'absolute',
				top: -150,
				right: -120,
				width: 420,
				height: 420,
				borderRadius: '50%',
				backgroundColor: 'rgba(89, 167, 255, 0.16)'
			}),
			h('div', {
				position: 'absolute',
				bottom: -90,
				right: 120,
				width: 200,
				height: 200,
				borderRadius: '50%',
				backgroundColor: 'rgba(249, 115, 22, 0.12)'
			}),

			// Eyebrow: accent bar + stack.
			h('div', { alignItems: 'center' }, [
				h('div', {
					width: 52,
					height: 6,
					borderRadius: 3,
					backgroundColor: VASCO,
					marginRight: 20
				}),
				h(
					'div',
					{
						fontFamily: 'JetBrains Mono',
						fontSize: 20,
						fontWeight: 600,
						letterSpacing: 1,
						color: VASCO_DEEP
					},
					eyebrow
				)
			]),

			// Headline + description.
			h('div', { flexDirection: 'column' }, [
				h(
					'div',
					{
						fontFamily: 'Fraunces',
						fontWeight: 700,
						fontSize: headlineSize,
						lineHeight: 1.05,
						color: INK,
						marginBottom: 22,
						maxWidth: 1000
					},
					project.title
				),
				h(
					'div',
					{ fontSize: 30, fontWeight: 500, lineHeight: 1.35, color: MUTE, maxWidth: 940 },
					truncate(project.description, 118)
				)
			]),

			// Footer: wordmark + domain.
			h('div', { justifyContent: 'space-between', alignItems: 'flex-end' }, [
				h('div', { alignItems: 'center' }, [
					h('div', {
						width: 16,
						height: 16,
						borderRadius: '50%',
						backgroundColor: HOOP,
						marginRight: 14
					}),
					h(
						'div',
						{ fontFamily: 'Fraunces', fontWeight: 700, fontSize: 34, color: INK },
						'Vasco KF'
					)
				]),
				h(
					'div',
					{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 600, color: FAINT },
					'vascokf.com'
				)
			])
		]
	);
}

export async function renderProjectOg(project: Project): Promise<Uint8Array<ArrayBuffer>> {
	const svg = await satori(card(project) as unknown as Parameters<typeof satori>[0], {
		width: 1200,
		height: 630,
		fonts: OG_FONTS
	});
	// Copy into a fresh ArrayBuffer-backed Uint8Array so the bytes are a valid
	// Response body type — resvg's Buffer is typed Uint8Array<ArrayBufferLike>,
	// which TS won't accept as BodyInit.
	return new Uint8Array(new Resvg(svg).render().asPng()) as Uint8Array<ArrayBuffer>;
}
