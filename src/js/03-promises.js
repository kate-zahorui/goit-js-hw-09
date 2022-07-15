import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

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

  let firstDelay = Number(delay.value);
  let increaseDelay = Number(step.value);

  for (let i = 0; i < Number(amount.value); i += 1) {
    let position = i + 1;
    let totalDelay = firstDelay + increaseDelay * i;

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
  }
};

formRef.addEventListener('submit', onFormSubmit);
