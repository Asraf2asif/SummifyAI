import { bulkHideDisplay } from "../bulk/bulkHideDisplay";
import { bulkDisableElem } from "../bulk/bulkDisableElem";

const loadingImg = document.getElementById("loading"); // Loading image
const inputBox = document.getElementById("input-box"); // Textarea input
const sendBtn = document.getElementById("send-btn"); // Send button
const charCount = document.getElementById("charCount"); // Send button

/**
 * Resets the loading state by hiding the loading image and enabling the input and button elements.
 */
export function loadingState() {
  // Show the loading image
  loadingImg.style.display = "inline";
  // Hide the input and button elements
  bulkHideDisplay(inputBox, sendBtn);

  // Disable the input and button elements
  bulkDisableElem(inputBox, sendBtn);
  charCount.textContent = "Powered by OpenAI GPT3"
}
