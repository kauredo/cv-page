<script lang="ts">
	import DribblingBall from './shared/DribblingBall.svelte';

	const contacts = [
		{ type: 'Email', href: 'mailto:vasco.kf@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
		{ type: 'GitHub', href: 'https://github.com/kauredo', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
		{ type: 'LinkedIn', href: 'https://linkedin.com/in/vascokf', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
	];
</script>

<section aria-labelledby="contact-heading" class="relative">
	<div class="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/50">
		<div class="flex items-start justify-between">
			<div>
				<div class="mb-4 flex items-center gap-3">
					<h2
						id="contact-heading"
						class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
					>
						Hit me up!
					</h2>
					<DribblingBall width={24} ballJumpHeight={60} duration={0.35} />
				</div>

				<p class="mb-8 max-w-md text-slate-600 dark:text-slate-300">
					Got a cool project idea? Want to chat code or hoops? I'm always down for a good conversation.
				</p>

				<div class="flex flex-wrap gap-3">
					{#each contacts as contact}
						<a
							href={contact.href}
							target={contact.href.startsWith('mailto') ? undefined : '_blank'}
							rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
							class="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-hoop-300 hover:bg-hoop-50 hover:text-hoop-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-hoop-500/50 dark:hover:bg-hoop-950/30 dark:hover:text-hoop-400"
						>
							<svg class="h-4 w-4 text-slate-400 transition-colors group-hover:text-hoop-500 dark:text-slate-500 dark:group-hover:text-hoop-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path d={contact.icon} />
							</svg>
							{contact.type}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
