<!--
	The brand full stop: the logo's triangle, used in place of "." after headings.
	Sized in em so it follows the heading: about a third of the cap height, sitting on
	the baseline. Colour comes from the text colour of `class` (e.g. text-hoop-500).
-->
<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg
	class="ml-[0.06em] inline-block h-[0.24em] w-[0.195em] fill-current align-baseline {className}"
	viewBox="0 0 268 330"
	aria-hidden="true"
	focusable="false"><path d="M0 330H268L130 0Z" /></svg
>
