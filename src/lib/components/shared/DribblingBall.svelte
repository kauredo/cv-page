<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let width = 50;
	export let ballJumpHeight = 205;
	export let duration = 1.1;
	let cycleInterval = duration * 1000 * 2;

	let numberOfBounces = 1;
	let tempHeight = ballJumpHeight;
	let heightSteps = [tempHeight];
	let tempReduction = 0.9;
	while (tempHeight > 5) {
		tempHeight = tempHeight * tempReduction;
		heightSteps.push(tempHeight);
		tempReduction = tempReduction - 0.1;
		numberOfBounces++;
	}

	let isAnimating = false;
	let currentHeightIndex = 0;
	let cycleTimer: ReturnType<typeof setInterval> | null = null;
	let isPaused = true;
	let currentHeight = heightSteps[0];

	let containerEl: HTMLDivElement;
	let ballEl: HTMLImageElement;
	let dribbleEl: HTMLDivElement;
	let smashEl: HTMLDivElement;

	const animateBall = () => {
		if (isAnimating) return;
		if (!ballEl || !dribbleEl || !smashEl) return;

		if (ballEl.classList.contains('animation-untriggered')) {
			ballEl.classList.remove('animation-untriggered');
			dribbleEl.classList.remove('animation-untriggered');
			smashEl.classList.remove('animation-untriggered');
			isPaused = false;
			isAnimating = true;

			dribbleEl.style.setProperty('--ballJumpHeight', `${currentHeight}px`);
			startHeightCycle();
		}
	};

	const startHeightCycle = () => {
		if (cycleTimer) clearInterval(cycleTimer);

		cycleTimer = setInterval(() => {
			currentHeightIndex = (currentHeightIndex + 1) % heightSteps.length;
			currentHeight = heightSteps[currentHeightIndex];

			if (currentHeightIndex === heightSteps.length - 1) {
				pauseAnimation();
				currentHeightIndex = 0;
				currentHeight = heightSteps[0];
				isAnimating = false;
				updateAnimationHeight(0);
			} else {
				updateAnimationHeight();
			}
		}, cycleInterval);
	};

	const pauseAnimation = () => {
		if (!ballEl || !dribbleEl || !smashEl) return;

		ballEl.classList.add('animation-untriggered');
		dribbleEl.classList.add('animation-untriggered');
		smashEl.classList.add('animation-untriggered');
		isPaused = true;

		if (cycleTimer) {
			clearInterval(cycleTimer);
			cycleTimer = null;
		}
	};

	const updateAnimationHeight = (height = currentHeight) => {
		if (dribbleEl) {
			dribbleEl.style.setProperty('--ballJumpHeight', `${height}px`);
		}
	};

	let observer: IntersectionObserver | null = null;

	onMount(() => {
		if (!ballEl) return;

		ballEl.addEventListener('mouseover', () => {
			if (!isAnimating) {
				animateBall();
			}
		});

		// Only allow animation when the component is in the viewport
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting && isAnimating) {
						pauseAnimation();
						isAnimating = false;
					}
				}
			},
			{ threshold: 0 }
		);
		observer.observe(containerEl);
	});

	onDestroy(() => {
		if (cycleTimer) {
			clearInterval(cycleTimer);
		}
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div class="relative mb-6 h-full w-fit" bind:this={containerEl} aria-hidden="true">
	<div id="suport" class="h-full w-fit">
		<div bind:this={smashEl} class="animation-untriggered h-full w-fit smash-anim">
			<div
				bind:this={dribbleEl}
				class="animation-untriggered h-full w-fit dribble-anim"
				style={`--ballWidth: ${width}px; --animationDuration: ${duration}s; width: ${width}px; height: ${width}px;`}
			>
				<img
					bind:this={ballEl}
					src="/images/bball.svg"
					alt="Basketball"
					class="animation-untriggered mx-auto rotate-anim dark:invert"
					style="width: {width}px; height: {width}px;"
					width={width}
					height={width}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	#suport {
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
	}

	.smash-anim {
		animation-name: smash;
		animation-duration: var(--animationDuration);
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		transform-origin: bottom;
	}

	.dribble-anim,
	.rotate-anim {
		border-radius: 50%;
		display: inline-block;
	}

	.dribble-anim {
		animation-name: dribble;
		animation-duration: var(--animationDuration);
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: ease-out;
	}

	.rotate-anim {
		background-size: 100%;
		animation-name: rotateImg;
		animation-duration: calc(var(--animationDuration) * 5.3);
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	/* Paused state */
	.rotate-anim.animation-untriggered,
	.dribble-anim.animation-untriggered,
	.smash-anim.animation-untriggered {
		animation-play-state: paused;
	}

	@keyframes dribble {
		0% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(calc(-1 * var(--ballJumpHeight)));
		}
	}

	@keyframes smash {
		0% {
			transform: scaleY(0.7);
		}
		15% {
			transform: scaleY(1);
		}
	}

	@keyframes rotateImg {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
