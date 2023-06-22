import {
  validateBtnParameter,
  validateInputParameter,
  handleError,
} from "../error/handleError";

/**
 * Toggles the disabled state and appearance of a button based on the input value.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input or textarea element.
 * @param {HTMLButtonElement} btn - The button element.
 */
export function toggleButton(input, btn) {
  try {
    // Validate the input parameters
    validateElements(input, btn);

    // Check if the input value is empty or contains only whitespace
    if (input.value.trim() === "") {
      btn.disabled = true; // Disable the send button
      btn.classList.add("disabled"); // Add disabled class to the send button
    } else {
      btn.disabled = false; // Enable the send button
      btn.classList.remove("disabled"); // Remove disabled class from the send button
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
