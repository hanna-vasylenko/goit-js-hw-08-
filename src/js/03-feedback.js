import throttle from 'lodash.throttle';
const KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector("[name = 'email']"),
  textarea: document.querySelector("[name = 'message']"),
};
const formData = {};

fillWithSaved();

const handleForm = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
};

const handleFormSubmit = event => {
  event.preventDefault();
  console.log('Saved data: ', formData);
  localStorage.removeItem(KEY);
  event.currentTarget.reset();
};

function fillWithSaved() {
  const savedText = localStorage.getItem(KEY);

  if (savedText) {
    refs.mail.value = JSON.parse(savedText).email;
    refs.textarea.value = JSON.parse(savedText).message;
  }
}

refs.form.addEventListener('submit', handleFormSubmit);
refs.form.addEventListener('input', throttle(handleForm, 500));
