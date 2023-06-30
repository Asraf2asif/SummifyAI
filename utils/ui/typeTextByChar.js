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
 * @returns {Promise<void>} A promise that resolves when the typing animation is complete.
 */
export function typeTextByChar(text = "", element, speed = 10) {
  return new Promise((resolve) => {
    try {
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
          resolve(); // Resolve the promise when typing is complete
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
  });
}

/**
 * Scrolls the page to bring the specified element into view.
 * @param {HTMLElement} element - The target HTML element to scroll to.
 */
export function scrollToElement(element) {
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
