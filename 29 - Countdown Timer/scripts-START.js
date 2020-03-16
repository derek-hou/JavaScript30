/*
These can stop becuse of scrolling within the browsers like how gifs stop when scrolling

function timer (seconds) {
	setInterval(function() {

	}, 1000);
}*/

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer (seconds) {
	// clear any existing timers before beginning one
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now())/1000);
		// chck if we should stop
		if(secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}

		displayTimeLeft(secondsLeft);
		displayEndTime(then);
	},1000);

}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSecondsOfMinutes = seconds % 60;
	const hours = Math.floor(seconds / 360);
	const remainderSecondsOfHours = seconds % 360;

	const display = `${minutes}:${remainderSecondsOfMinutes < 10 ? '0' : ''}${remainderSecondsOfMinutes}`;
	document.title = display;
	timerDisplay.textContent = display;
	console.log(seconds);
}

function displayEndTime(timestamp) {
	const endTime = new Date(timestamp);
	const hour = endTime.getHours();
	const minutes = endTime.getMinutes();
	endTimeDisplay.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins * 60); // timer requires argument in seconds format
	this.reset(); // clears out the form after submit
})