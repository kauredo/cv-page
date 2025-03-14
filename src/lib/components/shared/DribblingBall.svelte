<script lang="ts">
	import { onMount } from 'svelte';
	export let width = 50;
	export let ballJumpHeight = 205;
	export let duration = 1.1;

	let isAnimating = false;

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
			isAnimating = true;
		}
	};

	onMount(() => {
		const ball = document.getElementById('rotateImg');

		if (!ball) return;

		ball.addEventListener('mouseover', () => {
			animateBall();
		});
	});
</script>

<div class="relative mb-6 h-full w-fit">
	<div id="suport" class="h-full w-fit">
		<div id="smash" class="animation-untriggered h-full w-fit">
			<div
				id="dribble"
				class="animation-untriggered h-full w-fit"
				style={`--ballWidth: ${width}px; --ballJumpHeight: ${ballJumpHeight}px; --animationDuration: ${duration}s; width: ${width}px; height: ${width}px;`}
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
		animation-delay: calc(var(--animationDuration) * 0.1);
		transform: translateY(calc(-var(--ballWidth) / 10));
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
