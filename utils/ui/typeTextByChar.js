import {
  validateStringParameter,
  validateHtmlElementParameter,
  handleError,
} from "../error/handleError";

/**
 * Types the given text character by character into the specified HTML element.
 * @param {string} text - The text to be typed.
 * @param {HTMLElement} element - The target HTML element where the text will be typed.
 * @param {number} speed - The typing speed in milliseconds (optional, default: 100).
 * @param {Function} callback - The optional callback function to be called after all the text has been typed.
 */
export function typeTextByChar(text = "", element, speed, callback) {
  try {
    // Validates and sets a reasonable default value for the speed parameter.
    speed = speed && speed > 0 ? speed : 10;
    // Validate the input parameters
    validateParameters(text, element);

    // Split the text into characters
    const characters = Array.from(text);
    let index = 0;

    element.textContent = "";

    // Start typing character by character at the specified speed
    const interval = setInterval(() => {
      if (index < characters.length) {
        element.textContent += characters[index] + "";
        index++;
        // Scroll the page to follow the typing progress
        scrollToElement(element);
      } else {
        // Finish typing when all characters are typed
        clearInterval(interval);
        // Call the callback function if provided
        if (typeof callback === "function") {
          callback();
        }
      }
    }, speed);
  } catch (error) {
    // Handle errors
    handleError(
      error,
      null,
      null,
      "An error occurred while typing text by characters."
    );
  }
}

/**
 * Scrolls the page to bring the specified element into view.
 * @param {HTMLElement} element - The target HTML element to scroll to.
 */
function scrollToElement(element) {
  try {
    // Check if the element parameter is a valid HTML element
    validateHtmlElementParameter(element, "element");

    const elementTop = element.getBoundingClientRect().top;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const destination = scrollTop + elementTop + 10;

    if (typeof window.scrollTo === "function") {
      window.scrollTo({
        top: destination,
        behavior: "smooth",
      });
    } else {
      // Alternative scrolling method for older browsers
      window.scrollTo(0, destination);
    }
  } catch (error) {
    // Handle errors
    handleError(
      error,
      null,
      null,
      "An error occurred while scrolling to the element."
    );
  }
}

/**
 * Validates the input parameters.
 * @param {string} text - The text to be typed.
 * @param {HTMLElement} element - The target HTML element where the text will be typed.
 * @throws {Error} If any of the input parameters are invalid.
 */
function validateParameters(text, element) {
  // Check if the text parameter is a non-empty string
  validateStringParameter(text, "text");
  // Check if the element parameter is a valid HTML element
  validateHtmlElementParameter(element, "element");
}
