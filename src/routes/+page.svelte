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

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	const skills: string[] = skillsData;
	let unfilteredProjects: Project[] = projectsData;
	let projects: Project[] = [];

	onMount(() => {
		// depending on screen size, slice the projects array to show only 1, 2, or 3 projects
		if (window.innerWidth < 640) {
			projects = unfilteredProjects.slice(0, 1);
		} else if (window.innerWidth < 1024) {
			projects = unfilteredProjects.slice(0, 2);
		} else {
			projects = unfilteredProjects.slice(0, 3);
		}
	});
</script>

<main class="mx-auto max-w-4xl space-y-16 p-6">
	<Hero />
	<Projects {projects} />
	<Experiences {experiences} />
	<Schools {education} />
	<Skills {skills} />
	<Now />
	<Contact />
</main>
