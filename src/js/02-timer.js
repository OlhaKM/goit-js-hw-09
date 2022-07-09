import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const el ={
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutsValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  isActive: false,
  //minDate: new Date(), // через цей атрибут неможливо вибрати невалідну дату
  onClose(selectedDates){
    if(selectedDates[0]< Date.now()){
      Notiflix.Notify.warning('Please choose a date in the future');
      return el.startBtn.disabled =true;
    }
    el.startBtn.disabled = false;
  }
};
el.startBtn.disabled = true;
class Timer{
  constructor(){
    this.intervalId = null;
    this.isActive = false;
  }
  start() {
    if(this.isActive){
      return;
    }
    this.isActive = true;
    const futuredTime = calendar.selectedDates[0].getTime();
    this.intervalId = setInterval(() => {
      const nowTime = Date.now();
      const distance = futuredTime-nowTime;
      if(distance<1){
        clearInterval(this.intervalId);
        Notiflix.Notify.success('Times ends');
        return;
      };
      const timesObj = timeCalculator(distance);
      timeRenew(timesObj);
    }, 1000);
  }
  stop(){
    clearInterval(this.intervalId);
  }
}
const timer = new Timer();
function timeCalculator(time){
 const days = addLeadingZero(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = addLeadingZero(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = addLeadingZero(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
 const  seconds = addLeadingZero(Math.floor((time % (1000 * 60)) / 1000));
  return {days, hours, minutes, seconds};
};
function addLeadingZero(value){
  return String(value).padStart(2, '0');
};
const calendar = flatpickr("#datetime-picker", options);
el.startBtn.addEventListener('click', timer.start);
function timeRenew ({days, hours, minutes, seconds}){
  el.daysValue.textContent = days;
  el.hoursValue.textContent = hours;
  el.minutsValue.textContent = minutes;
  el.secondsValue.textContent = seconds;
};