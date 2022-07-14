import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

let position = 0;
let intervalId = null;

function createPromise(position, totalDelay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, totalDelay });
      } else {
        reject({ position, totalDelay });
      }
    }, totalDelay);
  });
}

const onFormSubmit = function (event) {
  event.preventDefault();
  const { delay, step, amount } = formRef.elements;

  let totalDelay = Number(delay.value);

  intervalId = setInterval(() => {
    position += 1;
    createPromise(position, totalDelay)
      .then(({ position, totalDelay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${totalDelay}ms`
        );
      })
      .catch(({ position, totalDelay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${totalDelay}ms`
        );
      });

    totalDelay += Number(step.value);

    if (position === Number(amount.value)) {
      clearInterval(intervalId);
      return;
    }
  }, 0);
};

formRef.addEventListener('submit', onFormSubmit);
