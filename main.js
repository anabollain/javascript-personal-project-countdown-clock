'use strict';


//VARIABLES
const timeLeftDisplay = document.querySelector('.display__time--left');
const timeEndDisplay = document.querySelector('.display__time--end');
const controlButtons = document.querySelectorAll('[data-time]');
const timeForm = document.querySelector('.js-timer-form');

let countDown;

//FUNCTIONS

//ORIGINAL SOLUTION
//Several issues
//setInterval does not run sometimes, when it goes on for a long time, sometimes it stops running
//On iOS, when the user is scrolling, it stops all intervals (probably performance issues) that are not in the window
/*function timer(seconds) {
    setInterval(() => seconds--, 1000)
}
*/

function timer(seconds) {
    //Each time we click in a button, it will clear the interval
    clearInterval(countDown);
    //New static method on date that gives us the current time in ms
    const currentSeconds = Date.now(); //previously (new Date()).getTime();
    const interval = currentSeconds + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(interval);
    countDown = setInterval(() => {
        const secondsLeft = Math.round((interval - Date.now()) / 1000);
        displayTimeLeft(secondsLeft)
        if(secondsLeft === 0){
            clearInterval(countDown);   
        }
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    timeLeftDisplay.innerHTML = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

}

function displayEndTime(timeStamp) {
    //If we pass the number of ms we have, it will convert that into a proper time stamp
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const min = end.getMinutes();
    timeEndDisplay.innerHTML = `Be back at ${hour}:${min < 10 ? '0' : ''}${min}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function handleTimeInput(ev) {
    ev.preventDefault();
    //Gets the value of the input inside form whose name attribute responds to minutes
    const mins = this.minutes.value * 60;
    timer(mins);
    this.reset();
}


//EVENT LISTENERS

controlButtons.forEach(btn => btn.addEventListener('click', startTimer));
timeForm.addEventListener('submit', handleTimeInput);