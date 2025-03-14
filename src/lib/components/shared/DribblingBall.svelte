<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let width = 50;
	export let ballJumpHeight = 205;
	export let duration = 1.1;
	let cycleInterval = duration * 1000 * 2;
	// half height until it reaches 1
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

	const animateBall = () => {
		if (isAnimating) return;

		const ball = document.getElementById('rotateImg');
		const dribble = document.getElementById('dribble');
		const smash = document.getElementById('smash');

		if (!ball || !dribble || !smash) return;

		if (ball.classList.contains('animation-untriggered')) {
			ball.classList.remove('animation-untriggered');
			dribble.classList.remove('animation-untriggered');
			smash.classList.remove('animation-untriggered');
			isPaused = false;
			isAnimating = true;

			// Start the height cycling
			dribble.style.setProperty('--ballJumpHeight', `${currentHeight}px`);
			startHeightCycle();
		}
	};

	const startHeightCycle = () => {
		if (cycleTimer) clearInterval(cycleTimer);

		cycleTimer = setInterval(() => {
			// Move to next height
			currentHeightIndex = (currentHeightIndex + 1) % heightSteps.length;
			currentHeight = heightSteps[currentHeightIndex];

			// If we've reached end of the height steps, pause the animation
			if (currentHeightIndex === heightSteps.length - 1) {
				pauseAnimation();
				// Reset the height index for next time
				currentHeightIndex = 0;
				currentHeight = heightSteps[0];

				// Wait a bit before allowing a new hover trigger

				isAnimating = false;
				updateAnimationHeight(0);
			} else {
				updateAnimationHeight();
			}
		}, cycleInterval);
	};

	const pauseAnimation = () => {
		const ball = document.getElementById('rotateImg');
		const dribble = document.getElementById('dribble');
		const smash = document.getElementById('smash');

		if (!ball || !dribble || !smash) return;

		ball.classList.add('animation-untriggered');
		dribble.classList.add('animation-untriggered');
		smash.classList.add('animation-untriggered');
		isPaused = true;

		if (cycleTimer) {
			clearInterval(cycleTimer);
			cycleTimer = null;
		}
	};

	const updateAnimationHeight = (height = currentHeight) => {
		const dribble = document.getElementById('dribble');
		if (dribble) {
			dribble.style.setProperty('--ballJumpHeight', `${height}px`);
		}
	};

	onMount(() => {
		const ball = document.getElementById('rotateImg');
		if (!ball) return;

		ball.addEventListener('mouseover', () => {
			if (!isAnimating) {
				animateBall();
			}
		});
	});

	onDestroy(() => {
		if (cycleTimer) {
			clearInterval(cycleTimer);
		}
	});
</script>

<div class="relative mb-6 h-full w-fit">
	<div id="suport" class="h-full w-fit">
		<div id="smash" class="animation-untriggered h-full w-fit">
			<div
				id="dribble"
				class="animation-untriggered h-full w-fit"
				style={`--ballWidth: ${width}px; --animationDuration: ${duration}s; width: ${width}px; height: ${width}px;`}
			>
				<img
					id="rotateImg"
					src="/images/bball.svg"
					alt="Basketball"
					class="animation-untriggered mx-auto dark:invert"
					style="width: {width}px; height: {width}px;"
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

	#smash {
		animation-name: smash;
		animation-duration: var(--animationDuration);
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		transform-origin: bottom;
	}

	#dribble,
	#rotateImg {
		border-radius: 50%;
		display: inline-block;
	}

	#dribble {
		animation-name: dribble;
		animation-duration: var(--animationDuration);
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: ease-out;
	}

	#rotateImg {
		background-size: 100%;
		animation-name: rotateImg;
		animation-duration: calc(var(--animationDuration) * 5.3);
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	/* The hover trigger and animation persistence class */
	#rotateImg.animation-untriggered,
	#dribble.animation-untriggered,
	#smash.animation-untriggered {
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
