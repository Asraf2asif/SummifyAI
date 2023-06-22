import { isInputElement, isTextAreaElement } from "../error/isCheck";
import { validateInputParameter, handleError } from "../error/handleError";

/**
 * Selects the content of the input element on page load.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input or textarea element to be selected.
 */
export function onloadSelectInput(input) {
  try {
    // Validate the input parameters
    validateElements(input);

    // Wait for the DOM content to be loaded
    document.addEventListener("DOMContentLoaded", () => {
      // Select the content of the input element
      input.select();
    });
  } catch (error) {
    // Handle errors
    handleError(error);
  }
}

/**
 * Validates the image, input and button elements.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input or textarea element.
 * @throws {Error} If any of the elements are invalid.
 */
function validateElements(input) {
  // Check if the input is an input or textarea element
  validateInputParameter(input, "input");
}
