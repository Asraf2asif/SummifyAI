import {
  initMsgShow,
  onloadSelectInput,
  toggleButton,
  handleSendBtnClick,
  handleTextareaKeydown,
} from "./utils";

// Get the necessary DOM elements
const setupTextarea = document.getElementById("setup-textarea"); // Textarea input
const sendBtn = document.getElementById("send-btn"); // Send button

// Display an initial message
initMsgShow();

// Handle input selection when the page loads
onloadSelectInput(setupTextarea);

// Add event listener for textarea input
setupTextarea.addEventListener("input", () => {
  // Enable or disable the send button based on textarea input
  toggleButton(setupTextarea, sendBtn);
});

// Add event listener for textarea keydown
setupTextarea.addEventListener("keydown", handleTextareaKeydown);

// Add event listener for send button click
sendBtn.addEventListener("click", handleSendBtnClick);

// Add dynamic copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

