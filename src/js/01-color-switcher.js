function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  const el={
    bodyEl: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
  }
  el.btnStop.disabled = true;
  console.log(el.bodyEl);
  el.btnStart.addEventListener('click', onBtnStart);
  el.btnStop.addEventListener('click', onBtnStop);
  let timerId=null;
  function onBtnStart (e){
    el.btnStop.disabled = false;
    el.btnStart.disabled = true;
    timerId = setInterval(() => {
     el.bodyEl.style.backgroundColor = getRandomHexColor();
     el.btnStart.style.border = 'none';
     el.btnStop.style.border = 'none';
    }, 1000);
  };
  function onBtnStop (e){
    clearInterval(timerId);
    el.btnStop.disabled = true;
    el.btnStart.disabled =false;
  }