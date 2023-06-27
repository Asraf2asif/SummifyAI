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

    
    btn.disabled = input.value.trim() === '';

    if(input.value.trim() !== ''){
      input.style.height = 'auto'; // Reset input height
      
      if(input.scrollHeight<500){
        input.style.height = `${input.scrollHeight}px`; // Adjust input height based on content
        input.style.overflow = "hidden";
      }else{
        input.style.height = "500px"; // Adjust input height based on content
        input.style.overflow = "auto"; 
      }
    }else{
      input.style.height = '40px'; // Reset input height
      input.style.overflow = "hidden";
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
