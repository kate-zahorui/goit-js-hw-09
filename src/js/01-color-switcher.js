function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyRef = document.body;
const startButtonRef = document.querySelector('button[data-start]');
const stopButtonRef = document.querySelector('button[data-stop]');

let intervalId = null;
stopButtonRef.disabled = true;

const onSwitcherStart = function () {
  if (startButtonRef.disabled) {
    return;
  }

  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButtonRef.disabled = true;
  stopButtonRef.disabled = false;
};

const onSwitcherStop = function () {
  clearInterval(intervalId);

  startButtonRef.disabled = false;
  stopButtonRef.disabled = true;
};

startButtonRef.addEventListener('click', onSwitcherStart);
stopButtonRef.addEventListener('click', onSwitcherStop);
