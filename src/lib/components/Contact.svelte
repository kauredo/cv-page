<script lang="ts">
	import Stop from '#lib/components/shared/Stop.svelte';
	const contacts = [
		{
			type: 'Email',
			href: 'mailto:vasco.kf@gmail.com',
			label: 'vasco.kf@gmail.com',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		{
			type: 'GitHub',
			href: 'https://github.com/kauredo',
			label: '@kauredo',
			icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
		},
		{
			type: 'LinkedIn',
			href: 'https://linkedin.com/in/vascokf',
			label: '/in/vascokf',
			icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
		}
	];
</script>

<section aria-labelledby="contact-heading" class="relative">
	<div
		class="relative overflow-hidden rounded-2xl bg-slate-950 px-6 py-12 text-white sm:px-10 sm:py-14 md:px-12 md:py-16 dark:bg-slate-900"
	>
		<!-- Calçada bounce lines along the bottom edge, each bounce lower than the last; they
		     bookend the lines behind the hero portrait -->
		<svg
			class="absolute inset-x-0 bottom-0 h-10 w-full opacity-70 sm:h-12 md:h-14"
			viewBox="0 0 1200 80"
			preserveAspectRatio="none"
			fill="none"
			aria-hidden="true"
		>
			<g stroke-width="2">
				<path
					class="stroke-hoop-500"
					vector-effect="non-scaling-stroke"
					d="M0 40Q221 -30 443 40Q618 -16 793 40Q921 0 1049 40Q1125 16 1200 40"
				/>
				<path
					class="stroke-hoop-300"
					vector-effect="non-scaling-stroke"
					d="M0 58Q221 -12 443 58Q618 2 793 58Q921 18 1049 58Q1125 34 1200 58"
				/>
				<path
					class="stroke-hoop-100"
					vector-effect="non-scaling-stroke"
					d="M0 76Q221 6 443 76Q618 20 793 76Q921 36 1049 76Q1125 52 1200 76"
				/>
			</g>
		</svg>

		<!-- Top metadata strip -->
		<div
			class="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4"
		>
			<span class="eyebrow text-hoop-400">№ 06 — Hit me up</span>
			<span class="eyebrow text-slate-400">CC: vasco.kf @ Lisbon</span>
		</div>

		<div class="relative mt-10 grid gap-10 md:grid-cols-12 md:items-end md:gap-10 lg:gap-12">
			<div class="md:col-span-7">
				<h2
					id="contact-heading"
					class="font-display text-5xl leading-[0.9] font-black tracking-tight sm:text-6xl lg:text-7xl"
				>
					Let's <span class="text-hoop-400 font-medium italic">play</span><Stop
						class="text-hoop-400"
					/>
				</h2>

				<p class="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
					Got a cool project idea? Want to chat code or hoops?
					<span class="text-white">I'm always down for a good conversation.</span>
				</p>
			</div>

			<div class="md:col-span-5">
				<p class="eyebrow mb-4 text-slate-400">Reach me on —</p>
				<ul class="space-y-2">
					{#each contacts as contact, i (i)}
						<li>
							<a
								href={contact.href}
								target={contact.href.startsWith('mailto') ? undefined : '_blank'}
								rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
								class="group hover:border-hoop-400 active:border-hoop-400 focus-visible:ring-hoop-400 -mx-2 flex items-center justify-between gap-4 rounded-md border-b border-white/10 px-2 py-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
							>
								<span class="flex items-center gap-3">
									<span
										class="bg-hoop-500/15 text-hoop-400 group-hover:bg-hoop-500 group-active:bg-hoop-500 inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 group-hover:text-white group-active:text-white"
									>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path d={contact.icon} />
										</svg>
									</span>
									<span class="font-display text-base font-bold text-white">{contact.type}</span>
								</span>
								<span
									class="font-mono text-xs text-slate-400 transition-colors group-hover:text-white group-active:text-white"
								>
									{contact.label} →
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
