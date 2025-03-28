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
		{#each projects as project}
			<div class="project">
				<h3>{project.displayName}</h3>
				<p>{project.description}</p>
				{#if project.website}
					<a href={project.website} target="_blank" rel="noopener noreferrer"> View Project → </a>
				{:else}
					<p>Site offline</p>
				{/if}
			</div>
		{/each}
	</section>

	<section class="education">
		<h2>Education</h2>
		{#each education as edu}
			<div class="education-item">
				<h3>{edu.institution}</h3>
				<p>{edu.area} {edu.studyType ? `- ${edu.studyType}` : ''}</p>
				<span class="dates">
					{#if edu.start?.year && edu.end?.year}
						{edu.start.year} - {edu.end.year}
					{:else}
						{edu.end?.year || ''}
					{/if}
				</span>
				{#if edu.gpa}
					<p class="gpa">{edu.gpa}</p>
				{/if}
			</div>
		{/each}
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
