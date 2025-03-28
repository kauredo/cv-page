<script lang="ts">
	import cv from '$lib/data/cv.json';
	import '$lib/styles/print.css';

	const { basics, work, education, skills, projects } = cv;

	// Sort skills by years of experience
	const sortedSkills = skills.sort(
		(a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0)
	);
</script>

<svelte:head>
	<title>{basics.name} - CV</title>
</svelte:head>

<div class="print-wrapper">
	<header>
		<div class="personal-info">
			<img src="/images/logo.svg" alt="VascoKF logo" class="logo" />
			<h1>{basics.name}</h1>
			<p class="title">{basics.label}</p>
		</div>
		<div class="contact-info">
			<p>{basics.email}</p>
			<p>{basics.locationAsString}</p>
			{#each basics.profiles as profile}
				<p>{profile.network}: <a href={profile.url}>{profile.username}</a></p>
			{/each}
		</div>
	</header>

	<section class="summary">
		<h2>Summary</h2>
		<p>{basics.summary}</p>
	</section>

	<section class="experience">
		<h2>Experience</h2>
		{#each work as job}
			<div class="job">
				<div class="job-header">
					<span class="job-title">
						<h3>{job.position}</h3>
						<span class="company">{job.company}</span>
					</span>
					<span class="dates">
						{new Date(job.startDate).getFullYear()} -
						{job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
					</span>
				</div>
				<p>{job.summary}</p>
			</div>
		{/each}
	</section>

	<section class="projects">
		<h2>Notable Projects</h2>
		{#each projects.slice(0, 4) as project}
			<div class="project">
				<div class="project-header">
					<h3>{project.displayName}</h3>
					<div class="project-links">
						{#if project.website}
							<a
								href={project.website}
								class="project-link"
								target="_blank"
								rel="noopener noreferrer"
							>
								Website
							</a>
						{/if}
						{#if project.githubUrl}
							<a
								href={project.githubUrl}
								class="project-link"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
						{/if}
					</div>
				</div>
				<p class="project-description">{project.description}</p>
			</div>
		{/each}
	</section>

	<section class="education">
		<h2>Education</h2>
		<div class="education-grid">
			{#each education as edu}
				<div class="education-item">
					<div class="education-header">
						<h3>{edu.institution}</h3>
						<span class="dates">
							{#if edu.start?.year && edu.end?.year}
								{edu.start.year} - {edu.end.year}
							{:else}
								{edu.end?.year || ''}
							{/if}
						</span>
					</div>
					<p class="degree">{edu.area} {edu.studyType ? `- ${edu.studyType}` : ''}</p>
					{#if edu.gpa}
						<p class="achievement">{edu.gpa}</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="skills">
		<h2>Skills</h2>
		<div class="skills-grid">
			{#each sortedSkills as skill}
				<div class="skill-item">
					<span class="skill-name">{skill.name}:</span>
					<span class="years"
						>{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}</span
					>
				</div>
			{/each}
		</div>
	</section>
</div>
