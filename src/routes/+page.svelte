<script lang="ts">
	import experienceData from '$lib/data/experience.json';
	import educationData from '$lib/data/education.json';
	import skillsData from '$lib/data/skills.json';
	import projectsData from '$lib/data/projects.json';
	import type { Experience, Education, Project } from '$lib/types';
	import { fade } from 'svelte/transition';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	const skills: string[] = skillsData;
	let projects: Project[] = projectsData;
	projects = projects.slice(0, 2);
</script>

<main class="mx-auto max-w-4xl space-y-16 p-6">
	<!-- Introduction Section -->
	<section in:fade={{ duration: 100 }} class="mb-12 flex flex-col items-center gap-6 md:flex-row">
		<img src="/images/me.png" alt="Vasco" class="h-42 dark:bg-gray-800" />
		<div>
			<h1 class="text-4xl font-bold">Hi, I'm Vasco 👋</h1>
			<p class="mt-2 mb-6 text-lg text-gray-600 dark:text-gray-400">
				Web Developer • Problem Solver • Basketball Enthusiast
			</p>

			<div class="text-justify">
				<p>
					I'm a Web Developer based in Lisbon, Portugal. My interests include watching and playing
					basketball, reading and watching TV - series, movies or documentaries.
				</p>
				<p>
					I want this page to serve as a way for me to practice and showcase my skills, therefore I
					plan to update and revamp it on a semi-regular basis. If you have any questions or
					suggestions feel free to contact me through any of my socials!
				</p>
			</div>
		</div>
	</section>

	<!-- Projects Section -->
	<section in:fade={{ duration: 100 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I've Been Building & Learning</h2>
		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</section>

	<!-- Professional Experience Section -->
	<section in:fade={{ duration: 100 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Jobs I've Had</h2>
		<ul class="space-y-4">
			{#each experiences as exp}
				<li>
					<div class="flex items-center gap-2">
						<h3 class="text-xl font-semibold">{exp.title}</h3>
						<p class="text-gray-600 dark:text-gray-400">{exp.period}</p>
					</div>
					<p>{exp.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Education Section -->
	<section in:fade={{ duration: 100 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Where I've Studied</h2>
		<ul class="space-y-2">
			{#each education as edu}
				<li>
					<div class="flex items-center gap-2">
						<h3 class="text-xl font-semibold">{edu.degree}:</h3>
						<p class="text-gray-600 dark:text-gray-400">{edu.institution}, {edu.period}</p>
					</div>
					<p class="text-gray-700 dark:text-gray-400">{edu.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Skills Section -->
	<section in:fade={{ duration: 100 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Skills & Technologies I Work With</h2>
		<ul class="grid grid-cols-2 gap-4 text-sm text-gray-700 sm:grid-cols-3 dark:text-gray-400">
			{#each skills as skill}
				<li>{skill}</li>
			{/each}
		</ul>
	</section>

	<!-- Contact Section -->
	<section in:fade={{ duration: 100 }} class="text-center">
		<h2 class="mb-4 text-2xl font-bold">Get in Touch</h2>
		<p class="mb-4 text-gray-600 dark:text-gray-400">
			Got a cool idea? Want to chat code or hoops? Hit me up!
		</p>
		<div class="flex justify-center space-x-6">
			<a href="mailto:vasco.kf@gmail.com" class="text-vasco-600 hover:underline">Email</a>
			<a href="https://github.com/kauredo" class="text-vasco-600 hover:underline">GitHub</a>
			<a href="https://linkedin.com/in/vascokf" class="text-vasco-600 hover:underline">LinkedIn</a>
		</div>
	</section>
</main>
