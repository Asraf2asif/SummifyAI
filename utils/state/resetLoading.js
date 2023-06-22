import { bulkInlineDisplay } from "../bulk/bulkInlineDisplay";
import { bulkEnableElem } from "../bulk/bulkEnableElem";

const loadingImg = document.getElementById("loading"); // Loading image
const setupTextarea = document.getElementById("setup-textarea"); // Textarea input
const sendBtn = document.getElementById("send-btn"); // Send button

/**
 * Resets the loading state by hiding the loading image and enabling the input and button elements.
 */
export function resetLoading() {
  // Hide the loading image
  loadingImg.style.display = "none";

  // Show the input and button elements
  bulkInlineDisplay(setupTextarea, sendBtn);

  // Enable the input and button elements
  bulkEnableElem(setupTextarea, sendBtn);

  // Select the input element
  setupTextarea.select();
}
