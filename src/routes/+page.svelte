<script lang="ts">
	import experienceData from '$lib/data/experience.json';
	import educationData from '$lib/data/education.json';
	import skillsData from '$lib/data/skills.json';

	type Experience = {
		title: string;
		period: string;
		description: string;
	};

	type Education = {
		degree: string;
		institution: string;
		period: string;
	};

	const experiences: Experience[] = experienceData;
	const education: Education[] = educationData;
	const skills: string[] = skillsData;
</script>

<main class="mx-auto max-w-4xl space-y-16 p-6">
	<!-- Introduction Section -->
	<section class="text-center">
		<h1 class="mb-4 text-4xl font-bold">Hi, I'm Vasco</h1>
		<p class="text-lg text-gray-600">
			Full-stack developer focused on crafting clean, efficient, and modern web applications.
		</p>
	</section>

	<!-- Professional Experience Section -->
	<section>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Professional Experience</h2>
		<ul class="space-y-4">
			{#each experiences as exp}
				<li>
					<h3 class="text-xl font-semibold">{exp.title}</h3>
					<p class="text-gray-600">{exp.period}</p>
					<p>{exp.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Education Section -->
	<section>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Education</h2>
		<ul class="space-y-2">
			{#each education as edu}
				<li>
					<h3 class="text-xl font-semibold">{edu.degree}</h3>
					<p class="text-gray-600">{edu.institution}, {edu.period}</p>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Skills Section -->
	<section>
		<h2 class="mb-4 border-b pb-2 text-2xl font-bold">Skills</h2>
		<ul class="grid grid-cols-2 gap-4 text-sm text-gray-700 sm:grid-cols-3">
			{#each skills as skill}
				<li>{skill}</li>
			{/each}
		</ul>
	</section>

	<!-- Contact Section -->
	<section class="text-center">
		<h2 class="mb-4 text-2xl font-bold">Get in Touch</h2>
		<p class="mb-4 text-gray-600">Let's build something awesome together.</p>
		<div class="flex justify-center space-x-6">
			<a href="mailto:hello@vascokf.com" class="text-blue-600 hover:underline">Email</a>
			<a href="https://github.com/vascokf" class="text-blue-600 hover:underline">GitHub</a>
			<a href="https://linkedin.com/in/vascokf" class="text-blue-600 hover:underline">LinkedIn</a>
		</div>
	</section>
</main>

<style>
	/* Add any custom styles here if needed */
</style>
