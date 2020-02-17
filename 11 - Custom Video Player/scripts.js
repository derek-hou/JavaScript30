/* Get elemtents */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const screenSize = player.querySelector('.screen-size');

/* Build out functions */
function togglePlay() {
	if(video.paused) { // only a pause property exists
		video.play();
	} else {
		video.pause();
	}
}

// Listen for the event of the state of the video instead of only clicking on the video which is constrained in scope
function updateButton() {
	if(this.paused) { // this refers to the video element and checks if it is paused
		toggle.textContent = '❚❚'; //"❙❙"; // '❚ ❚'
	} else {
		toggle.textContent = "►";
	}
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value; // because the html elements names are the same as the video properties, we can update them with 1 line
}

function handleProgress() {
	let progress = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e) {
	let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function handleScreenSize() {
	if(!document.fullscreenElement) {
		console.dir(video);
		video.requestFullscreen(function() {
			
		});
	}/* else {
		video.exitFullscreen();
	}*/
}

/* Add event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('onresize', handleScreenSize);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; // set flag
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => {
	if(mousedown) {
		scrub(e);
	}
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

screenSize.addEventListener('click', handleScreenSize);
