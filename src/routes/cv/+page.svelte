<script lang="ts">
	import cv from '#lib/data/cv.json';
	import CvDocument from '#lib/components/CvDocument.svelte';
</script>

<CvDocument {cv} lang="en" />
