<script lang="ts">
	import { onMount } from 'svelte';
	export let isAnimating = false;

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

<div class="relative mb-6 h-12 w-12">
	<div id="suport">
		<div id="smash" class="animation-untriggered">
			<div id="dribble" class="animation-untriggered">
				<img
					id="rotateImg"
					src="/images/bball.svg"
					alt="Basketball"
					class="animation-untriggered mx-auto h-12 w-12 dark:invert"
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
		animation-duration: 1.1s;
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
		transform-origin: bottom;
	}

	#dribble,
	#rotateImg {
		border-radius: 50%;
		display: inline-block;
		width: 50px;
		height: 50px;
	}

	#dribble {
		animation-name: dribble;
		animation-duration: 1.1s;
		animation-direction: alternate;
		animation-iteration-count: infinite;
		animation-timing-function: ease-out;
	}

	#rotateImg {
		background-size: 100%;
		animation-name: rotateImg;
		animation-duration: calc(1.1s * 5.3);
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	/* The hover trigger and animation persistence class */
	#rotateImg.animation-untriggered,
	#dribble.animation-untriggered,
	#smash.animation-untriggered {
		animation-play-state: paused;
		animation-delay: calc(1.1s * 0.1);
		transform: translateY(5px);
	}

	@keyframes dribble {
		0% {
			transform: translateY(30px);
		}
		100% {
			transform: translateY(-205px);
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
