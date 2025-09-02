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
			<div class="relative">
				<!-- Timeline line -->
				<div
					class="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200"
				></div>

				{#each work as job, index}
					<div class="relative mb-2 flex items-start">
						<!-- Timeline dot/logo - only show if first entry or different company -->
						{#if index === 0 || work[index - 1].company !== job.company}
							<div
								class="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
							>
								{#if job.logo}
									<img
										src={job.logo}
										alt="{job.company} logo"
										class="h-10 w-10 rounded-full object-cover"
									/>
								{:else}
									<!-- Fallback icon -->
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white"
									>
										<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
											<path
												d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
											/>
										</svg>
									</div>
								{/if}
							</div>
						{:else}
							<!-- Empty space to maintain alignment when same company -->
							<div class="h-16 w-16 flex-shrink-0"></div>
						{/if}

						<!-- Content -->
						<div class="ml-6 flex-1">
							<div class="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between">
								<div class="mb-1 sm:mb-0">
									<h3 class="text-lg font-semibold text-gray-800">{job.position}</h3>
									<p class="text-sm font-medium text-blue-600">{job.company}</p>
									<p class="text-xs text-gray-500">{job.location}</p>
								</div>
								<span class="flex items-center text-sm text-gray-500">
									<svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
											clip-rule="evenodd"
										/>
									</svg>
									{new Date(job.startDate).getFullYear()} -
									{job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}
								</span>
							</div>
							{#if job.summary}
								<p class="text-sm leading-relaxed text-gray-600">{job.summary}</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
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
			<div class="relative">
				<!-- Timeline line -->
				<div
					class="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-green-200 via-green-300 to-green-200"
				></div>

				{#each education as edu, index}
					<div class="relative mb-2 flex items-start">
						<!-- Timeline dot/logo - only show if first entry or different institution -->
						{#if index === 0 || education[index - 1].institution !== edu.institution}
							<div
								class="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-green-50 to-green-100 shadow-lg"
							>
								{#if edu.logo}
									<img
										src={edu.logo}
										alt="{edu.institution} logo"
										class="h-10 w-10 rounded-full object-cover"
									/>
								{:else}
									<!-- Fallback icon -->
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white"
									>
										<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
											<path
												d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
											/>
										</svg>
									</div>
								{/if}
							</div>
						{:else}
							<!-- Empty space to maintain alignment when same institution -->
							<div class="h-16 w-16 flex-shrink-0"></div>
						{/if}

						<!-- Content -->
						<div class="ml-6 flex-1">
							<div class="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between">
								<div class="mb-1 sm:mb-0">
									<h3 class="text-lg font-semibold text-gray-800">{edu.institution}</h3>
									<p class="text-sm font-medium text-green-600">
										{edu.area}
										{edu.studyType ? `- ${edu.studyType}` : ''}
									</p>
									{#if edu.activities}
										<p class="text-xs text-gray-500">{edu.activities}</p>
									{/if}
								</div>
								<span class="flex items-center text-sm text-gray-500">
									<svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
										<path
											fill-rule="evenodd"
											d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
											clip-rule="evenodd"
										/>
									</svg>
									{#if edu.start?.year && edu.end?.year}
										{edu.start.year} - {edu.end.year}
									{:else}
										{edu.end?.year || ''}
									{/if}
								</span>
							</div>
							{#if edu.gpa}
								<div class="mt-1">
									<span
										class="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
									>
										{edu.gpa}
									</span>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	</main>
</div>
