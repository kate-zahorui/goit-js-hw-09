function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyRef = document.body;
const startButtonRef = document.querySelector('button[data-start]');
const stopButtonRef = document.querySelector('button[data-stop]');

let intervalId = null;
let isActive = false;

const onSwitcherStart = function () {
  if (isActive) {
    return;
  }
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  isActive = true;
};

const onSwitcherStop = function () {
  clearInterval(intervalId);
  isActive = false;
};

startButtonRef.addEventListener('click', onSwitcherStart);
stopButtonRef.addEventListener('click', onSwitcherStop);
