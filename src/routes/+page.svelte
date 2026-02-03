<script lang="ts">
	import experienceData from '$lib/data/experience.json';
	import educationData from '$lib/data/education.json';
	import skillsData from '$lib/data/skills.json';
	import projectsData from '$lib/data/projects.json';
	import type { Experience, Education, Project } from '$lib/types';
	import Contact from '$lib/components/Contact.svelte';
	import Experiences from '$lib/components/Experiences.svelte';
	import Schools from '$lib/components/Schools.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Now from '$lib/components/Now.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import { onMount } from 'svelte';
	import { debounce } from '$lib/utils';

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	const skills: string[] = skillsData;
	let unfilteredProjects: Project[] = projectsData;
	let projects: Project[] = [];

	function updateProjects() {
		if (window.innerWidth < 640) {
			projects = unfilteredProjects.slice(0, 1);
		} else if (window.innerWidth < 1024) {
			projects = unfilteredProjects.slice(0, 2);
		} else {
			projects = unfilteredProjects.slice(0, 3);
		}
	}

	onMount(() => {
		updateProjects();
		const debouncedUpdate = debounce(updateProjects, 150);
		window.addEventListener('resize', debouncedUpdate);
		return () => {
			window.removeEventListener('resize', debouncedUpdate);
		};
	});
</script>

<!-- Hero breaks out of container for maximum impact -->
<Hero />

<!-- Main content with varied spacing for visual rhythm -->
<div class="mx-auto max-w-6xl px-6">
	<!-- Projects section - tight spacing after hero -->
	<section class="pb-24">
		<Projects {projects} />
	</section>

	<!-- Experience section - more breathing room -->
	<section class="pb-32">
		<Experiences {experiences} />
	</section>

	<!-- Education - moderate spacing -->
	<section class="pb-20">
		<Schools {education} />
	</section>

	<!-- Skills - moderate spacing -->
	<section class="pb-20">
		<Skills {skills} />
	</section>

	<!-- Now section - moderate spacing -->
	<section class="pb-24">
		<Now />
	</section>

	<!-- Contact section - generous spacing -->
	<section class="pb-32">
		<Contact />
	</section>
</div>
