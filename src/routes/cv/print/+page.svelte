<script lang="ts">
	import cv from '$lib/data/cv.json';
	import BackButton from '$lib/components/shared/BackButton.svelte';

	const { basics, work, education, skills, projects } = cv;

	// Sort skills by years of experience
	const sortedSkills = skills.sort(
		(a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0)
	);

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>{basics.name} - CV</title>
</svelte:head>

<section class="screen-only-nav">
	<nav>
		<div class="flex items-center gap-2">
			<BackButton href="/" />
			<div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
			<span class="text-sm text-gray-500 dark:text-gray-400">Home</span>
		</div>

		<button
			on:click={handlePrint}
			class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="6 9 6 2 18 2 18 9" />
				<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1-2 2v5a2 2 0 0 1-2 2h-2" />
				<rect x="6" y="14" width="12" height="8" />
			</svg>
			Print CV
		</button>
	</nav>
</section>

<div class="cv-print">
	<header>
		<div class="personal-info">
			<div class="header-main">
				<img src={basics.image} alt={basics.name} class="avatar w-20 sm:w-[100px]" />
				<div class="name-title">
					<h1 class="text-2xl sm:text-3xl">{basics.name}</h1>
					<p class="title text-base sm:text-lg">{basics.label}</p>
				</div>
			</div>
		</div>
		<div class="contact-info text-left sm:text-right">
			<div class="contact-item">
				<span>{basics.email}</span>
			</div>
			<div class="contact-item">
				<span>{basics.locationAsString}</span>
			</div>
			{#each basics.profiles as profile}
				<div class="contact-item">
					<span>{profile.network}: </span>
					<a href={profile.url} target="_blank" rel="noopener noreferrer">{profile.username}</a>
				</div>
			{/each}
		</div>
	</header>

	<main>
		<section class="summary">
			<h2>Summary</h2>
			<p class="summary-text">{basics.summary}</p>
		</section>

		<section class="experience">
			<h2>Professional Experience</h2>
			{#each work.slice(0, 3) as job}
				<div class="job">
					<div class="job-header">
						<div class="job-title-group">
							<h3>{job.position}</h3>
							<span class="company">{job.company}</span>
						</div>
						<span class="dates">
							{new Date(job.startDate).getFullYear()} -
							{job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
						</span>
					</div>
					<p class="job-description">{job.summary}</p>
				</div>
			{/each}
		</section>

		<section class="projects">
			<h2>Featured Projects</h2>
			{#each projects.slice(0, 4) as project}
				<div class="project mb-4">
					<div class="project-header">
						<div
							class="project-title-group flex flex-col sm:flex-row sm:items-center sm:justify-between"
						>
							<h3 class="mb-2 sm:mb-0">{project.displayName}</h3>
							<div class="project-links">
								{#if project.website}
									<a href={project.website} target="_blank" rel="noopener noreferrer">View Live</a>
								{/if}
								{#if project.githubUrl}
									<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
								{/if}
							</div>
						</div>
					</div>
					<p class="project-description mt-2">{project.description}</p>
				</div>
			{/each}
		</section>

		<section class="skills">
			<h2>Technical Skills</h2>
			<div class="skills-grid">
				{#each sortedSkills as skill}
					<div class="skill-item">
						<span class="skill-name">{skill.name}</span>
						<span class="years"
							>{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}</span
						>
					</div>
				{/each}
			</div>
		</section>

		<section class="education">
			<h2>Education</h2>
			<div class="education-grid">
				{#each education as edu}
					<div class="education-item">
						<h3>{edu.institution}</h3>
						<p class="degree">{edu.area} {edu.studyType ? `- ${edu.studyType}` : ''}</p>
						<div class="education-details">
							<span class="dates">
								{#if edu.start?.year && edu.end?.year}
									{edu.start.year} - {edu.end.year}
								{:else}
									{edu.end?.year || ''}
								{/if}
							</span>
							{#if edu.gpa}
								<span class="achievement">{edu.gpa}</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	</main>
</div>
