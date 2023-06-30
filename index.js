import {
  initMsgShow,
  onloadSelectInput,
  toggleButton,
  updateCharCount,
  handleSendBtnClick,
  handleTextareaKeydown,
} from "./utils";

// Get the necessary DOM elements
const inputBox = document.getElementById("input-box"); // Textarea input
const sendBtn = document.getElementById("send-btn"); // Send button
const charCount = document.getElementById('charCount');

// Display an initial message
await initMsgShow();

// Handle input selection when the page loads
onloadSelectInput(inputBox);

// Add event listener for textarea input
inputBox.addEventListener('keyup', toggleButton.bind(null, sendBtn, charCount)); // Enable or disable the send button based on textarea input
inputBox.addEventListener('keydown', toggleButton.bind(null, sendBtn, charCount)); // Enable or disable the send button based on textarea input

// Add event listener for textarea keydown
inputBox.addEventListener("keydown", handleTextareaKeydown);

// Add event listener for send button click
sendBtn.addEventListener("click", () => handleSendBtnClick(inputBox, sendBtn));

// Add dynamic copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

