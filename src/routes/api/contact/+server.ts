import { json } from '@sveltejs/kit';
import { AHASEND_ACCOUNT_ID, AHASEND_API_KEY, AHASEND_FROM_ADDRESS } from '$app/env/private';
import type { RequestHandler } from './$types';

// The rest of the site is prerendered; this endpoint runs on the server.
export const prerender = false;

const TO = 'vasco.kf@gmail.com';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// AhaSend reads {{ }}, {% %} and {# #} as template syntax and rejects the message, so a
// zero-width space breaks those pairs up in whatever the visitor typed.
const plain = (text: string) => text.replace(/\{(?=[{%#])/g, '{​');

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const name = String(form.get('name') ?? '').trim();
	const email = String(form.get('email') ?? '').trim();
	const message = String(form.get('message') ?? '').trim();

	// Honeypot: people never see this field, bots fill it in. Pretend it worked.
	if (form.get('website')) return json({ ok: true });

	if (!name || !EMAIL.test(email) || message.length < 10 || message.length > 5000) {
		return json(
			{ error: 'Add your name, a valid email and a message of 10 to 5000 characters.' },
			{ status: 400 }
		);
	}

	if (!AHASEND_API_KEY || !AHASEND_ACCOUNT_ID || !AHASEND_FROM_ADDRESS) {
		console.error('Contact form: the AhaSend environment variables are not set');
		return json(
			{ error: `The form isn't working right now. Email me at ${TO} instead.` },
			{ status: 503 }
		);
	}

	const response = await fetch(
		`https://api.ahasend.com/v2/accounts/${AHASEND_ACCOUNT_ID}/messages`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${AHASEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: { email: AHASEND_FROM_ADDRESS, name: 'vascokf.com' },
				recipients: [{ email: TO }],
				reply_to: { email, name: plain(name) },
				subject: plain(`New message from ${name}`),
				text_content: plain(`From ${name} <${email}>, via vascokf.com/contact\n\n${message}`)
			})
		}
	);

	if (!response.ok) {
		// Status only: error bodies can echo the request.
		console.error(`Contact form: AhaSend request failed with ${response.status}`);
		return json(
			{ error: `Your message didn't go through. Try again, or email me at ${TO}.` },
			{ status: 502 }
		);
	}

	return json({ ok: true });
};
