<script lang="ts">
	import cv from '$lib/data/cv.json';
	import BackButton from '$lib/components/shared/BackButton.svelte';

	const { basics, work, education, skills, projects, accomplishments } = cv;

	// Sort skills by years of experience
	const sortedSkills = skills.sort(
		(a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0)
	);

	const filteredProfiles = basics.profiles.filter((profile) => {
		return profile.network !== 'gitconnected';
	});

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
				{#if basics.image}
					<img src={basics.image} alt={basics.name} class="avatar w-20 sm:w-[100px]" />
				{/if}
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
			{#each filteredProfiles as profile}
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
			{#each work as job}
				<div class="mb-6">
					<div class="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
						<div class="mb-1 flex items-baseline gap-2 sm:mb-0">
							<h3 class="text-lg font-semibold text-gray-800">{job.position}</h3>
							<span class="text-sm text-gray-600">• {job.company}</span>
						</div>
						<span class="text-sm text-gray-500">
							{new Date(job.startDate).getFullYear()} -
							{job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
						</span>
					</div>
					<p class="text-sm leading-relaxed text-gray-600">{job.summary}</p>
				</div>
			{/each}
		</section>

		{#if projects && projects.length > 0}
			<section class="projects">
				<h2>Featured Projects</h2>
				{#each projects as project}
					<div class="project mb-6">
						<div class="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
							<h3 class="mb-1 text-lg font-semibold text-gray-800 sm:mb-0">
								{project.displayName}
							</h3>
							<div class="flex gap-3 text-sm">
								{#if project.website}
									<a
										href={project.website}
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:text-blue-800 hover:underline">View Live</a
									>
								{/if}
								{#if project.githubUrl}
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:text-blue-800 hover:underline">GitHub</a
									>
								{/if}
							</div>
						</div>
						<p class="text-sm leading-relaxed text-gray-600">{project.description}</p>
					</div>
				{/each}
			</section>
		{/if}

		<section class="skills">
			<h2>Professional Skills</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each sortedSkills as skill}
					<div
						class="flex items-baseline justify-between border-b border-dotted border-gray-300 pb-1"
					>
						<span class="text-sm font-medium text-gray-800">{skill.name}</span>
						{#if skill.yearsOfExperience}
							<span class="text-xs text-gray-500"
								>{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}</span
							>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		{#if accomplishments && accomplishments.length > 0}
			<section class="accomplishments">
				<h2>Certificates & Accomplishments</h2>
				{#each accomplishments as accomplishment}
					<div class="mb-6">
						<div class="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between">
							<div class="mb-1 flex items-baseline gap-2 sm:mb-0">
								<h3 class="text-lg font-semibold text-gray-800">{accomplishment.title}</h3>
								{#if accomplishment.link}
									<a
										href={accomplishment.link}
										target="_blank"
										rel="noopener noreferrer"
										class="text-sm text-blue-600 hover:text-blue-800 hover:underline"
										>View Certificate</a
									>
								{/if}
							</div>
							<span class="text-sm text-gray-500">
								{#if accomplishment.startDate && accomplishment.endDate}
									{new Date(accomplishment.startDate).getFullYear()} - {new Date(
										accomplishment.endDate
									).getFullYear()}
								{:else if accomplishment.startDate}
									{new Date(accomplishment.startDate).getFullYear()}
								{:else if accomplishment.endDate}
									{new Date(accomplishment.endDate).getFullYear()}
								{/if}
							</span>
						</div>
						<p class="text-sm leading-relaxed text-gray-600">{accomplishment.description}</p>
					</div>
				{/each}
			</section>
		{/if}

		<section class="education">
			<h2>Education</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{#each education as edu}
					<div class="space-y-1">
						<h3 class="text-lg font-semibold text-gray-800">{edu.institution}</h3>
						<p class="text-sm text-gray-600">
							{edu.area}
							{edu.studyType ? `- ${edu.studyType}` : ''}
						</p>
						<div class="flex items-baseline justify-between text-sm text-gray-500">
							<span>
								{#if edu.start?.year && edu.end?.year}
									{edu.start.year} - {edu.end.year}
								{:else}
									{edu.end?.year || ''}
								{/if}
							</span>
							{#if edu.gpa}
								<span class="font-medium">{edu.gpa}</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	</main>
</div>
