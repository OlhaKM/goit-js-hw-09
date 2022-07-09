import Notiflix from 'notiflix';


const form = document.querySelector('.form');
form.addEventListener('submit', generatePromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay});
      } else {
        reject({ position, delay});
      }
    }, delay);
  });
};
function generatePromises(e){
  e.preventDefault();
  const formEl = e.currentTarget;
  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);
  for(let position = 1; position<amount+1; position+=1){
    createPromise(position, delay).then(({position, delay})=>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({position, delay})=>{
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay+=step;
  }
};