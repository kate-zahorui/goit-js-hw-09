import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let date = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    date = selectedDates[0].getTime();
  },
};

flatpickr('input#datetime-picker', options);

const startButtonRef = document.querySelector('button[data-start]');
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const onTimerStart = function () {
  let startTime = Date.now();

  if (date <= startTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  startButtonRef.removeEventListener('click', onTimerStart);
  const initialTime = convertMs(date - startTime);
  updateClock(initialTime);

  intervalId = setInterval(() => {
    currentTime = Date.now();
    remainingTime = date - currentTime;

    if (remainingTime < 0) {
      clearInterval(intervalId);
      return;
    }
    const timeComponents = convertMs(remainingTime);
    updateClock(timeComponents);
  }, 1000);
};

const addLeadingZero = function (value) {
  return String(value).padStart(2, '0');
};

const updateClock = function ({ days, hours, minutes, seconds }) {
  timerRefs.days.textContent = addLeadingZero(days);
  timerRefs.hours.textContent = addLeadingZero(hours);
  timerRefs.minutes.textContent = addLeadingZero(minutes);
  timerRefs.seconds.textContent = addLeadingZero(seconds);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButtonRef.addEventListener('click', onTimerStart);
