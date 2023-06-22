/**
 * Checks if a value is a text (string).
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a text, false otherwise.
 */
export function isText(value) {
  return (
    !isNone(value) && (typeof value === "string" || value instanceof String)
  );
}

/**
 * Checks if an element is an input element.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} Returns true if the element is an input element, false otherwise.
 */
export function isInputElement(element) {
  return (
    !isNone(element) &&
    isHtmlElement(element) &&
    element.tagName.toLowerCase() === "input" &&
    element instanceof HTMLInputElement
  );
}

/**
 * Checks if an element is a textarea element.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} Returns true if the element is a textarea element, false otherwise.
 */
export function isTextAreaElement(element) {
  return (
    !isNone(element) &&
    isHtmlElement(element) &&
    element.tagName.toLowerCase() === "textarea" &&
    element instanceof HTMLTextAreaElement
  );
}

/**
 * Checks if an element is an img element.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} Returns true if the element is an img element, false otherwise.
 */
export function isImg(element) {
  return (
    !isNone(element) &&
    isHtmlElement(element) &&
    element.tagName.toLowerCase() === "img" &&
    element instanceof HTMLImageElement
  );
}

/**
 * Checks if an element is a button element.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} Returns true if the element is a button element, false otherwise.
 */
export function isButtonElement(element) {
  return (
    !isNone(element) &&
    isHtmlElement(element) &&
    ((element.tagName.toLowerCase() === "button" &&
      element instanceof HTMLButtonElement) ||
      (element.tagName.toLowerCase() === "input" &&
        element instanceof HTMLInputElement &&
        element.type.toLowerCase() === "button"))
  );
}

/**
 * Checks if a value is an HTML element.
 * @param {any} element - The value to check.
 * @returns {boolean} Returns true if the value is an HTML element, false otherwise.
 */
export function isHtmlElement(element) {
  return !isNone(element) && element instanceof HTMLElement;
}

/**
 * Checks if a value is a number.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a number, false otherwise.
 */
export function isNumber(value) {
  return !isNone(value) && (!isNaN(value) || typeof value === "number");
}

/**
 * Checks if a value is an array.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an array, false otherwise.
 */
export function isArray(value) {
  // Checks if a value is null or undefined.
  if (isNone(value)) {
    return false;
  }

  // Use the Array.isArray method if available (compatible with modern browsers)
  if (Array.isArray) {
    return Array.isArray(value);
  }

  // Fallback for older browsers that don't support Array.isArray
  return Object.prototype.toString.call(value) === "[object Array]";
}

/**
 * Checks if a value is an object.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an object, false otherwise.
 */
export function isObject(value) {
  return (
    !isNone(value) && (typeof value === "object" || value instanceof Object)
  );
}

/**
 * Checks if a value is null or undefined.
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is null or undefined, false otherwise.
 */
export function isNone(value) {
  return value === null || value === undefined;
}

/**
 * Checks if an array is empty.
 * @param {any[]} value - The array to check.
 * @returns {boolean} Returns true if the array is empty, false otherwise.
 */
export function isEmptyArray(value) {
  return isArray(value) && value.length === 0;
}

/**
 * Checks if an object is empty.
 * @param {object} value - The object to check.
 * @returns {boolean} Returns true if the object is empty, false otherwise.
 */
export function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0;
}

/**
 * Checks if a string is empty.
 * @param {string} value - The string to check.
 * @returns {boolean} Returns true if the string is empty, false otherwise.
 */
export function isEmptyString(value) {
  return isText(value) && value.trim().length === 0;
}

/**
 * Checks if a number is empty (zero).
 * @param {number} value - The number to check.
 * @returns {boolean} Returns true if the number is empty (zero), false otherwise.
 */
export function isEmptyNumber(value) {
  return isNumber(value) && value === 0;
}

/**
 * Checks if a value is a valid date string.
 * @param {string} str - The value to check.
 * @returns {boolean} Returns true if the value is a valid date string, false otherwise.
 */
export function isDateStr(str) {
  return (
    isText(str) && new Date(str) !== "Invalid Date" && !isNaN(new Date(str))
  );
}
