/**
 * Form Validation Library v1.0
 * Created on Oct 12, 2022
 * Author: huyphamfc
 *
 * https://github.com/huyphamfc
 */

export default function (formElement) {
  const validationMethods = {
    required(label) {
      return function (value) {
        if (value === '') return `Please enter your ${label}.`;
      };
    },
  };

  const handleValidationMethods = element => {
    return formRules[element.name]
      .map(rule => rule(element.value))
      .find(result => result !== undefined);
  };

  const handleValidation = ({ target: element }) => {
    const containerElement = element.closest('.form__group');
    if (!containerElement) return;

    const warningElement = containerElement.querySelector('.form__warning');
    if (!warningElement) return;

    const error = handleValidationMethods(element);
    if (!error) {
      containerElement.classList.remove('invalid');
      return;
    }

    containerElement.classList.add('invalid');
    warningElement.textContent = error;

    return error;
  };

  const formRules = {};

  const validationElements = Array.from(
    formElement.querySelectorAll('[name][rules]')
  );
  if (validationElements.length === 0) return;

  validationElements.forEach(element => {
    const rules = element
      .getAttribute('rules')
      .split('|')
      .map(rule => {
        if (rule === 'required') {
          return validationMethods.required(element.ariaLabel);
        }
      });

    formRules[element.name] = rules;

    element.addEventListener('blur', handleValidation);
  });

  formElement.addEventListener('submit', e => {
    e.preventDefault();

    let isValid = true;
    validationElements.forEach(element => {
      if (handleValidation({ target: element })) isValid = false;
    });

    if (isValid) return formElement.submit();

    return;
  });
}
