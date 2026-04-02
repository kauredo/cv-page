<script lang="ts">
	import experienceData from '$lib/data/experience.json';
	import educationData from '$lib/data/education.json';
	import projectsData from '$lib/data/projects.json';
	import type { Experience, Education, Project } from '$lib/types';
	import Contact from '$lib/components/Contact.svelte';
	import Experiences from '$lib/components/Experiences.svelte';
	import Schools from '$lib/components/Schools.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Now from '$lib/components/Now.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { onMount } from 'svelte';
	import { debounce } from '$lib/utils';

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	let unfilteredProjects: Project[] = projectsData;
	let featuredProject: Project | null = unfilteredProjects[0] || null;
	// Default to 3 for SSR/prerender — resize will adjust on client
	let projects: Project[] = unfilteredProjects.slice(1, 4);

	function updateProjects() {
		featuredProject = unfilteredProjects[0] || null;
		const remaining = unfilteredProjects.slice(1);
		if (window.innerWidth < 1024) {
			projects = remaining.slice(0, 2);
		} else {
			projects = remaining.slice(0, 3);
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

<Hero />

<div class="mx-auto max-w-6xl space-y-16 px-6 pb-16 sm:space-y-20 sm:pb-20">
	<Projects {featuredProject} {projects} />
	<Experiences {experiences} />
	<Schools {education} />
	<Now />
	<Contact />
</div>
