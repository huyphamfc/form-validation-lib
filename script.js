import validator from './validator.js';

const form = document.querySelector('#form-1');

validator(form);

form.addEventListener('submit', e => {
  e.preventDefault();

  const isError = validator(form, true);
  if (isError) return;

  form.submit();
});
