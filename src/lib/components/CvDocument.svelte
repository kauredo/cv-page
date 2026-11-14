<script lang="ts">
	import type cvEn from '#lib/data/cv.json';
	import BackButton from '#lib/components/shared/BackButton.svelte';
	import Badge from '#lib/components/shared/Badge.svelte';

	let { cv, lang }: { cv: typeof cvEn; lang: 'en' | 'pt' } = $props();

	$effect(() => {
		document.documentElement.lang = lang;
		return () => {
			document.documentElement.lang = 'en';
		};
	});

	const LABELS = {
		en: {
			back: 'Back',
			home: 'Home',
			print: 'Print CV',
			other: { href: '/cv/pt', hreflang: 'pt', text: 'Português' },
			summary: 'Summary',
			experience: 'Professional Experience',
			present: 'Present',
			projects: 'Featured Projects',
			viewLive: 'View Live',
			skills: 'Technical Skills',
			languages: 'Languages',
			education: 'Education'
		},
		pt: {
			back: 'Voltar',
			home: 'Início',
			print: 'Imprimir CV',
			other: { href: '/cv', hreflang: 'en', text: 'English' },
			summary: 'Perfil',
			experience: 'Experiência Profissional',
			present: 'Presente',
			projects: 'Projetos em Destaque',
			viewLive: 'Ver online',
			skills: 'Competências Técnicas',
			languages: 'Línguas',
			education: 'Formação'
		}
	};

	const t = $derived(LABELS[lang]);
	const { basics, work, education, skills, projects, languages } = $derived(cv);

	const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

	const filteredProfiles = $derived(
		basics.profiles.filter((profile) => profile.network !== 'gitconnected')
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
			<BackButton href="/" text={t.back} />
			<div class="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
			<span class="text-sm text-gray-500 dark:text-gray-400">{t.home}</span>
		</div>

		<div class="flex items-center gap-4">
			<a
				href={t.other.href}
				hreflang={t.other.hreflang}
				class="text-sm text-gray-600 underline-offset-4 hover:underline dark:text-gray-300"
				>{t.other.text}</a
			>

			<button
				onclick={handlePrint}
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
				{t.print}
			</button>
		</div>
	</nav>
</section>

<div class="cv-print" {lang}>
	<header>
		<div class="personal-info">
			<div class="header-main">
				<img src={basics.image} alt={basics.name} class="avatar w-20 sm:w-[100px]" />
				<div class="name-title">
					<Badge ink class="mb-3 h-7 w-auto" />
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
			{#each filteredProfiles as profile, i (i)}
				<div class="contact-item">
					<span>{profile.network}: </span>
					<a href={profile.url} target="_blank" rel="noopener noreferrer">{profile.username}</a>
				</div>
			{/each}
		</div>
	</header>

	<main>
		<section class="summary">
			<h2>{t.summary}</h2>
			{#each basics.summary.split('\n\n') as paragraph, i (i)}
				<p class="summary-text">{paragraph}</p>
			{/each}
		</section>

		<section class="experience">
			<h2>{t.experience}</h2>
			{#each work as job, i (i)}
				<div class="job">
					<div class="job-header">
						<div class="job-title-group">
							<h3>{job.position}</h3>
							<span class="company">{job.company}</span>
						</div>
						<span class="dates">
							{#if job.endDate && new Date(job.startDate).getFullYear() === new Date(job.endDate).getFullYear()}
								{new Date(job.startDate).getFullYear()}
							{:else}
								{new Date(job.startDate).getFullYear()} –
								{job.endDate ? new Date(job.endDate).getFullYear() : t.present}
							{/if}
						</span>
					</div>
					<p class="job-description">{job.summary}</p>
				</div>
			{/each}
		</section>

		<section class="projects">
			<h2>{t.projects}</h2>
			{#each projects as project, i (i)}
				<div class="project mb-4">
					<div class="project-header">
						<div
							class="project-title-group flex flex-col sm:flex-row sm:items-center sm:justify-between"
						>
							<h3 class="mb-2 sm:mb-0">{project.displayName}</h3>
							<div class="project-links">
								{#if project.website}
									<a href={project.website} target="_blank" rel="noopener noreferrer"
										>{t.viewLive}</a
									>
									<span class="project-url">{host(project.website)}</span>
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
			<h2>{t.skills}</h2>
			<div class="skills-grid">
				{#each skills as skill, i (i)}
					<div class="skill-item">
						<span class="skill-name">{skill.name}</span>
					</div>
				{/each}
			</div>
		</section>

		<section class="languages">
			<h2>{t.languages}</h2>
			<div class="skills-grid">
				{#each languages as lang, i (i)}
					<div class="skill-item">
						<span class="skill-name">{lang.language}</span>
						<span class="years">{lang.fluency}</span>
					</div>
				{/each}
			</div>
		</section>

		<section class="education">
			<h2>{t.education}</h2>
			<div class="education-grid">
				{#each education as edu, i (i)}
					<div class="education-item">
						<h3>{edu.institution}</h3>
						<p class="degree">{edu.area}{edu.studyType ? `, ${edu.studyType}` : ''}</p>
						<div class="education-details">
							<span class="dates">
								{#if edu.start?.year && edu.end?.year}
									{edu.start.year} – {edu.end.year}
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
