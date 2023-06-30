import {
  validateBtnParameter,
  validateInputParameter,
  validateHtmlElementParameter,
  handleError,
} from "../error/handleError";

import { scrollToElement } from "..";

/**
 * Toggles the disabled state and appearance of a button based on the input value.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input or textarea element.
 * @param {HTMLButtonElement} btn - The button element.
 */
export function toggleButton(btn, charCount, event) {

  updateCharCount(charCount, event);
  try {
    const {value:inputValue, style:inputStyle} = event.target;
    // Validate the input parameters
    validateElements(event.target, btn);

    scrollToElement(event.target);

    btn.disabled = inputValue.trim() === '';

    if (inputValue !== '') {
      resetInputHeight(inputStyle);

      if (event.target.scrollHeight < 300) {
        setInputHeight(inputStyle, event.target.scrollHeight, 'hidden');
      } else {
        setInputHeight(inputStyle,300, 'auto');
      }
    } else {
      setInputHeight(inputStyle, 40, 'hidden');
    }
  } catch (error) {
    // Handle errors
    handleError(error);
  }
}  

function resetInputHeight(style) {
  style.height = 'auto';
}

function setInputHeight(style, height, overflow) {
  style.height = `${height}px`;
  style.overflowY = overflow;
}

export function updateCharCount(charCount, event) {
  try {
    const { value: inputValue } = event.target;
    const maxLength = event.target.getAttribute('maxlength');

    // Validate the input parameters
    validateInputParameter(event.target, "input");
    validateHtmlElementParameter(charCount, "charCount");

    if (inputValue.length === 0) {
      charCount.textContent = ``;
    } else if (inputValue.length >= maxLength) {
      charCount.classList.add('exceeded');
      charCount.textContent = `Input limit at maximum. Cannot go higher than ${maxLength} characters`;
    } else {
      charCount.classList.remove('exceeded');
      charCount.textContent = `${inputValue.length} / ${maxLength}`;
    }
  } catch (error) {
    // Handle errors
    handleError(error);
  }
}


/**
 * Validates the input and button elements.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input or textarea element.
 * @param {HTMLButtonElement} btn - The button element.
 * @throws {Error} If any of the elements are invalid.
 */
function validateElements(input, btn) {
  validateInputParameter(input, "input");
  validateBtnParameter(btn, "button");
}
