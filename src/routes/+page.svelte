<script lang="ts">
	import experienceData from '$lib/data/experience.json';
	import educationData from '$lib/data/education.json';
	import skillsData from '$lib/data/skills.json';
	import projectsData from '$lib/data/projects.json';
	import { fade } from 'svelte/transition';
	import type { Experience, Education, Project } from '$lib/types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import DribblingBall from '$lib/components/DribblingBall.svelte';

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	const skills: string[] = skillsData;
	const projects: Project[] = projectsData.slice(0, 2);
</script>

<main class="mx-auto max-w-4xl space-y-16 p-6">
	<!-- Hero Section -->
	<section class="space-y-4 pt-10 text-center" in:fade={{ duration: 200 }}>
		<div class="flex items-center justify-center gap-4">
			<h1 class="text-3xl font-bold sm:text-5xl">Hey, I'm Vasco</h1>
			<DribblingBall />
		</div>
		<p class="text-lg text-gray-600 dark:text-gray-400">
			Web Developer • Problem Solver • Basketball Enthusiast
		</p>
		<p class="mx-auto max-w-xl text-gray-600 dark:text-gray-400">
			I build clean, functional, and playful web apps. Currently exploring 3D printing, basketball
			scheduling tools, and how to make the web a little more fun.
		</p>
	</section>

	<!-- Projects Section -->
	<section in:fade={{ duration: 200 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I've Been Building</h2>
		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
		<a href="/projects" class="text-vasco-600 block hover:underline">See all my projects →</a>
	</section>

	<!-- Experience Section -->
	<section in:fade={{ duration: 200 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Places I've Worked At</h2>
		<ul class="space-y-6">
			{#each experiences as exp}
				<li>
					<div class="flex items-center gap-3">
						<h3 class="text-xl font-semibold">{exp.title}</h3>
						<span class="text-sm text-gray-500">{exp.period}</span>
					</div>
					<p class="text-gray-700 dark:text-gray-400">{exp.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Education Section -->
	<section in:fade={{ duration: 200 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Where I've Studied</h2>
		<ul class="space-y-4">
			{#each education as edu}
				<li>
					<div class="flex items-center gap-3">
						<h3 class="text-lg font-semibold">{edu.degree}</h3>
						<span class="text-sm text-gray-500">{edu.institution}, {edu.period}</span>
					</div>
					<p class="text-gray-600 dark:text-gray-400">{edu.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Skills Section -->
	<section in:fade={{ duration: 200 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Tools & Tech I Enjoy</h2>
		<ul class="grid grid-cols-2 gap-3 text-sm text-gray-700 sm:grid-cols-3 dark:text-gray-400">
			{#each skills as skill}
				<li class="rounded-lg bg-gray-100 px-3 py-1 dark:bg-gray-800">{skill}</li>
			{/each}
		</ul>
	</section>

	<!-- Now Section -->
	<section in:fade={{ duration: 200 }}>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">What I'm Up to Now</h2>
		<p class="text-gray-600 dark:text-gray-400">
			📅 Building a calendar tool for all Portuguese basketball leagues<br />
			🖨️ 3D printing a wine rack(!) using my Bambu P1S<br />
			🏀 Playing basketball for a local club (vamos SIMECQ)<br />
			📚 Reading "The Peculiar life of a lonely Postman"<br />
		</p>
	</section>

	<!-- Contact Section -->
	<section class="space-y-4 text-center" in:fade={{ duration: 200 }}>
		<h2 class="text-2xl font-bold">Hit me up!</h2>
		<p class="text-gray-600 dark:text-gray-400">
			Got a cool project idea? Want to chat code or hoops? Drop me a message wherever you prefer:
		</p>
		<div class="flex justify-center gap-6">
			<a href="mailto:vasco.kf@gmail.com" class="text-vasco-600 hover:underline">Email</a>
			<a href="https://github.com/kauredo" class="text-vasco-600 hover:underline">GitHub</a>
			<a href="https://linkedin.com/in/vascokf" class="text-vasco-600 hover:underline">LinkedIn</a>
		</div>
	</section>
</main>
