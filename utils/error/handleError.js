import {
  isNone,
  isEmptyArray,
  isArray,
  isEmptyString,
  isText,
  isHtmlElement,
  isEmptyNumber,
  isNumber,
  isInputElement,
  isTextAreaElement,
  isButtonElement,
  isImg,
} from "./isCheck";

import { typeTextByChar } from "../ui/typeTextByChar";

/**
 * Validates an array parameter.
 * @param {Array} parameter - The array parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid array.
 */
export function validateArrayParameter(parameter, paramName, required = true) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (
    isNone(parameter) ||
    !isArray(parameter) ||
    isEmptyArray(parameter)
  ) {
    // Throws an error if the parameter is None or is not a valid array
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be a valid array.`
    );
  }
}

/**
 * Validates a string parameter.
 * @param {string} parameter - The string parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid non-empty string.
 */
export function validateStringParameter(parameter, paramName, required = true) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (
    isNone(parameter) ||
    !isText(parameter) ||
    isEmptyString(parameter)
  ) {
    // Throws an error if the parameter is None or is not a valid non-empty string
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be a valid non-empty string.`
    );
  }
}

/**
 * Validates an HTML element parameter.
 * @param {HTMLElement} parameter - The HTML element parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid HTML element.
 */
export function validateHtmlElementParameter(
  parameter,
  paramName,
  required = true
) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (!isHtmlElement(parameter)) {
    // Throws an error if the parameter is None or is not a valid HTML element
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be a valid HTML element.`
    );
  }
}

/**
 * Validates a number parameter.
 * @param {number} parameter - The number parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid number.
 */
export function validateNumberParameter(parameter, paramName, required = true) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (
    isNone(parameter) ||
    !isNumber(parameter) ||
    isEmptyNumber(parameter)
  ) {
    // Throws an error if the parameter is None or is not a valid number
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be a valid number.`
    );
  }
}

/**
 * Validates an HTML input element parameter.
 * @param {HTMLElement} parameter - The HTML input element parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid HTML input element.
 */
export function validateInputParameter(parameter, paramName, required = true) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (
    isNone(parameter) ||
    (!isInputElement(parameter) && !isTextAreaElement(parameter))
  ) {
    // Throws an error if the parameter is None or is not a valid HTML element
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be an input or textarea element.`
    );
  }
}

/**
 * Validates an HTML button element parameter.
 * @param {HTMLElement} parameter - The HTML button element parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid HTML button element.
 */
export function validateBtnParameter(parameter, paramName, required = true) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (isNone(parameter) || !isButtonElement(parameter)) {
    // Throws an error if the parameter is None or is not a valid HTML element
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be a button element.`
    );
  }
}

/**
 * Validates an HTML image element parameter.
 * @param {HTMLElement} parameter - The HTML image element parameter to validate.
 * @param {string} paramName - The parameter name to use in the error message if the parameter is invalid.
 * @param {boolean} required - Indicates if the parameter is required (default: true).
 * @throws {Error} If the parameter is not a valid HTML image element.
 */
export function validateImgParameter(parameter, paramName, required = true) {
  // Passes if the parameter is not required and is None
  if (!required && isNone(parameter)) {
    // Code execution continues without throwing an error
  } else if (isNone(parameter) || !isImg(parameter)) {
    // Throws an error if the parameter is None or is not a valid HTML element
    throw new Error(
      `Invalid ${paramName}: ${paramName} must be an <img> element.`
    );
  }
}

/**
 * Handles the error by displaying an error message and logging the error.
 * @param {Error} error - The error object.
 * @param {HTMLElement} outputContainerElement - The HTML element for displaying the error message.
 * @param {HTMLElement} outputTextElement - The HTML element for displaying the error text.
 * @param {string} msg - The error message to display (default: "An error occurred while performing this task.").
 */
export function handleError(
  error,
  outputContainerElement,
  outputTextElement,
  msg = "An error occurred while performing this task."
) {
  // Display the error container element if it exists
  if (isHtmlElement(outputContainerElement)) {
    outputContainerElement.style.display = "block";
  }

  // Display the error message in the output text element
  if (isHtmlElement(outputTextElement)) {
    typeTextByChar(msg, outputTextElement);
  }

  // Log the error to the console
  console.error(error);
}
