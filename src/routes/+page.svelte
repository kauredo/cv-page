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

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	const allProjects: Project[] = projectsData;
	// 1 featured + 6 grid cards (clean 2×3 desktop, 3×2 mobile)
	const featuredProject: Project | null = allProjects[0] || null;
	const projects: Project[] = allProjects.slice(1, 7);
</script>

<Hero />

<div class="mx-auto max-w-6xl space-y-20 px-6 pt-8 pb-20 sm:space-y-28 sm:pb-28">
	<Projects {featuredProject} {projects} />
	<div class="court-divider text-slate-300/70 dark:text-slate-700/70" aria-hidden="true"></div>
	<Experiences {experiences} />
	<div class="court-divider text-slate-300/70 dark:text-slate-700/70" aria-hidden="true"></div>
	<Schools {education} />
	<div class="court-divider text-slate-300/70 dark:text-slate-700/70" aria-hidden="true"></div>
	<Now />
	<div class="text-hoop-500/50 dark:text-hoop-400/50 court-divider" aria-hidden="true"></div>
	<Contact />
</div>
