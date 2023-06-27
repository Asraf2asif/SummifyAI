import { bulkInlineDisplay } from "../bulk/bulkInlineDisplay";
import { bulkEnableElem } from "../bulk/bulkEnableElem";

const loadingImg = document.getElementById("loading"); // Loading image
const inputBox = document.getElementById("input-box"); // Textarea input
const sendBtn = document.getElementById("send-btn"); // Send button

/**
 * Resets the loading state by hiding the loading image and enabling the input and button elements.
 */
export function resetLoading() {
  // Hide the loading image
  loadingImg.style.display = "none";

  // Show the input and button elements
  bulkInlineDisplay(inputBox, sendBtn);

  // Enable the input and button elements
  bulkEnableElem(inputBox, sendBtn);

  // Select the input element
  inputBox.select();
}
