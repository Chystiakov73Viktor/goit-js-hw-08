import throttle from 'lodash.throttle';
import '../css/03-feedback.css';
import '../css/common.css';
const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('textarea');

formEl.addEventListener('submit', onFopmSubmit);
formEl.addEventListener('input', throttle(onFormData, 500));

const STORED_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORED_KEY)) || {};

reloadPage();

function onFormData(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORED_KEY, JSON.stringify(formData));
}

function onFopmSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  
  evt.currentTarget.reset();
  localStorage.removeItem(STORED_KEY);
  formData = {};
}

function reloadPage() {
  const savedMessage = localStorage.getItem(STORED_KEY);

  if (savedMessage) {
    console.log(localStorage.getItem(STORED_KEY));
    const { email, message } = formEl.elements;
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}
