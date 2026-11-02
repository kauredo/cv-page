import { defineEnvVars } from '@sveltejs/kit/env';

// Optional at startup, so builds and local dev run without them. The contact endpoint
// answers 503 until all three are set.
const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
	AHASEND_API_KEY: {
		schema: optional,
		description: 'AhaSend API v2 key, used to send contact form messages'
	},
	AHASEND_ACCOUNT_ID: {
		schema: optional,
		description: 'AhaSend account ID (a UUID, from the AhaSend dashboard)'
	},
	AHASEND_FROM_ADDRESS: {
		schema: optional,
		description: 'Sender address for contact form messages, on a domain verified in AhaSend'
	}
});
