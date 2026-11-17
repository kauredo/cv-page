<script lang="ts">
	import cv from '#lib/data/cv.json';
	import CvDocument from '#lib/components/CvDocument.svelte';
	import { cvProfileJsonLd, jsonLdScript } from '#lib/jsonld.js';
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD, escaped by jsonLdScript -->
	{@html jsonLdScript(cvProfileJsonLd('/cv', 'en'))}
</svelte:head>

<CvDocument {cv} lang="en" />
