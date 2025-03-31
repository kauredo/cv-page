type GTagEvent = {
	action: string;
	category: string;
	label: string;
	value: number;
};

export const GA_TRACKING_ID = 'G-55TK9L8WDT'; // Replace with your GA4 measurement ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('config', GA_TRACKING_ID, {
			page_path: url
		});
	}
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }: GTagEvent) {
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value
		});
	}
}
