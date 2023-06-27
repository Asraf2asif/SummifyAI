import {
  initMsgShow,
  onloadSelectInput,
  toggleButton,
  handleSendBtnClick,
  handleTextareaKeydown,
} from "./utils";

// Get the necessary DOM elements
const inputBox = document.getElementById("input-box"); // Textarea input
const sendBtn = document.getElementById("send-btn"); // Send button

// Display an initial message
await initMsgShow();

// Handle input selection when the page loads
onloadSelectInput(inputBox);

// Add event listener for textarea input
inputBox.addEventListener("input", () => {
  // Enable or disable the send button based on textarea input
  toggleButton(inputBox, sendBtn);
});

// Add event listener for textarea keydown
inputBox.addEventListener("keydown", handleTextareaKeydown);

// Add event listener for send button click
sendBtn.addEventListener("click", () => handleSendBtnClick(inputBox, sendBtn));

// Add dynamic copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

