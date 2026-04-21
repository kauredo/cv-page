<footer
	class="border-t border-slate-900/10 bg-white py-10 dark:border-white/10 dark:bg-slate-950 print:hidden"
>
	<div class="mx-auto max-w-6xl px-6">
		<div class="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
			<div class="flex items-center gap-5">
				<img
					src="/images/logo.svg"
					class="h-6 w-auto dark:invert"
					alt="VascoKF logo"
					width="26"
					height="24"
				/>
				<span class="h-8 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true"></span>
				<a
					href="/cv"
					class="group eyebrow hover:text-hoop-600 active:text-hoop-700 focus-visible:ring-vasco-500 dark:hover:text-hoop-400 dark:active:text-hoop-300 -mx-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-slate-700 transition-colors focus-visible:ring-2 focus-visible:outline-none dark:text-slate-300"
				>
					Download CV
					<span
						class="bg-vasco-500/40 group-hover:bg-hoop-500 group-active:bg-hoop-500 h-px w-3 transition-all"
						aria-hidden="true"
					></span>
				</a>
			</div>

			<p class="font-mono text-xs text-slate-600 dark:text-slate-400">
				© {new Date().getFullYear()} Vasco Kaufmann Figueiredo · Built with SvelteKit
			</p>
		</div>
	</div>
</footer>
