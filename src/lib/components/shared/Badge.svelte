<!--
	The secondary mark: the V. on an ink tile whose top edge falls left to right.
	In dark mode the tile turns white and the V ink, so it stays visible on the dark nav.
	The triangle is always hoop orange. Source: docs/brand/badge.svg.
-->
<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg class={className} viewBox="8 11.74 84 76.51" aria-hidden="true" focusable="false">
	<path
		class="fill-[#0b0d12] dark:fill-white"
		d="M23.34072,12.1029l59.23635,14.57813c5.53347,1.36179 9.42293,6.3245 9.42293,12.02308v37.17001c0,6.83829 -5.54353,12.38182 -12.38182,12.38182h-59.23635c-6.83829,0 -12.38182,-5.54353 -12.38182,-12.38182v-51.74814c0,-3.80482 1.74932,-7.39838 4.74399,-9.74541c2.99467,-2.34704 6.90215,-3.18691 10.59673,-2.27767z"
	/>
	<path
		class="fill-white dark:fill-[#0b0d12]"
		d="M29.44295,24.93874l-13.85816,-3.41066l20.85926,52.97021h13.75758l15.95771,-40.52318l-11.55256,-2.84323l-11.28436,26.9249z"
	/>
	<path class="fill-hoop-500" d="M63.95921,74.49828h19.78567l-9.89283,-25.12294z" />
</svg>
